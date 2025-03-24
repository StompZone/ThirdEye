import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { ILogger } from "./interface/interfaces.i";

export function createLogger(): ILogger {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Create logs directory if it doesn't exist
    const logsDir = path.join(__dirname, "logs");
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }

    // Create log file streams
    const date = new Date().toISOString().replace(/:/g, "-");
    const outLogPath = path.join(logsDir, `output-${date}.log`);
    const errLogPath = path.join(logsDir, `error-${date}.log`);
    const outLogStream = fs.createWriteStream(outLogPath, { flags: "a" });
    const errLogStream = fs.createWriteStream(errLogPath, { flags: "a" });

    return {
        log: (message: string) => {
            const formattedMessage = `${new Date().toISOString()} ${message}`;
            console.log(message);
            outLogStream.write(`${formattedMessage}\n`);
        },
        error: (message: string) => {
            const formattedMessage = `${new Date().toISOString()} ${message}`;
            console.error(message);
            errLogStream.write(`${formattedMessage}\n`);
        },
        close: () => {
            outLogStream.end();
            errLogStream.end();
        },
    };
}
