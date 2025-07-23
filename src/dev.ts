import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runDev() {
    console.log('🚀 Dev mode: Running build...');

    try {
        await execAsync('bun run build');
        console.log('✅ Build completed. Use "cd dist && python3 -m http.server 8000" to preview.');
    } catch (error) {
        console.error('❌ Build failed:', error);
    }
}

runDev(); 