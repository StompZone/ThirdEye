import { readFileSync, writeFileSync } from "fs";
import { Client, GatewayIntentBits, EmbedBuilder, ColorResolvable } from "discord.js";
import { createClient } from "bedrock-protocol";
import config from "./config.js";
import { setupDeathListener } from "./death_listener/deathMessage.js";
import { addPlayerListener } from "./player_device_listener/playerDeviceLogging.js";
import { setupSystemCommandsListener } from "./system_commands_listener/systemCommandsLogging.js";
import { setupVoiceChatListener } from "./voiceChat_listener/voiceChat.js";
import { checkAndDeleteEmptyChannels } from "./voiceChat_listener/voiceChatCleanUp.js";
import { setupAntiCheatListener } from "./anticheat_listener/anticheat_logs.js";
import { idList } from "./badActors.js";

const programName = "Phoneix Epsilon";
let __GLOBALS = {
    clientGamemode: "",
};
const { MessageContent, GuildMessages, Guilds, GuildVoiceStates } = GatewayIntentBits;
const { channel, token, systemCommandsChannel, cmdPrefix, logSystemCommands, guild, admins, antiCheatLogsChannel } = config;

// Import TextChannel type
import { TextBasedChannel } from "discord.js";

// Typed channel variables
let channelId: TextBasedChannel, anticheatChannelId: TextBasedChannel, systemCommandsChannelId: TextBasedChannel;
const antiCheatEnabled = false;

export const correction = {
    // TODO: Add correction mappings
};

let WhitelistRead = JSON.parse(readFileSync("whitelist.json", "utf-8"));

const client = new Client({ intents: [Guilds, GuildMessages, MessageContent, GuildVoiceStates] });
client.login(token);

let options;

console.log("ThirdEye v1.0.10");

if (config.isRealm) {
    console.log("Connecting to a realm");
    options = {
        host: "realm.bedrock.server",
        port: 19132,
        username: config.username,
        offline: false,
        profilesFolder: "authentication_tokens",
    };
} else {
    console.log("Connecting to a server");
    options = {
        host: config.ip,
        port: config.port,
        username: config.username,
        offline: config.AuthType,
        profilesFolder: "authentication_tokens",
    };
}

const bot = createClient(options);

bot.on("spawn", () => {
    console.log(`Bedrock bot logged in as ${config.username}`);
    sendMessageToChannel(anticheatChannelId, `[${programName}]: Client is logged in.`);
});

bot.on("start_game", (packet) => {
    __GLOBALS.clientGamemode = packet.player_gamemode.toString();
});

client.once("ready", async (c) => {
    console.log(`Discord bot logged in as ${c.user.tag}`);
    console.log("Channel ID from config:", channel);

    try {
        const fetchedChannel = await client.channels.fetch(channel);
        if (!fetchedChannel?.isTextBased()) {
            throw new Error("Channel is not text-based");
        }
        channelId = fetchedChannel as TextBasedChannel;
        const channelName = "name" in fetchedChannel ? fetchedChannel.name : "Direct Message";
        console.log(`Found channel: ${channelName} (ID: ${channelId.id})`);
        setupDeathListener(bot, channelId);
        addPlayerListener(bot, channelId, WhitelistRead);
    } catch (error) {
        if (antiCheatEnabled) {
            const channel = client.channels.cache.get(antiCheatLogsChannel);
            if (channel?.isTextBased()) {
                anticheatChannelId = channel;
                setupAntiCheatListener(bot, anticheatChannelId);
            } else {
                console.log(`I could not find the paradoxLogs Channel in Discord.`);
            }
        }
        if (logSystemCommands) {
            const channel = client.channels.cache.get(systemCommandsChannel);
            if (channel?.isTextBased()) {
                systemCommandsChannelId = channel;
                setupSystemCommandsListener(bot, systemCommandsChannelId);
            } else {
                console.log(`I could not find the systemLogs Channel in Discord.`);
            }
        }

        if (logSystemCommands) {
            const channel = client.channels.cache.get(systemCommandsChannel);
            if (channel?.isTextBased()) {
                systemCommandsChannelId = channel;
                setupSystemCommandsListener(bot, systemCommandsChannelId);
            } else {
                console.log(`I could not find the systemLogs Channel in Discord.`);
            }
        }

        const guildObj = client.guilds.cache.get(guild);
        if (guildObj) {
            console.log(`Found guild: ${guildObj.name}`);
        } else {
            console.error(`Guild with ID ${guild} not found.`);
        }

        setupVoiceChatListener(bot, guildObj);
    }
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const isAdmin = admins.includes(message.author.id);
    const isAnticheatChannel = anticheatChannelId && message.channel.id === anticheatChannelId.id;

    if (message.content.startsWith(cmdPrefix)) {
        handleCommand(message, isAdmin, isAnticheatChannel);
    } else if (message.content.startsWith("$")) {
        handleWhitelistCommand(message, isAdmin, isAnticheatChannel);
    } else if (channelId && message.channel.id === channelId.id) {
        handleChatMessage(message);
    }
});

client.on("voiceStateUpdate", (newState) => {
    checkAndDeleteEmptyChannels(newState.guild);
});

bot.on("close", () => {
    console.log("The server has closed the connection.");
    handleDisconnection();
});

bot.on("login", () => {
    console.log("Client has been authenticated by the server.");
});

bot.on("join", () => {
    console.log("The client is ready to receive game packets.");
});

bot.on("text", (packet) => {
    let message = packet.message;
    const sender = packet.source_name;

    // Remove username patterns like "[Username]" or "Username:" from the start of the message
    message = message.replace(new RegExp(`^\\[${sender}\\]\\s*`), "");
    message = message.replace(new RegExp(`^${sender}:\\s*`), "");

    if (channelId) {
        const discordMessage = `**${sender}**: ${message}`;
        channelId.send(discordMessage).catch(console.error);
    } else {
        console.log("Channel not found.");
    }
});

interface MessageChannel {
    send: (content: string | { embeds: EmbedBuilder[] }) => Promise<any>;
}

function parseColor(color: string | number | number[] | readonly number[]): ColorResolvable {
    // If it's already a number, return it
    if (typeof color === "number") {
        return color;
    }

    // If it's an array of RGB values, convert to hex number
    if (Array.isArray(color) && color.length >= 3) {
        const [r, g, b] = color;
        return (r << 16) | (g << 8) | b;
    }

    // Handle hex colors (with or without #)
    if (typeof color === "string") {
        // If it's a hex string starting with #, convert to number
        if (color.startsWith("#")) {
            return parseInt(color.slice(1), 16);
        }
        // If it's a hex string without #, convert to number
        if (/^[0-9A-Fa-f]{6}$/.test(color)) {
            return parseInt(color, 16);
        }
        // Try to handle color names by returning the string
        return color as ColorResolvable;
    }

    // Default to a safe color (blue) if all else fails
    return 0x3498db;
}

function sendMessageToChannel(channel: MessageChannel | null | undefined, message: string): void {
    if (!channel) {
        console.log("Channel is undefined or null");
        return;
    }

    try {
        if (config.useEmbed) {
            const msgEmbed = new EmbedBuilder().setColor(parseColor(config.setColor)).setTitle(config.setTitle).setDescription(message).setAuthor({ name: "‎", iconURL: config.logoURL });
            channel.send({ embeds: [msgEmbed] }).catch((error: Error) => {
                console.error("Error sending embed message:", error);
            });
        } else {
            channel.send(message).catch((error: Error) => {
                console.error("Error sending text message:", error);
            });
        }
    } catch (error) {
        console.error("Error in sendMessageToChannel:", error);
    }
}

interface CommandRequest {
    type: "chat";
    needs_translation: boolean;
    source_name: string;
    xuid: string;
    platform_chat_id: string;
    message: string;
    filtered_message: string;
}

interface DiscordMessage {
    content: string;
    author: {
        id: string;
    };
}

function handleCommand(message: DiscordMessage, isAdmin: boolean, isAnticheatChannel: boolean): void {
    if (!isAdmin || !isAnticheatChannel) return;

    const command: string = message.content.startsWith(cmdPrefix + "/") ? message.content.slice(2) : message.content;
    const type: "command_request" | "text" = message.content.startsWith(cmdPrefix + "/") ? "command_request" : "text";

    bot.queue(type, {
        type: "chat",
        needs_translation: false,
        source_name: config.username,
        xuid: "",
        platform_chat_id: "",
        message: command,
        filtered_message: "",
    } as CommandRequest);
    console.log(`Command received: ${command} From: ${message.author.id}`);
}

interface WhitelistData {
    whitelist: string[];
}

function handleWhitelistCommand(message: { content: string; author: { id: string } }, isAdmin: boolean, isAnticheatChannel: boolean): void {
    if (!isAdmin || !isAnticheatChannel) return;

    const content: string = message.content.replace("$", "");
    if (content === "reboot") {
        console.log("Forcing a reconnect.");
        process.exit();
    } else if (content.endsWith("-r")) {
        const name: string = content.replace("-r", "");
        WhitelistRead.whitelist = WhitelistRead.whitelist.filter((n: string) => n !== name);
        console.log(`Removed ${name} from the whitelist.`);
    } else {
        WhitelistRead.whitelist.push(content);
        console.log(`Added ${content} to the whitelist.`);
    }
    writeFileSync("whitelist.json", JSON.stringify(WhitelistRead, null, 2), "utf-8");
    WhitelistRead = JSON.parse(readFileSync("whitelist.json", "utf-8")) as WhitelistData;
}

interface DiscordChatMessage {
    author: {
        id: string;
        username: string;
    };
    content: string;
}

interface CommandRequest {
    command: string;
    origin: {
        type: string;
        uuid: string;
        request_id: string;
    };
    internal: boolean;
    version: number;
}

function handleChatMessage(message: DiscordChatMessage): void {
    const isBadActor: boolean = idList.includes(message.author.id);
    const cmd: string = isBadActor ? `/say §8[§9Discord§8] §4${message.author.username} (Known Hacker/Troll) : §f${message.content}` : `/say §8[§9Discord§8] §7${message.author.username}: §f${message.content}`;

    console.log(`Sending command to Minecraft server: ${cmd}`);
    bot.queue("command_request", {
        command: cmd,
        origin: {
            type: "player",
            uuid: "",
            request_id: "",
        },
        internal: false,
        version: 52,
    } as CommandRequest);

    if (isBadActor && config.logBadActors) {
        const msgEmbed: EmbedBuilder = new EmbedBuilder()
            .setColor(parseColor(config.setColor))
            .setTitle(config.setTitle)
            .setDescription(`Message sent to the bot from Discord from Author: ${message.author.username} Content: ${message.content} Unique ID: ${message.author.id}`)
            .setAuthor({ name: "‎", iconURL: config.logoURL })
            .setThumbnail("https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/76/Impulse_Command_Block.gif/revision/latest?cb=20191017044126");
        anticheatChannelId.send({ embeds: [msgEmbed] });
    }
}

function handleDisconnection() {
    let remainingTime = 2 * 60;
    sendMessageToChannel(anticheatChannelId, `[${programName}]: The client has lost connection to the server and will initiate a reboot in: ${remainingTime} Seconds`);

    const interval = setInterval(() => {
        remainingTime--;
        if (remainingTime <= 0) {
            clearInterval(interval);
            process.exit();
        }
    }, 1000);
}

interface CorrectionMap {
    [key: string]: string;
}

export function autoCorrect(message: string): string {
    let correctedMessage = message;
    for (const [key, value] of Object.entries(correction as CorrectionMap)) {
        correctedMessage = correctedMessage.replace(new RegExp(key, "g"), value);
    }
    return correctedMessage;
}
