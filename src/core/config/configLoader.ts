import fs from "fs";
import path from "path";
import { logger } from "../logging/logger";

export interface ConfigTemplate {
    token: string;
    guild: string;
    channel: string;
    username: string;
    host: string;
    port: number;
    version: string;
    debug: boolean;
    logLevel: string;
}

function validateConfig(config: ConfigTemplate): void {
    const requiredFields: (keyof ConfigTemplate)[] = ["token", "guild", "channel", "username", "host", "port", "version"];

    for (const field of requiredFields) {
        if (!config[field]) {
            throw new Error(`Missing required config field: ${field}`);
        }
    }
}

export function loadConfig(): ConfigTemplate {
    try {
        const configPath = path.join(process.cwd(), "config.json");
        const configData = fs.readFileSync(configPath, "utf-8");
        const config = JSON.parse(configData) as ConfigTemplate;

        validateConfig(config);
        return config;
    } catch (error) {
        logger.error(`Failed to load config: ${error.message}`);
        throw error;
    }
}
