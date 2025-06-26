import { Client } from "bedrock-protocol";
import { EmbedBuilder, TextBasedChannel } from "discord.js";
import { logger } from "../../core/logging/logger.js";
import { loadConfig } from "../../core/config/configLoader.js";
// import { MinecraftCommandService } from "./MinecraftCommandService.js";
// import { loadWhitelist } from "../../utils/whitelist_manager.js";

export class PlayerConnectionService {
    // private minecraftCommandService: MinecraftCommandService;
    private config = loadConfig();

    constructor() {
        // this.minecraftCommandService = new MinecraftCommandService();
    }

    /**
     * Handle player join/leave events
     * @param packet The player list packet
     * @param bot The Minecraft client
     * @param channel The Discord channel to send notifications to
     */
    async handlePlayerConnection(packet: any, bot: Client, channel: TextBasedChannel): Promise<void> {
        try {
            const wasJoin = packet.records.type === "add";
            const players = packet.records.records_count;

            for (let i = 0; i < players; i++) {
                try {
                    const player = packet.records.records[i];
                    const username = player.username;

                    // Skip if it's the bot itself
                    if (username === this.config.username) continue;

                    // // Check whitelist
                    // const whitelistData = loadWhitelist();
                    // const notWhitelisted = !whitelistData.whitelist.includes(username) &&
                    //     !this.config.admins.includes(player.xbox_user_id);

                    // // Check device platform
                    // const platform = player.build_platform;
                    // const isBannedDevice = this.config.blacklistDeviceTypes.includes(platform);

                    // // Handle banned device
                    // if (isBannedDevice && notWhitelisted && wasJoin) {
                    //     logger.info(`Kicking player ${username}, reason - banned device: ${platform}`);
                    //     setTimeout(() => {
                    //         this.minecraftCommandService.sendCommand(bot, `/kick "${username}" Banned device - ${platform}`);
                    //     }, 3000);
                    // }

                    // Send join/leave message to Discord
                    const msgColor = wasJoin ? "#10EE20" : "#DD1010";
                    const action = wasJoin ? "connected to" : "disconnected from";
                    const joinMessage = `${username} has ${action} ${this.config.setTitle}`;

                    const embedMsg = new EmbedBuilder()
                        .setColor(msgColor)
                        .setTitle(this.config.setTitle)
                        .setDescription(joinMessage)
                        .setAuthor({ name: "‎", iconURL: this.config.logoURL });

                    await channel.send({ embeds: [embedMsg] });
                    logger.info(joinMessage);

                } catch (error) {
                    logger.error(`Error handling player connection for record ${i}: ${error.message}`);
                }
            }
        } catch (error) {
            logger.error(`Error in handlePlayerConnection: ${error.message}`);
        }
    }
} 