import { Client as BedrockClient } from "bedrock-protocol";
import { logger } from "../../core/logging/logger.js";
import { IMinecraftCommandRequest } from "../../core/types/interfaces.js";

export class MinecraftCommandService {
    sendCommand(bot: BedrockClient, command: string): void {
        try {
            const commandRequest: IMinecraftCommandRequest = {
                command,
                origin: {
                    type: "player",
                    uuid: "",
                    request_id: "",
                },
                internal: false,
                version: 52,
            };

            bot.queue("command_request", commandRequest);
            logger.log(`Sent command to Minecraft: ${command}`);
        } catch (error) {
            logger.error(`Failed to send command to Minecraft: ${error.message}`);
            throw new Error(`Failed to send command: ${error.message}`);
        }
    }

    sendMessage(bot: BedrockClient, target: string, message: string): void {
        try {
            // Escape any quotes in the message to prevent command injection
            const escapedMessage = message.replace(/"/g, '\\"');
            const command = `/tellraw ${target} {"rawtext":[{"text":"${escapedMessage}"}]}`;
            this.sendCommand(bot, command);
        } catch (error) {
            logger.error(`Failed to send message to ${target}: ${error.message}`);
            throw new Error(`Failed to send message: ${error.message}`);
        }
    }
}
