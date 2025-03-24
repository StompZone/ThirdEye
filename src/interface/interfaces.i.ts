import { TextBasedChannel } from "discord.js";
import { AntiCheatSource } from "../anticheat_listener/anticheat_logs";
import { ILocalizationEntry } from "./interfaces.i";

export interface ILogger {
    log: (message: string) => void;
    error: (message: string) => void;
    close: () => void;
} // Define proper interfaces
export interface IMessagePacket {
    message: string;
}
export interface IAntiCheatMessage {
    rawMessage: string;
    correctedText: string;
    source: AntiCheatSource;
} // Interface for text packets
export interface ITextPacket {
    message: string;
    parameters: string[];
}
export interface IRawText {
    text?: string;
    translate?: string;
    with?: {
        rawtext?: Array<{ text: string }>;
    };
}
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
} // Interface for channel configuration
export interface IChannelConfig {
    mainChannel: TextBasedChannel | null;
    anticheatChannel: TextBasedChannel | null;
    systemCommandsChannel: TextBasedChannel | null;
} // Types for command requests
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
export interface IDiscordMessage {
    content: string;
    author: {
        id: string;
        username?: string;
    };
    channel?: {
        id: string;
    };
} /**
 * Interface for correction mapping
 * Key is the pattern to replace, value is the replacement
 */
export interface ICorrectionMap {
    [key: string]: string;
} /**
 * Interface for localization entry
 */
export interface ILocalizationEntry {
    text: string;
    comment?: string;
} /**
 * Interface for localization file
 */
export interface ILocalizationFile {
    [key: string]: ILocalizationEntry;
} /**
 * Interface for CSZE custom translations
 */
export interface ICSZETranslations {
    [key: string]: string;
}
export interface IWhitelistData {
    whitelist: string[];
}
