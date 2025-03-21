import { REST, Routes } from "discord.js";
import { data as translateContextMenu } from "./translateContextMenu.js";
import config from "../config.js";

const commands = [translateContextMenu.toJSON()];

export async function registerCommands() {
    const rest = new REST({ version: "10" }).setToken(config.token);

    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationGuildCommands(
                config.clientId || "", // Client ID should be added to config
                config.guild
            ),
            { body: commands }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error("Error registering commands:", error);
    }
}
