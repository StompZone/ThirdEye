import { spawn } from "child_process";
import { createLogger } from "./logger";

function startMain() {
    const logger = createLogger();
    const mainProcess = spawn("node", ["main.js"]);

    mainProcess.on("exit", (code) => {
        logger.log(`main.js exited with code ${code}`);
        logger.log("Restarting main.js...");

        logger.close();

        startMain();
    });

    mainProcess.stdout.on("data", (data) => {
        logger.log(`[PHX LOG] ${data}`);
    });

    mainProcess.stderr.on("data", (data) => {
        logger.error(`[PHX ERR] ${data}`);
    });
}

startMain();
