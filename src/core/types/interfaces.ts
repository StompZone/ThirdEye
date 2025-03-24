import { TextBasedChannel, Channel } from "discord.js";

// ============= Core Interfaces =============
export interface ILogger {
    log: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    close: () => void;
}

// ============= Discord Domain =============
export interface IDiscordMessage {
    content: string;
    author: {
        id: string;
        username?: string;
    };
    channel?: {
        id: string;
    };
}

export interface IChannelConfig {
    mainChannel: TextBasedChannel | null;
    anticheatChannel: TextBasedChannel | null;
    systemCommandsChannel: TextBasedChannel | null;
}

export interface DiscordMember {
    id: string;
    voice: {
        channel: Channel | null;
        setChannel: (channelId: string) => Promise<void>;
        setMute: (muted: boolean) => Promise<void>;
        setDeaf: (deafened: boolean) => Promise<void>;
    };
    user: {
        username: string;
    };
}

// ============= Minecraft Domain =============
export interface ITextPacket {
    message: string;
    parameters: string[];
}

export interface IMessagePacket {
    message: string;
    type: "json_whisper" | "chat";
    source_name?: string;
    needs_translation?: boolean;
    xuid?: string;
    platform_chat_id?: string;
    filtered_message?: string;
}

export interface ICommandRequest {
    type: "chat";
    needs_translation: boolean;
    source_name: string;
    xuid: string;
    platform_chat_id: string;
    message: string;
    filtered_message: string;
}

export interface IMinecraftCommandRequest {
    command: string;
    origin: {
        type: string;
        uuid: string;
        request_id: string;
    };
    internal: boolean;
    version: number;
}

// ============= Anti-Cheat Domain =============
export enum AntiCheatSource {
    Paradox = "Paradox",
    Scythe = "Scythe",
}

export interface IAntiCheatMessage {
    rawMessage: string;
    correctedText: string;
    source: AntiCheatSource;
}

// ============= Translation Domain =============
export interface IRawText {
    text?: string;
    translate?: string;
    with?: {
        rawtext?: Array<{ text: string }>;
    };
}

export interface ICorrectionMap {
    [key: string]: string;
}

export interface ILocalizationEntry {
    text: string;
    comment?: string;
}

export interface ILocalizationFile {
    [key: string]: ILocalizationEntry;
}

export interface ICSZETranslations {
    [key: string]: string;
}

// ============= Command Domain =============
export interface ParsedCommand {
    command: string;
    requester: string;
    args: string[];
}

// ============= System Domain =============
export interface IWhitelistData {
    whitelist: string[];
}

// ============= Message Types =============
export interface IWhisperPacket {
    type: string;
    message: string;
}

export interface IChatPacket {
    type: string;
    message: string;
}

export interface IJsonPacket {
    type: string;
    message: string;
}
