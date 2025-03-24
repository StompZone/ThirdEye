import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { logger } from "../logging/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface ConfigTemplate {
    token: string;
    guild: string;
    channel: string;
    username: string;
    antiCheatEnabled: boolean;
    antiCheatLogsChannel: string;
    logSystemCommands: boolean;
    systemCommandsChannel: string;
    cmdPrefix: string;
    admins: string[];
    useEmbed: boolean;
    setColor: string;
    setTitle: string;
    logoURL: string;
    sendWhisperMessages: boolean;
}

function validateConfig(config: Partial<ConfigTemplate>): ConfigTemplate {
    const requiredFields: (keyof ConfigTemplate)[] = ["token", "guild", "channel", "username", "cmdPrefix", "admins"];

    const missingFields = requiredFields.filter((field) => !config[field]);
    if (missingFields.length > 0) {
        throw new Error(`Missing required config fields: ${missingFields.join(", ")}`);
    }

    return config as ConfigTemplate;
}

export function loadConfig(): ConfigTemplate {
    try {
        const configPath = path.join(__dirname, "../../../config.json");
        const configFile = fs.readFileSync(configPath, "utf-8");
        const config = JSON.parse(configFile);

        return validateConfig(config);
    } catch (error) {
        logger.error(`Failed to load config: ${error.message}`);
        throw new Error(`Failed to load config: ${error.message}`);
    }
}
