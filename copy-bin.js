import { cpSync, readdirSync } from 'fs';
import { join } from 'path';

try {
    const files = readdirSync('bin');
    for (const file of files) {
        cpSync(join('bin', file), join('.build', 'bin', file));
    }
} catch (error) {
    // Silently handle errors like the original || true did
    console.log('Note: No bin files to copy or destination does not exist');
}