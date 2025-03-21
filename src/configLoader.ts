import { readFileSync, existsSync } from "fs";
import { ConfigTemplate, defaultConfig } from "./config.js";
import path from "path";
import * as dotenv from "dotenv";

/**
 * Load configuration from local.env file
 */
export function loadConfig(): ConfigTemplate {
    // Define the path to local.env
    const envPath = path.join(process.cwd(), "local.env");

    // Check if local.env exists
    if (!existsSync(envPath)) {
        console.warn("local.env file not found. Using default configuration.");
        return defaultConfig;
    }

    // Load environment variables from local.env
    const envConfig = dotenv.parse(readFileSync(envPath));

    // Create config by merging default with environment variables
    const config: ConfigTemplate = {
        ...defaultConfig,
        debug: parseBoolean(envConfig.DEBUG, defaultConfig.debug),
        token: envConfig.TOKEN || defaultConfig.token,
        username: envConfig.USERNAME || defaultConfig.username,
        isRealm: parseBoolean(envConfig.IS_REALM, defaultConfig.isRealm),
        realmInviteCode: envConfig.REALM_INVITE_CODE || defaultConfig.realmInviteCode,
        ip: envConfig.IP || defaultConfig.ip,
        port: parseInt(envConfig.PORT || String(defaultConfig.port)),
        guild: envConfig.GUILD || defaultConfig.guild,
        channel: envConfig.CHANNEL || defaultConfig.channel,
        antiCheatEnabled: parseBoolean(envConfig.ANTI_CHEAT_ENABLED, defaultConfig.antiCheatEnabled),
        antiCheatChannelId: envConfig.ANTI_CHEAT_CHANNEL_ID || defaultConfig.antiCheatChannelId,
        antiCheatLogsChannel: envConfig.ANTI_CHEAT_LOGS_CHANNEL || defaultConfig.antiCheatLogsChannel,
        cmdPrefix: envConfig.CMD_PREFIX || defaultConfig.cmdPrefix,
        useSystemPlayerJoinMessage: parseBoolean(envConfig.USE_SYSTEM_PLAYER_JOIN_MESSAGE, defaultConfig.useSystemPlayerJoinMessage),
        logSystemCommands: parseBoolean(envConfig.LOG_SYSTEM_COMMANDS, defaultConfig.logSystemCommands),
        systemCommandsChannel: envConfig.SYSTEM_COMMANDS_CHANNEL || defaultConfig.systemCommandsChannel,
        sendWhisperMessages: parseBoolean(envConfig.SEND_WHISPER_MESSAGES, defaultConfig.sendWhisperMessages),
        useEmbed: parseBoolean(envConfig.USE_EMBED, defaultConfig.useEmbed),
        setColor: parseColor(envConfig.SET_COLOR, defaultConfig.setColor),
        setTitle: envConfig.SET_TITLE || defaultConfig.setTitle,
        AuthType: parseBoolean(envConfig.AUTH_TYPE, defaultConfig.AuthType),
        admins: parseArray(envConfig.ADMINS, defaultConfig.admins),
        blacklistDeviceTypes: parseArray(envConfig.BLACKLIST_DEVICE_TYPES, defaultConfig.blacklistDeviceTypes),
        voiceChannelCommandPrefix: envConfig.VOICE_CHANNEL_COMMAND_PREFIX || defaultConfig.voiceChannelCommandPrefix,
        voiceChannelsCategory: envConfig.VOICE_CHANNELS_CATEGORY || defaultConfig.voiceChannelsCategory,
        voiceAdminRoleID: envConfig.VOICE_ADMIN_ROLE_ID || defaultConfig.voiceAdminRoleID,
        logBadActors: parseBoolean(envConfig.LOG_BAD_ACTORS, defaultConfig.logBadActors),
        logoURL: envConfig.LOGO_URL || defaultConfig.logoURL,
        clientId: envConfig.CLIENT_ID || defaultConfig.clientId,
    };

    // Validate required configurations
    validateConfig(config);

    return config;
}

/**
 * Parse a string to boolean
 */
function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
    if (value === undefined) return defaultValue;
    return value.toLowerCase() === "true";
}

/**
 * Parse a string to an array
 */
function parseArray(value: string | undefined, defaultValue: string[]): string[] {
    if (value === undefined) return defaultValue;
    return value.split(",").map((item) => item.trim());
}

/**
 * Parse a color string to RGB array
 */
function parseColor(value: string | undefined, defaultValue: readonly [number, number, number]): readonly [number, number, number] {
    if (value === undefined) return defaultValue;

    try {
        const colorArray = value.split(",").map((n) => parseInt(n.trim()));
        if (colorArray.length === 3 && colorArray.every((n) => !isNaN(n) && n >= 0 && n <= 255)) {
            return [colorArray[0], colorArray[1], colorArray[2]] as const;
        }
    } catch (error) {
        console.warn(`Invalid color format. Using default.`);
    }

    return defaultValue;
}

/**
 * Validate that critical config values are set
 */
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
        console.warn(`Warning: The following critical configuration values are missing: ${missingFields.join(", ")}`);
    }
}
