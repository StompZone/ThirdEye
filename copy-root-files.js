import { cpSync } from 'fs';
import { join } from 'path';

const filesToCopy = ['package.json', 'LICENSE', 'README.md'];
const npmrcFiles = ['prod.npmrc'];

for (const file of filesToCopy) {
    try {
        cpSync(file, join('.build', file));
    } catch (error) {
        // Silently handle errors
    }
}

// Handle .npmrc separately
for (const npmrc of npmrcFiles) {
    try {
        cpSync(npmrc, join('.build', '.npmrc'));
    } catch (error) {
        // Silently handle errors
    }
}