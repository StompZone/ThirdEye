import { createClient, Client } from "bedrock-protocol";
import { ConfigTemplate } from "../config.js";
import { TextBasedChannel } from "discord.js";
import { handleDisconnection } from "./message_handler.js";
import { processMinecraftMessage } from "./text_corrections.js";

/**
 * Creates and configures a Minecraft client based on the provided configuration
 *
 * @param config The application configuration
 * @param programName The name of the program to display in messages
 * @returns Configured Minecraft client
 */
export function setupMinecraftClient(config: ConfigTemplate, programName: string): Client {
    // Determine client connection options based on config
    const options = config.isRealm
        ? {
              host: "realm.bedrock.server",
              port: 19132,
              username: config.username,
              offline: false,
              profilesFolder: "authentication_tokens",
          }
        : {
              host: config.ip,
              port: config.port,
              username: config.username,
              offline: config.AuthType,
              profilesFolder: "authentication_tokens",
          };

    console.log(config.isRealm ? "Connecting to a realm" : "Connecting to a server");

    // Create the client with the configured options
    const bot = createClient(options);

    return bot;
}

/**
 * Sets up event handlers for the Minecraft client
 *
 * @param bot The Minecraft client
 * @param channelId The main Discord channel for game messages
 * @param anticheatChannelId The channel for anti-cheat messages
 * @param programName The name of the program to display in messages
 * @param username The minecraft username
 */
export function setupClientEventHandlers(bot: Client, channelId: TextBasedChannel, anticheatChannelId: TextBasedChannel, programName: string, username: string): void {
    // Global variables
    const globals = {
        clientGamemode: "",
    };

    // Set up event handlers
    bot.on("spawn", () => {
        console.log(`Bedrock bot logged in as ${username}`);
        if (anticheatChannelId) {
            anticheatChannelId.send(`[${programName}]: Client is logged in.`);
        }
    });

    bot.on("start_game", (packet) => {
        globals.clientGamemode = packet.player_gamemode.toString();
    });

    bot.on("login", () => {
        console.log("Client has been authenticated by the server.");
    });

    bot.on("join", () => {
        console.log("The client is ready to receive game packets.");
    });

    bot.on("close", () => {
        console.log("The server has closed the connection.");
        if (anticheatChannelId) {
            handleDisconnection(anticheatChannelId, programName);
        }
    });

    // Handle text messages from Minecraft
    bot.on("text", (packet) => {
        // Skip if there's no channel to send to
        if (!channelId) {
            console.log("Channel not found.");
            return;
        }

        const message = packet.message;
        const sender = packet.source_name;
        const params = packet.parameters || [];

        // Skip messages that originated from Discord (sent by the bot using /say)
        if (message.match(/\[(?:§[0-9a-lr])*Discord(?:§[0-9a-lr])*\]/)) {
            return;
        }

        // Remove username patterns
        let cleanMessage = message.replace(new RegExp(`^\\[${sender}\\]\\s*`), "");
        cleanMessage = cleanMessage.replace(new RegExp(`^${sender}:\\s*`), "");

        // Process the message with TTX decoding and text corrections
        cleanMessage = processMinecraftMessage(cleanMessage, params);

        // Send message to Discord
        const discordMessage = `**${sender}**: ${cleanMessage}`;
        channelId.send(discordMessage).catch(console.error);
    });
}
