import { TextBasedChannel } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Client } from "bedrock-protocol";
import { ITextPacket, AntiCheatSource } from "../../core/types/interfaces.js";
import { logger } from "../../core/logging/logger.js";
import { processMinecraftMessage } from "../../utils/text_corrections.js";

// Thumbnail mapping with regex patterns
const THUMBNAIL_MAPPING = [
    { pattern: /has banned/, url: "https://i.imgur.com/F18zcLY.png" },
    { pattern: /has been unbanned\./, url: "https://i.imgur.com/0MNCVoM.png" },
    { pattern: /Nuker\/A|Scaffold\/A|KillAura\/A/, url: "https://i.imgur.com/oClQXNb.png" },
];

export class AntiCheatService {
    setupListener(bot: Client, channel: TextBasedChannel): void {
        bot.on("text", (packet: ITextPacket) => {
            this.processAntiCheatMessage(packet, channel);
        });
    }

    processAntiCheatMessage(packet: ITextPacket, channel: TextBasedChannel): void {
        try {
            // Check if this is an anti-cheat message
            if (!this.isAntiCheatMessage(packet.message)) {
                return;
            }

            // Detect the source
            const source = this.detectAntiCheatSource(packet.message);
            if (!source) {
                return;
            }

            // Process and format the message
            const correctedText = processMinecraftMessage(packet.message, packet.parameters);
            if (!correctedText) {
                return;
            }

            // Create and send the message
            this.sendMessage(channel, {
                rawMessage: packet.message,
                correctedText,
                source,
            });
        } catch (error) {
            logger.error(`Error processing anti-cheat message: ${error.message}`);
        }
    }

    private isAntiCheatMessage(text: string): boolean {
        const antiCheatRegex = /(§[flor0-9])+\[§\d(Scythe|Available Commands|Paradox( AntiCheat Command Help)?)§\d\](§[olrf0-9])*/;
        return antiCheatRegex.test(text);
    }

    private detectAntiCheatSource(text: string): AntiCheatSource | null {
        if (!this.isAntiCheatMessage(text)) {
            return null;
        }
        return text.includes("Scythe") ? AntiCheatSource.Scythe : AntiCheatSource.Paradox;
    }

    private sendMessage(channel: TextBasedChannel, message: { rawMessage: string; correctedText: string; source: AntiCheatSource }): void {
        try {
            const embed = this.createEmbed(message.correctedText, message.source);
            channel.send({ embeds: [embed] }).catch((error) => {
                logger.error(`Failed to send anti-cheat message: ${error.message}`);
            });
        } catch (error) {
            logger.error(`Error sending anti-cheat message: ${error.message}`);
        }
    }

    private createEmbed(content: string, source: AntiCheatSource): EmbedBuilder {
        const embed = new EmbedBuilder().setColor("#FF0000").setTitle(`${source} Anti-Cheat Alert`).setDescription(`[In Game] ${content}`).setAuthor({ name: "‎", iconURL: "https://i.imgur.com/your-logo.png" });

        // Add thumbnail if we have a matching pattern
        const thumbUrl = this.getThumbUrlForMessage(content);
        if (thumbUrl) {
            embed.setThumbnail(thumbUrl);
        }

        return embed;
    }

    private getThumbUrlForMessage(content: string): string | null {
        for (const { pattern, url } of THUMBNAIL_MAPPING) {
            if (pattern.test(content)) {
                return url;
            }
        }
        return null;
    }
}
export const idList: string[] = ["804933185216577566"];
