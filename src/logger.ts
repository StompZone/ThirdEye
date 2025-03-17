import * as fs from "fs";
import * as path from "path";

interface Logger {
    log: (message: string) => void;
    error: (message: string) => void;
    close: () => void;
}

export function createLogger(): Logger {
    const logsDir = path.join(__dirname, "logs");
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }

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
