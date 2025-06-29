import { cpSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

function copyMatchingFiles(dir) {
    try {
        const items = readdirSync(dir);
        for (const item of items) {
            const fullPath = join(dir, item);
            const stat = statSync(fullPath);

            if (stat.isDirectory()) {
                copyMatchingFiles(fullPath);
            } else {
                const ext = extname(item);
                if (['.json', '.bat', '.sh'].includes(ext)) {
                    const targetPath = join('.build', fullPath.replace('src/', ''));
                    try {
                        cpSync(fullPath, targetPath);
                    } catch (error) {
                        // Silently handle errors
                    }
                }
            }
        }
    } catch (error) {
        // Silently handle errors
    }
}

copyMatchingFiles('src');