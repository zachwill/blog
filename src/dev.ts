import { watch } from 'node:fs';
import { resolve, sep } from 'node:path';

const outputDir = resolve('dist');
const reloadScript = `<script>new EventSource('/__dev/events').addEventListener('reload', () => location.reload())</script>`;
const clients = new Set<ReadableStreamDefaultController<string>>();

function build() {
    // Run the production build in a fresh process so edited TSX imports aren't cached.
    return Bun.spawn([process.execPath, 'run', 'build'], { stdout: 'inherit', stderr: 'inherit' }).exited;
}

if (await build() !== 0) process.exit(1);

const server = Bun.serve({
    hostname: 'localhost',
    port: 8000,
    async fetch(req, server) {
        const { pathname } = new URL(req.url);
        if (pathname === '/__dev/events') {
            server.timeout(req, 0);
            let client: ReadableStreamDefaultController<string>;
            const stream = new ReadableStream<string>({
                start(controller) {
                    client = controller;
                    clients.add(client);
                    client.enqueue(': connected\n\n');
                },
                cancel() { clients.delete(client); },
            });
            return new Response(stream, {
                headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
            });
        }

        let path: string;
        try {
            path = resolve(outputDir, `.${decodeURIComponent(pathname)}`);
        } catch {
            return new Response('Bad request', { status: 400 });
        }
        if (path === outputDir || path.startsWith(outputDir + sep)) {
            for (const candidate of [path, resolve(path, 'index.html')]) {
                const file = Bun.file(candidate);
                if (!(await file.exists())) continue;
                if (!candidate.endsWith('.html')) return new Response(file);
                const html = await file.text();
                return new Response(html.replace('</body>', `${reloadScript}</body>`), {
                    headers: { 'Content-Type': file.type },
                });
            }
        }
        return new Response('Not found', { status: 404 });
    },
});
console.log(`Watching for changes at ${server.url}`);

let timer: ReturnType<typeof setTimeout>;
let building = false;
let pending = false;
function scheduleBuild() {
    clearTimeout(timer);
    timer = setTimeout(async () => {
        pending = true;
        if (building) return;
        building = true;
        try {
            while (pending) {
                pending = false;
                if (await build() !== 0) continue;
                for (const client of clients) client.enqueue('event: reload\ndata: rebuilt\n\n');
            }
        } finally {
            building = false;
        }
    }, 75);
}

watch('src', { recursive: true }, (_, file) => {
    if (file && file !== 'dev.ts') scheduleBuild();
});
watch('content', { recursive: true }, (_, file) => {
    if (file && /^(posts|pages)\/.*\.(md|tsx)$/.test(file)) scheduleBuild();
});
watch('CNAME', scheduleBuild);
