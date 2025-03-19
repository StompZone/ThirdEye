import fs from "fs";
import path from "path";

const buildDir = "./.build";
const packageFile = path.join(buildDir, "package.json");

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const originalPackageData = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));

const packageData = {
    name: originalPackageData.name,
    version: originalPackageData.version,
    productName: originalPackageData.productName,
    description: originalPackageData.description,
    dependencies: originalPackageData.dependencies,
    dependencies: originalPackageData.dependencies,
    type: "module",
};

fs.writeFileSync(packageFile, JSON.stringify(packageData, null, 2));
