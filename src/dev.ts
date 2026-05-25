import { watch } from 'fs';
import { serve } from 'bun';

const DEV_PORT = 8000;
const RELOAD_SCRIPT = `
<script type="module">
  const events = new EventSource('/__dev/events');
  events.addEventListener('reload', () => location.reload());
</script>`;

const reloadClients = new Set<ReadableStreamDefaultController<string>>();
let buildInProgress = false;
let buildAgain = false;
let buildTimer: ReturnType<typeof setTimeout> | undefined;

function queueBuild(reason: string) {
    console.log(`\n${reason}`);

    if (buildTimer) {
        clearTimeout(buildTimer);
    }

    buildTimer = setTimeout(() => {
        buildSite();
    }, 75);
}

async function buildSite() {
    if (buildInProgress) {
        buildAgain = true;
        console.log('⏳ Build already in progress; queued one follow-up build');
        return;
    }

    buildInProgress = true;

    do {
        buildAgain = false;
        console.log('🔨 Building site...');

        const process = Bun.spawn(['bun', 'run', 'src/build.tsx'], {
            stdout: 'inherit',
            stderr: 'inherit',
        });

        const exitCode = await process.exited;
        if (exitCode === 0) {
            console.log('✅ Build completed successfully');
            notifyReloadClients();
        } else {
            console.error(`❌ Build failed with exit code ${exitCode}`);
        }
    } while (buildAgain);

    buildInProgress = false;
}

function notifyReloadClients() {
    const message = `event: reload\ndata: ${Date.now()}\n\n`;

    for (const client of reloadClients) {
        try {
            client.enqueue(message);
        } catch {
            reloadClients.delete(client);
        }
    }
}

function contentTypeFor(path: string): string | undefined {
    if (path.endsWith('.css')) return 'text/css';
    if (path.endsWith('.js')) return 'application/javascript';
    if (path.endsWith('.html')) return 'text/html';
    if (path.endsWith('.xml')) return 'application/xml';
    if (path.endsWith('.svg')) return 'image/svg+xml';
    if (path.endsWith('.png')) return 'image/png';
    if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg';
    return undefined;
}

async function htmlResponse(file: Bun.BunFile) {
    const html = await file.text();
    const body = html.includes('</body>')
        ? html.replace('</body>', `${RELOAD_SCRIPT}</body>`)
        : `${html}${RELOAD_SCRIPT}`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/html' },
    });
}

async function fileResponse(filePath: string) {
    const file = Bun.file(`./dist${filePath}`);
    if (!(await file.exists())) return undefined;

    if (filePath.endsWith('.html')) {
        return htmlResponse(file);
    }

    const headers: Record<string, string> = {};
    const contentType = contentTypeFor(filePath);
    if (contentType) headers['Content-Type'] = contentType;

    return new Response(file, { headers });
}

function devEventsResponse() {
    const stream = new ReadableStream<string>({
        start(controller) {
            reloadClients.add(controller);
            controller.enqueue(': connected\n\n');
        },
        cancel(controller) {
            reloadClients.delete(controller);
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        },
    });
}

async function startDevServer() {
    console.log('🚀 Starting development server...');

    const server = serve({
        port: DEV_PORT,
        development: true,

        async fetch(req) {
            const url = new URL(req.url);

            if (url.pathname === '/dev-status') {
                return new Response('OK', { status: 200 });
            }

            if (url.pathname === '/__dev/events') {
                return devEventsResponse();
            }

            let filePath = url.pathname;
            if (filePath === '/') {
                filePath = '/index.html';
            }

            const exactFile = await fileResponse(filePath);
            if (exactFile) return exactFile;

            if (!filePath.includes('.')) {
                const htmlFile = await fileResponse(`${filePath}.html`);
                if (htmlFile) return htmlFile;
            }

            const indexFile = await fileResponse(`${filePath}/index.html`);
            if (indexFile) return indexFile;

            return new Response('Not Found', {
                status: 404,
                headers: { 'Content-Type': 'text/plain' },
            });
        },
    });

    console.log(`🌐 Blog server running at ${server.url}`);
    return server;
}

function setupFileWatcher() {
    console.log('\n📁 Watching for changes in:');
    console.log('  - content/posts/ (Markdown files)');
    console.log('  - content/pages/ (Markdown and TSX files)');
    console.log('  - src/ (templates, components, assets, config)');

    const contentWatcher = watch('./content', { recursive: true }, (_eventType, filename) => {
        if (!filename) return;
        if (filename.startsWith('drafts/')) return;
        if (!filename.match(/\.(md|tsx)$/)) return;

        queueBuild(`📝 Content changed: ${filename}`);
    });

    const srcWatcher = watch('./src', { recursive: true }, (_eventType, filename) => {
        if (!filename) return;
        if (filename.includes('dev.ts')) return;

        queueBuild(`🔧 Source changed: ${filename}`);
    });

    return { contentWatcher, srcWatcher };
}

async function runDev() {
    console.log('🚀 Starting blog development mode...');

    await buildSite();
    const server = await startDevServer();
    const watchers = setupFileWatcher();

    process.on('SIGINT', () => {
        console.log('\n👋 Shutting down development server...');
        watchers.contentWatcher.close();
        watchers.srcWatcher.close();
        server.stop();
        process.exit(0);
    });

    console.log('\n💡 Press Ctrl+C to stop the development server');
    console.log('🔥 Rebuild-on-change and browser reload enabled');
}

runDev().catch(console.error);
