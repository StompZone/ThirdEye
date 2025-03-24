import { TextBasedChannel } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Client } from "bedrock-protocol";
import { IAntiCheatMessage, IMessagePacket, AntiCheatSource } from "../../core/types/interfaces";
import { logger } from "../../core/logging/logger";
import { processMinecraftMessage } from "../../utils/text_corrections";

interface ThumbnailMapping {
    pattern: RegExp;
    url: string;
}

const THUMBNAIL_MAPPINGS: ThumbnailMapping[] = [
    { pattern: /has banned/, url: "https://i.imgur.com/F18zcLY.png" },
    { pattern: /has been unbanned\./, url: "https://i.imgur.com/0MNCVoM.png" },
    { pattern: /Nuker\/A|Scaffold\/A|KillAura\/A/, url: "https://i.imgur.com/oClQXNb.png" },
];

export class AntiCheatService {
    private excludedPackets: string[] = ["commands.tp.successVictim", "gameMode.changed", "commands.give.successRecipient"];

    setupListener(bot: Client, channel: TextBasedChannel): void {
        bot.on("text", (packet: IMessagePacket) => {
            const antiCheatMessage = this.parseAntiCheatMessage(packet);
            if (antiCheatMessage) {
                this.sendMessage(antiCheatMessage, channel);
            }
        });
    }

    private parseAntiCheatMessage(packet: IMessagePacket): IAntiCheatMessage | null {
        try {
            const message = packet.message;
            const obj = JSON.parse(message);
            const rawText = obj.rawtext?.[0]?.text || "";

            if (!this.isAntiCheatMessage(rawText)) {
                return null;
            }

            const source = this.detectAntiCheatSource(rawText);
            const params = this.extractParameters(rawText);
            const correctedText = processMinecraftMessage(rawText, params);

            if (!correctedText) {
                return null;
            }

            return {
                rawMessage: rawText,
                correctedText,
                source,
            };
        } catch (error) {
            logger.error(`Error parsing anti-cheat message: ${error.message}`);
            return null;
        }
    }

    private isAntiCheatMessage(text: string): boolean {
        const antiCheatRegex = /(§[flor0-9])+\[§\d(Scythe|Available Commands|Paradox( AntiCheat Command Help)?)§\d\](§[olrf0-9])*/;
        return antiCheatRegex.test(text);
    }

    private detectAntiCheatSource(text: string): AntiCheatSource {
        return text.includes("Scythe") ? AntiCheatSource.Scythe : AntiCheatSource.Paradox;
    }

    private extractParameters(text: string): string[] {
        const params: string[] = [];
        const playerNameRegex = /(?:banned|kicked|reported by|using|detected on)\s+([A-Za-z0-9_]+)/g;
        let match;

        while ((match = playerNameRegex.exec(text)) !== null) {
            if (match[1]) {
                params.push(match[1]);
            }
        }

        return params;
    }

    private sendMessage(message: IAntiCheatMessage, channel: TextBasedChannel): void {
        try {
            const embed = this.createEmbed(message);
            channel.send({ embeds: [embed] }).catch((error) => {
                logger.error(`Failed to send anti-cheat message: ${error.message}`);
            });
        } catch (error) {
            logger.error(`Error sending anti-cheat message: ${error.message}`);
        }
    }

    private createEmbed(message: IAntiCheatMessage): EmbedBuilder {
        const embed = new EmbedBuilder().setColor("#FF0000").setTitle("Anti-Cheat Alert").setDescription(`[In Game] ${message.source}: ${message.correctedText}`).setAuthor({ name: "‎", iconURL: "https://i.imgur.com/your-logo.png" });

        const thumbUrl = this.getThumbUrlForMessage(message.correctedText);
        if (thumbUrl) {
            embed.setThumbnail(thumbUrl);
        }

        return embed;
    }

    private getThumbUrlForMessage(content: string): string | null {
        for (const { pattern, url } of THUMBNAIL_MAPPINGS) {
            if (pattern.test(content)) {
                return url;
            }
        }
        return null;
    }
}
