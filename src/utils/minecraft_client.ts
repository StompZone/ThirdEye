import { Client as BedrockClient, createClient } from "bedrock-protocol";
import { TextBasedChannel } from "discord.js";
import { ConfigTemplate } from "../core/config/types.js";
import { handleDisconnection } from "./message_handler.js";
import { decodeTTX, processMinecraftMessage } from "./text_corrections.js";
import { isTTXEncoded } from "../translation/translation.js";
import { logger } from "../core/logging/logger.js";
import { loadConfig } from "../core/config/configLoader.js";
const config = loadConfig();

/**
 * Creates and configures a Minecraft client based on the provided configuration
 *
 * @param config The application configuration
 * @param programName The name of the program to display in messages
 * @returns Configured Minecraft client
 */
export function setupMinecraftClient(config: ConfigTemplate, programName: string): BedrockClient {
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
              host: config.host,
              port: config.port,
              username: config.username,
              offline: config.AuthType,
              profilesFolder: "authentication_tokens",
          };

    logger.info(config.isRealm ? "Connecting to a realm" : "Connecting to a server");

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
export function setupClientEventHandlers(bot: BedrockClient, channelId: TextBasedChannel, anticheatChannelId: TextBasedChannel, programName: string, username: string): void {
    // Global variables
    const globals = {
        clientGamemode: "",
    };

    // Set up event handlers
    bot.on("spawn", () => {
        logger.info(`Bedrock bot logged in as ${username}`);
        if (anticheatChannelId) {
            anticheatChannelId.send(`[${programName}]: Client is logged in.`);
        }
    });

    bot.on("start_game", (packet) => {
        globals.clientGamemode = packet.player_gamemode.toString();
    });

    bot.on("login", () => {
        logger.info("Client has been authenticated by the server.");
    });

    bot.on("join", () => {
        logger.info("The client is ready to receive game packets.");
    });

    bot.on("close", () => {
        logger.info("The server has closed the connection.");
        if (anticheatChannelId) {
            handleDisconnection(anticheatChannelId, programName);
        }
    });

    async function handleDifficultyCommand(line: string, playerName: string) {
        logger.info(`Handling difficulty command: ${line}`);
        const DIFF_RE = /\.difficulty\s+(?<level>p(?:eaceful)?|e(?:asy)?|n(?:ormal)?|h(?:ard)?)(?:$|\s)/i;
        const m = DIFF_RE.exec(line);
        if (!m) return false;

        const difficulties: Record<"p" | "e" | "n" | "h", string> = { p: "peaceful", e: "easy", n: "normal", h: "hard" };
        const key = m.groups?.level[0].toLowerCase() as keyof typeof difficulties;
        const diffLevel = difficulties[key];
        if (!diffLevel) {
            logger.error(`Invalid difficulty level: ${m.groups.level[0]}`);
            return false;
        }

        const { exec } = await import("child_process");
        exec(`pm2 send 1 "difficulty ${diffLevel}"`, (error) => {
            if (error) {
                logger.error(`Error executing difficulty command: ${error}`);
                return;
            }
            logger.info(`Successfully changed difficulty to ${diffLevel}`);
            bot.queue("text", {
                type: "chat",
                needs_translation: false,
                source_name: config.username,
                xuid: "",
                platform_chat_id: "",
                message: `${playerName} changed the difficulty to ${diffLevel}`,
                filtered_message: "",
            });
        });
        return true;
    }

    bot.on("text", async (packet) => {
        // Skip if there's no channel to send to
        if (!channelId) {
            logger.info("Channel not found.");
            return;
        }

        const message = packet.message;
        const sender = packet.source_name || "Unknown";

        logger.info(`<bot.on("text")> Message: ${message} Source: ${packet.source_name} `);
        // Debug: log all properties of the packet
        try {
            logger.info(`<bot.on("text")> Packet: ${JSON.stringify(packet)}`);
        } catch (e) {
            // Serialization failed, log the packet as a string
            logger.info(`<bot.on("text")> Error decoding packet: ${e}`);
            // Individually log each property of the packet
            for (const [key, value] of Object.entries(packet)) {
                try {
                    logger.info(`<bot.on("text")> ${key}: ${value}`);
                } catch (e) {
                    logger.info(`<bot.on("text")> Error logging packet property: ${e}`);
                }
            }
        }

        const params = packet.parameters || [];

        // Skip system messages that are handled by PacketListenerService
        if (message.startsWith("death.") || message.startsWith("multiplayer.") || message.includes("§e.player.joined") || message.includes("§e.player.left") || (message.includes("OOF!") && message.includes("died in"))) {
            return;
        }

        // Skip messages that originated from Discord (sent by the bot using /say)
        if (message.match(/\[(?:§[0-9a-lr])*Discord(?:§[0-9a-lr])*\]/)) {
            return;
        }

        // Skip if the message is from the bot itself
        if (packet.source_name === username) {
            return;
        }

        // For regular chat messages, process normally
        let playerName = sender;
        let messageContent = message;

        // Check if this is a JSON message with rawtext
        try {
            if (message.startsWith("{") && message.includes("rawtext")) {
                const parsed = JSON.parse(message);
                if (parsed.rawtext && Array.isArray(parsed.rawtext)) {
                    // Try to extract player name if message has format <Player> Message
                    const fullText = parsed.rawtext.map((item: { text?: string }) => item.text || "").join("");
                    const playerMatch = fullText.match(/<([^>]+)>/);
                    if (playerMatch && playerMatch[1]) {
                        playerName = playerMatch[1].trim();
                        // Remove player name prefix from message
                        messageContent = fullText.replace(/<[^>]+>\s*/, "");
                    } else {
                        messageContent = fullText;
                    }
                }
            }
        } catch (e) {
            // If JSON parsing fails, continue with original message
            logger.info(`Failed to parse JSON in minecraft_client: ${e}`);
        }

        // Process the message with TTX decoding and text corrections
        messageContent = processMinecraftMessage(messageContent, params);
        if (isTTXEncoded(messageContent)) {
            messageContent = decodeTTX(messageContent);
        }

        // Check for difficulty command
        await handleDifficultyCommand(messageContent, playerName);

        // Format the message based on whether it's a system message or player message
        const discordMessage = playerName ? `**${playerName}**: ${messageContent}` : messageContent;

        channelId.send(discordMessage).catch(logger.error);
    });
    // Handle text messages from Minecraft
    // bot.on("text", (packet) => {
    //     // Skip if there's no channel to send to
    //     if (!channelId) {
    //         logger.info("Channel not found.");
    //         return;
    //     }

    //     const message = packet.message;
    //     const sender = packet.source_name || "Unknown";
    //     const params = packet.parameters || [];

    //     // Skip messages that originated from Discord (sent by the bot using /say)
    //     if (message.match(/\[(?:§[0-9a-lr])*Discord(?:§[0-9a-lr])*\]/)) {
    //         return;
    //     }

    //     // Try to extract player name from JSON if available
    //     let playerName = sender;
    //     let messageContent = message;

    //     // Check if this is a JSON message with rawtext
    //     try {
    //         if (message.startsWith("{") && message.includes("rawtext")) {
    //             const parsed = JSON.parse(message);
    //             if (parsed.rawtext && Array.isArray(parsed.rawtext)) {
    //                 // Try to extract player name if message has format <Player> Message
    //                 const fullText = parsed.rawtext.map((item: { text?: string }) => item.text || "").join("");

    //                 const playerMatch = fullText.match(/<([^>]+)>/);
    //                 if (playerMatch && playerMatch[1]) {
    //                     playerName = playerMatch[1].trim();
    //                     // Remove player name prefix from message
    //                     messageContent = fullText.replace(/<[^>]+>\s*/, "");
    //                 } else {
    //                     messageContent = fullText;
    //                 }
    //             }
    //         }
    //     } catch (e) {
    //         // If JSON parsing fails, continue with original message
    //         logger.info("Failed to parse JSON in minecraft_client:", e);
    //     }

    //     // Process the message with TTX decoding and text corrections
    //     messageContent = processMinecraftMessage(messageContent, params);

    //     if (isTTXEncoded(messageContent)) {
    //         messageContent = decodeTTX(messageContent);
    //     }

    //     // Send message to Discord
    //     const discordMessage = `**${playerName}**: ${messageContent}`;
    //     channelId.send(discordMessage).catch(logger.error);
    // });
}
