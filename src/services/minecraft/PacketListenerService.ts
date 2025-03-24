import { Client } from "bedrock-protocol";
import { Guild, TextBasedChannel } from "discord.js";
import { logger } from "../../core/logging/logger.js";
import { IMessagePacket, ITextPacket } from "../../core/types/interfaces.js";

type PacketHandler<T> = (packet: T, ...args: any[]) => void | Promise<void>;

export class PacketListenerService {
    private textHandlers: Map<string, PacketHandler<ITextPacket>> = new Map();
    private jsonWhisperHandlers: Map<string, PacketHandler<IMessagePacket>> = new Map();
    private chatHandlers: Map<string, PacketHandler<IMessagePacket>> = new Map();
    private playerHandlers: Map<string, PacketHandler<any>> = new Map();

    /**
     * Initialize all packet listeners for the Minecraft client
     */
    setupListeners(bot: Client, channel: TextBasedChannel, guild?: Guild): void {
        // Set up the main text event listener that will dispatch to appropriate handlers
        bot.on("text", (packet: any) => this.handleTextPacket(packet, bot, channel, guild));

        // Set up player-related events
        bot.on("add_player", (packet: any) => this.dispatchPlayerEvent("add_player", packet, bot, channel));
        bot.on("remove_player", (packet: any) => this.dispatchPlayerEvent("remove_player", packet, bot, channel));

        logger.info("Packet listeners initialized");
    }

    /**
     * Register a handler for text packets containing specific content
     */
    registerTextHandler(id: string, pattern: string | RegExp, handler: PacketHandler<ITextPacket>): void {
        this.textHandlers.set(id, (packet, ...args) => {
            if (typeof pattern === "string" ? packet.message.includes(pattern) : pattern.test(packet.message)) {
                return handler(packet, ...args);
            }
        });
        logger.info(`Registered text handler: ${id}`);
    }

    /**
     * Register a handler for json_whisper command packets
     */
    registerJsonWhisperHandler(id: string, command: string, handler: PacketHandler<IMessagePacket>): void {
        this.jsonWhisperHandlers.set(id, (packet, ...args) => {
            if (packet.type === "json_whisper" && packet.message.includes(command)) {
                return handler(packet, ...args);
            }
        });
        logger.info(`Registered json_whisper handler: ${id}`);
    }

    /**
     * Register a handler for chat command packets
     */
    registerChatHandler(id: string, command: string, handler: PacketHandler<IMessagePacket>): void {
        this.chatHandlers.set(id, (packet, ...args) => {
            if (packet.type === "chat" && packet.message.includes(command)) {
                return handler(packet, ...args);
            }
        });
        logger.info(`Registered chat handler: ${id}`);
    }

    /**
     * Register a handler for player events (add_player, remove_player)
     */
    registerPlayerHandler(id: string, eventType: string, handler: PacketHandler<any>): void {
        this.playerHandlers.set(`${eventType}:${id}`, handler);
        logger.info(`Registered player handler: ${id} for ${eventType}`);
    }

    /**
     * Main packet handler that dispatches to appropriate handlers
     */
    private async handleTextPacket(packet: any, bot: Client, channel: TextBasedChannel, guild?: Guild): Promise<void> {
        try {
            // Process as text packet for general handlers
            for (const handler of this.textHandlers.values()) {
                await Promise.resolve(handler(packet, bot, channel));
            }

            // Check for specific message types
            if (packet.type === "json_whisper") {
                for (const handler of this.jsonWhisperHandlers.values()) {
                    await Promise.resolve(handler(packet, bot, channel, guild));
                }
            } else if (packet.type === "chat") {
                for (const handler of this.chatHandlers.values()) {
                    await Promise.resolve(handler(packet, bot, channel, guild));
                }
            }
        } catch (error) {
            logger.error(`Error handling packet: ${error.message}`);
        }
    }

    /**
     * Dispatch player-related events to registered handlers
     */
    private async dispatchPlayerEvent(eventType: string, packet: any, bot: Client, channel: TextBasedChannel): Promise<void> {
        try {
            for (const [key, handler] of this.playerHandlers.entries()) {
                if (key.startsWith(`${eventType}:`)) {
                    await Promise.resolve(handler(packet, bot, channel));
                }
            }
        } catch (error) {
            logger.error(`Error handling ${eventType} event: ${error.message}`);
        }
    }
}
