import { Client } from "bedrock-protocol";

export class MinecraftCommandService {
    sendCommand(bot: Client, command: string): void {
        bot.queue("command_request", {
            command,
            origin: {
                type: "player",
                uuid: "",
                request_id: "",
            },
            internal: false,
            version: 52,
        });
    }

    sendMessage(bot: Client, target: string, message: string): void {
        const command = `/tellraw ${target} {"rawtext":[{"text":"${message}"}]}`;
        this.sendCommand(bot, command);
    }
}
