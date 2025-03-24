import { Client } from "bedrock-protocol";
import { EmbedBuilder, TextBasedChannel } from "discord.js";
import { logger } from "../../core/logging/logger.js";
import { ITextPacket } from "../../core/types/interfaces.js";
import { processMinecraftMessage } from "../../utils/text_corrections.js";

export class DeathMessageService {
    setupListener(bot: Client, channel: TextBasedChannel): void {
        bot.on("text", (packet: ITextPacket) => {
            if (packet.message.includes("death")) {
                this.processDeathMessage(packet, channel);
            }
        });
    }

    processDeathMessage(packet: ITextPacket, channel: TextBasedChannel): void {
        try {
            let playername = packet.parameters[0];

            // Handle special case for tamed animals
            if (playername.includes("%entity")) {
                playername = "A tamed Animal";
            }

            // Process the death message
            const correctedMessage = processMinecraftMessage(packet.message, packet.parameters);
            const content = `[In Game] ${playername}: ${correctedMessage}`;

            // Create and send embed
            const embed = new EmbedBuilder().setColor("#FF0000").setTitle("Death Message").setDescription(content).setAuthor({ name: "‎", iconURL: "https://i.imgur.com/your-logo.png" });

            channel.send({ embeds: [embed] }).catch((error) => {
                logger.error(`Failed to send death message: ${error.message}`);
            });
        } catch (error) {
            logger.error(`Error handling death message: ${error.message}`);
        }
    }
}
