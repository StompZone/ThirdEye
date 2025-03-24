import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import { ConfigTemplate } from "./types.js";
import { logger } from "../logging/logger.js";

const DEFAULT_CONFIG: ConfigTemplate = {
    // Discord Configuration
    token: "",
    guild: "",
    channel: "",
    clientId: "",
    cmdPrefix: "!",
    admins: [],

    // Minecraft Configuration
    username: "",
    host: "",
    port: 19132,
    version: "1.20.0",
    isRealm: false,
    realmInviteCode: "",

    // Feature Flags
    debug: false,
    antiCheatEnabled: true,
    useSystemPlayerJoinMessage: false,
    logSystemCommands: false,
    sendWhisperMessages: false,
    useEmbed: true,
    AuthType: false,
    logBadActors: true,

    // Channel Configuration
    antiCheatChannelId: "",
    antiCheatLogsChannel: "",
    systemCommandsChannel: "",

    // Voice Channel Configuration
    voiceChannelCommandPrefix: "$",
    voiceChannelsCategory: "Voice Channels",
    voiceAdminRoleID: "",

    // UI Configuration
    setColor: [0, 153, 255] as const,
    setTitle: "Phoenix Epsilon",
    logoURL: "https://i.imgur.com/XfoZ8XS.jpg",

    // Device Configuration
    blacklistDeviceTypes: [],

    // Logging Configuration
    logLevel: "info",
};

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
    if (value === undefined) return defaultValue;
    return value.toLowerCase() === "true";
}

function parseArray(value: string | undefined, defaultValue: string[]): string[] {
    if (value === undefined) return defaultValue;
    return value.split(",").map((item) => item.trim());
}

function parseColor(value: string | undefined, defaultValue: readonly [number, number, number]): readonly [number, number, number] {
    if (value === undefined) return defaultValue;

    try {
        const colorArray = value.split(",").map((n) => parseInt(n.trim()));
        if (colorArray.length === 3 && colorArray.every((n) => !isNaN(n) && n >= 0 && n <= 255)) {
            return [colorArray[0], colorArray[1], colorArray[2]] as const;
        }
    } catch (error) {
        logger.log("Invalid color format. Using default."); // Changed to error() since warn() doesn't exist
    }

    return defaultValue;
}

function validateConfig(config: ConfigTemplate): void {
    const criticalFields: Array<{ field: keyof ConfigTemplate; name: string }> = [
        { field: "token", name: "Discord Bot Token" },
        { field: "username", name: "Minecraft Username" },
        { field: "guild", name: "Discord Guild ID" },
        { field: "channel", name: "Discord Channel ID" },
        { field: "clientId", name: "Discord Application Client ID" },
    ];

    const missingFields = criticalFields.filter(({ field }) => !config[field]).map(({ name }) => name);

    if (missingFields.length > 0) {
        logger.error(`Critical configuration values are missing: ${missingFields.join(", ")}`);
        throw new Error("Missing critical configuration values");
    }
}

export function loadConfig(): ConfigTemplate {
    try {
        // Try to load from local.env first
        const envPath = path.join(process.cwd(), "local.env");
        let config: ConfigTemplate = { ...DEFAULT_CONFIG };

        if (fs.existsSync(envPath)) {
            const envConfig = dotenv.parse(fs.readFileSync(envPath));

            // Merge environment variables with default config
            config = {
                ...config,
                debug: parseBoolean(envConfig.DEBUG, config.debug),
                token: envConfig.TOKEN || config.token,
                username: envConfig.USERNAME || config.username,
                isRealm: parseBoolean(envConfig.IS_REALM, config.isRealm),
                realmInviteCode: envConfig.REALM_INVITE_CODE || config.realmInviteCode,
                host: envConfig.IP || config.host,
                port: parseInt(envConfig.PORT || String(config.port)),
                guild: envConfig.GUILD || config.guild,
                channel: envConfig.CHANNEL || config.channel,
                antiCheatEnabled: parseBoolean(envConfig.ANTI_CHEAT_ENABLED, config.antiCheatEnabled),
                antiCheatChannelId: envConfig.ANTI_CHEAT_CHANNEL_ID || config.antiCheatChannelId,
                antiCheatLogsChannel: envConfig.ANTI_CHEAT_LOGS_CHANNEL || config.antiCheatLogsChannel,
                cmdPrefix: envConfig.CMD_PREFIX || config.cmdPrefix,
                useSystemPlayerJoinMessage: parseBoolean(envConfig.USE_SYSTEM_PLAYER_JOIN_MESSAGE, config.useSystemPlayerJoinMessage),
                logSystemCommands: parseBoolean(envConfig.LOG_SYSTEM_COMMANDS, config.logSystemCommands),
                systemCommandsChannel: envConfig.SYSTEM_COMMANDS_CHANNEL || config.systemCommandsChannel,
                sendWhisperMessages: parseBoolean(envConfig.SEND_WHISPER_MESSAGES, config.sendWhisperMessages),
                useEmbed: parseBoolean(envConfig.USE_EMBED, config.useEmbed),
                setColor: parseColor(envConfig.SET_COLOR, config.setColor),
                setTitle: envConfig.SET_TITLE || config.setTitle,
                AuthType: parseBoolean(envConfig.AUTH_TYPE, config.AuthType),
                admins: parseArray(envConfig.ADMINS, config.admins),
                blacklistDeviceTypes: parseArray(envConfig.BLACKLIST_DEVICE_TYPES, config.blacklistDeviceTypes),
                voiceChannelCommandPrefix: envConfig.VOICE_CHANNEL_COMMAND_PREFIX || config.voiceChannelCommandPrefix,
                voiceChannelsCategory: envConfig.VOICE_CHANNELS_CATEGORY || config.voiceChannelsCategory,
                voiceAdminRoleID: envConfig.VOICE_ADMIN_ROLE_ID || config.voiceAdminRoleID,
                logBadActors: parseBoolean(envConfig.LOG_BAD_ACTORS, config.logBadActors),
                logoURL: envConfig.LOGO_URL || config.logoURL,
                clientId: envConfig.CLIENT_ID || config.clientId,
                logLevel: envConfig.LOG_LEVEL || config.logLevel,
            };
        }

        // Validate the configuration
        validateConfig(config);

        logger.info("Configuration loaded successfully");
        return config;
    } catch (error) {
        logger.error(`Failed to load configuration: ${error.message}`);
        throw error;
    }
}
