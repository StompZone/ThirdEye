import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const buildDir = "./.build";
const packageFile = path.join(buildDir, "package.json");

// Get the directory name in a cross-platform way
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const originalPackageData = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));

const packageData = {
    name: originalPackageData.name,
    version: originalPackageData.version,
    productName: originalPackageData.productName,
    description: originalPackageData.description,
    dependencies: originalPackageData.dependencies,
    type: "module",
};

fs.writeFileSync(packageFile, JSON.stringify(packageData, null, 2));
