import { EmbedBuilder, TextBasedChannel } from "discord.js";
import config from "../config.js";
import { Client } from "bedrock-protocol";
import { sendToChannel } from "../utils/discord_helpers.js";
import { processMinecraftMessage } from "../utils/text_corrections.js";

// Interface for text packets
interface TextPacket {
    message: string;
    parameters: string[];
}

/**
 * Sets up a listener for death messages in the Minecraft chat
 * @param bot The Minecraft client
 * @param channelId The Discord channel to send messages to
 */
export function setupDeathListener(bot: Client, channelId: TextBasedChannel): void {
    bot.on("text", (packet: TextPacket) => {
        if (!packet.message.includes("death")) {
            return;
        }

        processDeathMessage(packet, channelId);
    });
}

/**
 * Process a death message packet and send formatted message to Discord
 * @param packet The text packet containing death information
 * @param channelId The Discord channel to send the message to
 */
function processDeathMessage(packet: TextPacket, channelId: TextBasedChannel): void {
    let playername = packet.parameters[0];

    // Handle special case for tamed animals
    if (playername.includes("%entity")) {
        playername = "A tamed Animal";
    }

    // Use the processMinecraftMessage function to get the death reason
    const correctedMessage = processMinecraftMessage(packet.message, packet.parameters);
    const content = `[In Game] ${playername}: ${correctedMessage}`;

    if (config.useEmbed) {
        const embed = new EmbedBuilder().setColor(config.setColor).setTitle(config.setTitle).setDescription(content).setAuthor({ name: "‎", iconURL: config.logoURL });

        sendToChannel(channelId, { embeds: [embed] }, "Could not find the in-game channel in Discord.");
    } else {
        sendToChannel(channelId, `${content}`, "Could not find the in-game channel in Discord.");
    }
}
