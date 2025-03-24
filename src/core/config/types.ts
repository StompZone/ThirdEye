export interface ConfigTemplate {
    // Discord Configuration
    token: string;
    guild: string;
    channel: string;
    clientId: string;
    cmdPrefix: string;
    admins: string[];

    // Minecraft Configuration
    username: string;
    host: string;
    port: number;
    version: string;
    isRealm: boolean;
    realmInviteCode: string;

    // Feature Flags
    debug: boolean;
    antiCheatEnabled: boolean;
    useSystemPlayerJoinMessage: boolean;
    logSystemCommands: boolean;
    sendWhisperMessages: boolean;
    useEmbed: boolean;
    AuthType: boolean;
    logBadActors: boolean;

    // Channel Configuration
    antiCheatChannelId: string;
    antiCheatLogsChannel: string;
    systemCommandsChannel: string;

    // Voice Channel Configuration
    voiceChannelCommandPrefix: string;
    voiceChannelsCategory: string;
    voiceAdminRoleID: string;

    // UI Configuration
    setColor: readonly [number, number, number];
    setTitle: string;
    logoURL: string;

    // Device Configuration
    blacklistDeviceTypes: string[];

    // Logging Configuration
    logLevel: string;
}
