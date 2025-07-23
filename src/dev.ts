import { watch } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { serve } from 'bun';

const execAsync = promisify(exec);

let buildInProgress = false;

async function buildSite() {
    if (buildInProgress) {
        console.log('⏳ Build already in progress, skipping...');
        return;
    }

    buildInProgress = true;
    console.log('🔨 Building WebAwesome site...');

    try {
        await execAsync('bun run src/build.tsx');
        console.log('✅ WebAwesome build completed successfully');
    } catch (error) {
        console.error('❌ Build failed:', error);
    } finally {
        buildInProgress = false;
    }
}

async function startDevServer() {
    console.log('🚀 Starting WebAwesome development server...');

    const server = serve({
        port: 8000,
        development: true,

        async fetch(req) {
            const url = new URL(req.url);

            // Handle dev status endpoint
            if (url.pathname === '/dev-status') {
                return new Response('OK', { status: 200 });
            }

            // Handle WebAwesome CDN resources (for offline development)
            if (url.pathname.startsWith('/webawesome/')) {
                // In production, these come from CDN, but for dev we might want to proxy or serve locally
                return new Response('/* WebAwesome resources served from CDN */', {
                    headers: { 'Content-Type': 'text/css' }
                });
            }

            // Determine file path to serve
            let filePath = url.pathname;
            if (filePath === '/') {
                filePath = '/index.html';
            }

            try {
                // Try to serve the exact file first
                const file = Bun.file(`./dist${filePath}`);
                if (await file.exists()) {
                    // Add proper MIME types for WebAwesome assets
                    const headers: Record<string, string> = {};

                    if (filePath.endsWith('.css')) {
                        headers['Content-Type'] = 'text/css';
                    } else if (filePath.endsWith('.js')) {
                        headers['Content-Type'] = 'application/javascript';
                    } else if (filePath.endsWith('.html')) {
                        headers['Content-Type'] = 'text/html';
                    } else if (filePath.endsWith('.xml')) {
                        headers['Content-Type'] = 'application/xml';
                    }

                    return new Response(file, { headers });
                }

                // If no extension, try adding .html
                if (!filePath.includes('.')) {
                    const htmlFile = Bun.file(`./dist${filePath}.html`);
                    if (await htmlFile.exists()) {
                        return new Response(htmlFile, {
                            headers: { 'Content-Type': 'text/html' }
                        });
                    }
                }

                // Try index.html in that directory (for clean URLs)
                const indexFile = Bun.file(`./dist${filePath}/index.html`);
                if (await indexFile.exists()) {
                    return new Response(indexFile, {
                        headers: { 'Content-Type': 'text/html' }
                    });
                }

                // 404 fallback with WebAwesome styling
                const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Not Found | zachwill.com</title>
    <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-beta.3/dist/styles/webawesome.css" />
    <link rel="stylesheet" href="/assets/content.css" />
</head>
<body class="wa-palette-rudimentary wa-theme-tailspin">
    <wa-page>
        <main style="padding: var(--wa-space-xl); text-align: center;">
            <div style="margin-bottom: var(--wa-space-l);">
                <wa-badge appearance="filled" style="font-size: var(--wa-font-size-xl); background-color: var(--wa-color-red-90);">
                    <wa-icon name="exclamation-triangle" style="color: var(--wa-color-red-50);"></wa-icon>
                </wa-badge>
            </div>
            <h1 class="wa-heading-2xl">404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <div style="margin-top: var(--wa-space-l);">
                <a href="/" style="text-decoration: none;">
                    <wa-button appearance="primary">
                        <wa-icon name="house" slot="prefix"></wa-icon>
                        Go Home
                    </wa-button>
                </a>
            </div>
        </main>
    </wa-page>
    <script type="module" src="https://early.webawesome.com/webawesome@3.0.0-beta.3/dist/webawesome.ssr-loader.js"></script>
</body>
</html>`;

                return new Response(notFoundHtml, {
                    status: 404,
                    headers: { 'Content-Type': 'text/html' }
                });
            } catch (error) {
                console.error('Error serving file:', error);
                return new Response('Internal Server Error', {
                    status: 500,
                    headers: { 'Content-Type': 'text/plain' }
                });
            }
        },
    });

    console.log(`🌐 WebAwesome blog server running at ${server.url}`);
    console.log(`📱 Mobile responsive design with WebAwesome components`);
    return server;
}

function setupFileWatcher() {
    console.log('\n📁 Watching for changes in:');
    console.log('  - content/posts/ (Markdown and MDX files)');
    console.log('  - content/pages/ (Markdown and MDX files)');
    console.log('  - content/drafts/ (Markdown and MDX files)');
    console.log('  - src/templates/ (React components)');
    console.log('  - src/assets/ (CSS, images, etc.)');
    console.log('  - src/site.config.ts (Site configuration)');

    // Watch content files
    const contentWatcher = watch('./content', { recursive: true }, async (eventType, filename) => {
        if (filename && filename.match(/\.(md|mdx)$/)) {
            console.log(`\n📝 Content changed: ${filename}`);
            await buildSite();
        }
    });

    // Watch source files (templates, config, assets)
    const srcWatcher = watch('./src', { recursive: true }, async (eventType, filename) => {
        if (filename && !filename.includes('dev.ts')) {
            console.log(`\n🔧 Source changed: ${filename}`);
            await buildSite();
        }
    });

    return { contentWatcher, srcWatcher };
}

async function runDev() {
    console.log('🚀 Starting WebAwesome blog development mode...');
    console.log('🎨 Using WebAwesome design system with Tailspin theme');

    // Initial build
    await buildSite();

    // Start the development server
    const server = await startDevServer();

    // Set up file watching for automatic rebuilds
    const watchers = setupFileWatcher();

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n👋 Shutting down WebAwesome development server...');
        watchers.contentWatcher.close();
        watchers.srcWatcher.close();
        server.stop();
        process.exit(0);
    });

    console.log('\n💡 Press Ctrl+C to stop the development server');
    console.log('🔥 Hot reloading enabled - site rebuilds when files change');
    console.log('🧭 Navigate with the sidebar - posts organized by year');
    console.log('📱 Test mobile responsiveness with the responsive design');
}

runDev().catch(console.error); 