import { createWriteStream } from "fs";
import archiver from "archiver";
import packageJson from "./package.json" with { type: "json" };

const outputZip = `dist/phoenixepsilon-v${packageJson.version}.zip`;
const output = createWriteStream(outputZip);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => console.log(`Bundle created: ${outputZip} (${archive.pointer()} bytes)`));
archive.on("error", (err) => { throw err; });

archive.pipe(output);
archive.directory(".build/", false);
archive.file("local.env.example", { name: "local.env.example" });
archive.finalize();
