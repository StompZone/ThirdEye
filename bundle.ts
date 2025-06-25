import { createWriteStream, mkdirSync, existsSync } from "fs";
import { dirname } from "path";
import archiver from "archiver";
import packageJson from "./package.json" with { type: "json" };

const outputZip = `dist/phoenixepsilon-v${packageJson.version}.zip`;

// Create dist directory if it doesn't exist
const distDir = dirname(outputZip);
if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
}

const output = createWriteStream(outputZip);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => console.log(`Bundle created: ${outputZip} (${archive.pointer()} bytes)`));
archive.on("error", (err) => {
    throw err;
});

archive.pipe(output as unknown as NodeJS.WritableStream);
archive.directory(".build/", false);
archive.file("local.env.example", { name: "local.env.example" });
archive.finalize();
