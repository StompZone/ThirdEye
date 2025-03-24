import { Client } from "bedrock-protocol";
import { TextBasedChannel } from "discord.js";
import { AntiCheatService } from "../../services/anticheat/AntiCheatService";
import { DeathMessageService } from "../../services/minecraft/DeathMessageService";
import { logger } from "../logging/logger";

export class ServiceManager {
    private antiCheatService: AntiCheatService;
    private deathMessageService: DeathMessageService;

    constructor() {
        this.antiCheatService = new AntiCheatService();
        this.deathMessageService = new DeathMessageService();
    }

    initializeServices(bot: Client, channel: TextBasedChannel): void {
        try {
            // Initialize anti-cheat listener
            this.antiCheatService.setupListener(bot, channel);
            logger.info("Anti-cheat service initialized");

            // Initialize death message listener
            this.deathMessageService.setupListener(bot, channel);
            logger.info("Death message service initialized");
        } catch (error) {
            logger.error(`Failed to initialize services: ${error.message}`);
            throw error;
        }
    }
}
