import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { ILogger } from "../types/interfaces";

class Logger implements ILogger {
    private outLogStream: fs.WriteStream;
    private errLogStream: fs.WriteStream;

    constructor() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        // Create logs directory if it doesn't exist
        const logsDir = path.join(__dirname, "../../logs");
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        // Create log file streams with date-based filenames
        const date = new Date().toISOString().replace(/:/g, "-");
        const outLogPath = path.join(logsDir, `output-${date}.log`);
        const errLogPath = path.join(logsDir, `error-${date}.log`);

        this.outLogStream = fs.createWriteStream(outLogPath, { flags: "a" });
        this.errLogStream = fs.createWriteStream(errLogPath, { flags: "a" });

        // Handle process termination
        process.on("SIGINT", () => this.close());
        process.on("SIGTERM", () => this.close());
    }

    log(message: string): void {
        const formattedMessage = this.formatMessage(message);
        console.log(message);
        this.outLogStream.write(`${formattedMessage}\n`);
    }

    info(message: string): void {
        const formattedMessage = this.formatMessage(`[INFO] ${message}`);
        console.log(formattedMessage);
        this.outLogStream.write(`${formattedMessage}\n`);
    }

    error(message: string): void {
        const formattedMessage = this.formatMessage(`[ERROR] ${message}`);
        console.error(formattedMessage);
        this.errLogStream.write(`${formattedMessage}\n`);
    }

    close(): void {
        this.outLogStream.end();
        this.errLogStream.end();
        process.exit(0);
    }

    private formatMessage(message: string): string {
        return `[${new Date().toISOString()}] ${message}`;
    }
}

// Export singleton instance
export const logger = new Logger();
