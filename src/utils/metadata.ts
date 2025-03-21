// Gets information about Phoenix Epsilon itself
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

function getPackageJson() {
    // Get current file's directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Read the package.json file
    const packagePath = join(__dirname, "..", "..", "package.json");
    const packageJson = JSON.parse(readFileSync(packagePath, "utf-8"));
    return packageJson;
}

export function getProgramName() {
    return getPackageJson().name;
}

export function getVersion() {
    return getPackageJson().version;
}

export const programName = getProgramName();
export const programVersion = getVersion();
