// Define config as a type to serve as a template
export type ConfigTemplate = {
    debug: boolean;
    token: string;
    username: string;
    isRealm: boolean;
    realmInviteCode: string;
    ip: string;
    port: number;
    guild: string;
    channel: string;
    antiCheatEnabled: boolean;
    antiCheatChannelId: string;
    antiCheatLogsChannel: string;
    cmdPrefix: string;
    useSystemPlayerJoinMessage: boolean;
    logSystemCommands: boolean;
    systemCommandsChannel: string;
    sendWhisperMessages: boolean;
    useEmbed: boolean;
    setColor: readonly [number, number, number];
    setTitle: string;
    AuthType: boolean;
    admins: string[];
    blacklistDeviceTypes: string[];
    voiceChannelCommandPrefix: string;
    voiceChannelsCategory: string;
    voiceAdminRoleID: string;
    logBadActors: boolean;
    logoURL: string;
    clientId: string; // Discord application client ID for slash commands
};

// Default configuration used as fallback
export const defaultConfig: ConfigTemplate = {
    debug: false,
    token: "",
    username: "",
    isRealm: false,
    realmInviteCode: "",
    ip: "",
    port: 19132,
    guild: "",
    channel: "",
    antiCheatEnabled: true,
    antiCheatChannelId: "",
    antiCheatLogsChannel: "",
    cmdPrefix: "!",
    useSystemPlayerJoinMessage: false,
    logSystemCommands: false,
    systemCommandsChannel: "",
    sendWhisperMessages: false,
    useEmbed: true,
    setColor: [0, 153, 255] as const,
    setTitle: "My Servers Name!",
    AuthType: false,
    admins: [""],
    blacklistDeviceTypes: [],
    // Prefix for the command default is $ ie $voiceChannelCreate
    voiceChannelCommandPrefix: "$",
    // Category to create voice channels under.
    voiceChannelsCategory: "Voice Channels",
    //Put Your RoleID for admins to keep an eye on voice channels that get created
    voiceAdminRoleID: "",
    //Note all channels are created with a "v" in front this is used when cleaning up unused channels

    //If set to true, when a known bad actor sends a message to ThirdEye via discord or a discord Client it will be logged to the anticheat channel.
    logBadActors: true,
    //New logo image if you dont like it feel free to change it.
    logoURL: "https://i.imgur.com/XfoZ8XS.jpg",
    clientId: "", // Discord application client ID
};

export default defaultConfig;
