import { exec } from 'child_process';
import { promisify } from 'util';
import chokidar from 'chokidar';
import { readFile, writeFile } from 'fs/promises';

const execAsync = promisify(exec);

let buildInProgress = false;
let serverProcess: any = null;

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

async function startServer() {
    console.log('🚀 Starting development server...');

    // Kill existing server if running
    if (serverProcess) {
        serverProcess.kill();
    }

    // Start new server
    const { spawn } = await import('child_process');
    serverProcess = spawn('python3', ['-m', 'http.server', '8000'], {
        cwd: './dist',
        stdio: 'pipe'
    });

    serverProcess.stdout.on('data', (data: any) => {
        const output = data.toString();
        if (output.includes('Serving HTTP')) {
            console.log('🌐 Server running at http://localhost:8000');
        }
    });

    serverProcess.on('error', (error: any) => {
        console.error('Server error:', error);
    });
}

async function createDevScript() {
    // Create a simple script to inject live reload functionality
    const liveReloadScript = `
<script>
(function() {
  let lastModified = Date.now();
  
  function checkForUpdates() {
    fetch('/dev-check')
      .catch(() => {
        // If dev-check fails, try to reload the page
        setTimeout(() => location.reload(), 1000);
      });
  }
  
  // Check every 2 seconds
  setInterval(checkForUpdates, 2000);
  
  console.log('🔥 Live reload enabled');
})();
</script>`;

    // Add this to the layout template (we'll inject it during dev mode)
    console.log('📝 Live reload script ready');
}

async function runDev() {
    console.log('🚀 Starting development mode...');

    // Initial build
    await buildSite();

    // Start the server
    await startServer();

    // Create live reload script
    await createDevScript();

    console.log('\n📁 Watching for changes in:');
    console.log('  - content/posts/');
    console.log('  - content/pages/');
    console.log('  - content/drafts/');
    console.log('  - src/');

    // Set up file watching
    const watcher = chokidar.watch([
        'content/**/*.{md,mdx}',
        'src/**/*.{ts,tsx,css}',
        'src/assets/**/*'
    ], {
        ignored: /node_modules|dist|\.git/,
        persistent: true,
        ignoreInitial: true
    });

    watcher.on('change', async (path) => {
        console.log(`\n📝 File changed: ${path}`);
        await buildSite();
        console.log('🔄 Refresh your browser to see changes\n');
    });

    watcher.on('add', async (path) => {
        console.log(`\n➕ File added: ${path}`);
        await buildSite();
        console.log('🔄 Refresh your browser to see changes\n');
    });

    watcher.on('unlink', async (path) => {
        console.log(`\n🗑️  File deleted: ${path}`);
        await buildSite();
        console.log('🔄 Refresh your browser to see changes\n');
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n👋 Shutting down development server...');
        watcher.close();
        if (serverProcess) {
            serverProcess.kill();
        }
        process.exit(0);
    });

    console.log('💡 Press Ctrl+C to stop the development server');
}

runDev().catch(console.error); 