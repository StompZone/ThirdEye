import { mkdirSync } from 'fs';
import { join } from 'path';

// Create .build/bin directory
mkdirSync(join('.build', 'bin'), { recursive: true });