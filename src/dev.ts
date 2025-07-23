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
    console.log('🔨 Building site...');

    try {
        await execAsync('bun run src/build.ts');
        console.log('✅ Build completed successfully');
    } catch (error) {
        console.error('❌ Build failed:', error);
    } finally {
        buildInProgress = false;
    }
}

async function startDevServer() {
    console.log('🚀 Starting Bun development server...');

    const server = serve({
        port: 8000,
        development: true,

        async fetch(req) {
            const url = new URL(req.url);

            // Handle dev status endpoint
            if (url.pathname === '/dev-status') {
                return new Response('OK', { status: 200 });
            }

            // Determine file path to serve
            let filePath = url.pathname;
            if (filePath === '/') {
                filePath = '/index.html';
            }

            try {
                // Try to serve the exact file
                const file = Bun.file(`./dist${filePath}`);
                if (await file.exists()) {
                    return new Response(file);
                }

                // If no extension, try adding .html
                if (!filePath.includes('.')) {
                    const htmlFile = Bun.file(`./dist${filePath}.html`);
                    if (await htmlFile.exists()) {
                        return new Response(htmlFile);
                    }
                }

                // Try index.html in that directory
                const indexFile = Bun.file(`./dist${filePath}/index.html`);
                if (await indexFile.exists()) {
                    return new Response(indexFile);
                }

                // 404 fallback
                return new Response('<!DOCTYPE html><html><body><h1>404 - Not Found</h1></body></html>', {
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

    console.log(`🌐 Server running at ${server.url}`);
    return server;
}

function setupFileWatcher() {
    console.log('\n📁 Watching for changes in:');
    console.log('  - content/posts/');
    console.log('  - content/pages/');
    console.log('  - content/drafts/');
    console.log('  - src/');

    // Watch content files
    const contentWatcher = watch('./content', { recursive: true }, async (eventType, filename) => {
        if (filename && filename.match(/\.(md|mdx)$/)) {
            console.log(`\n📝 Content changed: ${filename}`);
            await buildSite();
        }
    });

    // Watch source files
    const srcWatcher = watch('./src', { recursive: true }, async (eventType, filename) => {
        if (filename && !filename.includes('dev.ts')) {
            console.log(`\n🔧 Source changed: ${filename}`);
            await buildSite();
        }
    });

    return { contentWatcher, srcWatcher };
}

async function runDev() {
    console.log('🚀 Starting development mode with Bun...');

    // Initial build
    await buildSite();

    // Start the Bun development server
    const server = await startDevServer();

    // Set up file watching for rebuilds
    const watchers = setupFileWatcher();

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n👋 Shutting down development server...');
        watchers.contentWatcher.close();
        watchers.srcWatcher.close();
        server.stop();
        process.exit(0);
    });

    console.log('\n💡 Press Ctrl+C to stop the development server');
    console.log('🔥 Hot reloading enabled - browser will refresh when files change');
}

runDev().catch(console.error); 