import { readFileSync } from "fs";
import { join } from "path";

/**
 * Interface for correction mapping
 * Key is the pattern to replace, value is the replacement
 */
interface CorrectionMap {
    [key: string]: string;
}

/**
 * Interface for localization entry
 */
interface LocalizationEntry {
    text: string;
    comment?: string;
}

/**
 * Interface for localization file
 */
interface LocalizationFile {
    [key: string]: LocalizationEntry;
}

// Custom death message patterns
const CUSTOM_DEATH_MESSAGES: CorrectionMap = {
    // Mob deaths
    "%entity.zombie.name%": "Zombie",
    "%entity.skeleton.name%": "Skeleton",
    "%entity.spider.name%": "Spider",
    "%entity.enderman.name%": "Enderman",
    "%entity.zombie_pigman.name%": "Zombie Pigman",
    "%entity.iron_golem.name%": "Iron Golem",
    "%entity.piglin_brute.name%": "Piglin Brute",
    "%entity.piglin.name%": "Piglin",
    "%entity.wither_skeleton.name%": "Wither Skeleton",
    "%entity.bee.name%": "Bee",
    "%entity.magma_cube.name%": "Magma Cube",
    "%entity.zoglin.name%": "Zoglin",
    "%entity.blaze.name%": "Blaze",
    "%entity.polar_bear.name%": "Polar Bear",
    "%entity.wolf.name%": "Wolf",
    "%entity.guardian.name%": "Guardian",
    "%entity.elder_guardian.name%": "Elder Guardian",
    "%entity.stray.name%": "Stray",
    "%entity.husk.name%": "Husk",
    "%entity.pillager.name%": "Pillager",
    "%entity.vex.name%": "Vex",
    "%entity.evocation_illager.name%": "Evoker",
    "%entity.vindicator.name%": "Vindicator",
    "%entity.shulker.name%": "Shulker",
    "%entity.ender_dragon.name%": "Ender Dragon",
    "%entity.witch.name%": "Witch",
    "%entity.warden.name%": "Warden",
    "%entity.drowned.name%": "Drowned",
    "%entity.breeze.name%": "Breeze",
    "%entity.ravager.name%": "Ravager",

    // Death reasons (these might be in the localization file, but adding them here ensures they work)
    "death.attack.mob": "%1$s was slain by %2$s",
    "death.attack.arrow": "%1$s was shot by %2$s",
    "death.attack.indirectMagic": "%1$s was killed by %2$s using magic",
    "death.attack.bullet": "%1$s was shot",
    "death.attack.inWall": "%1$s suffocated in a wall",
    "death.attack.explosion.player": "%1$s was blown up by %2$s",
    "death.attack.onFire": "%1$s went up in flames",
    "death.attack.player": "%1$s was slain by %2$s",
    "death.attack.inFire": "%1$s went up in flames",
    "death.attack.drown": "%1$s drowned",
    "death.attack.outOfWorld": "%1$s fell out of the world",
    "death.attack.sonicBoom.player": "%1$s was obliterated by a sonic boom while fighting %2$s",
    "death.fell.accident.generic": "%1$s fell from a high place",
    "death.attack.fall": "%1$s hit the ground too hard",
    "death.attack.player.item": "%1$s was slain by %2$s using %3$s",
    "death.attack.lava": "%1$s tried to swim in lava",
    "death.attack.generic": "%1$s died",
    "death.attack.flyIntoWall": "%1$s experienced kinetic energy",
    "death.attack.wither": "%1$s withered away",
    "death.attack.trident": "%1$s was impaled by %2$s",
};

/**
 * Load localizations from the en_US.json file
 * @returns Parsed localization data
 */
function loadLocalizations(): LocalizationFile {
    try {
        const filePath = join(process.cwd(), "src", "en_US.json");
        const fileContent = readFileSync(filePath, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error loading localizations:", error);
        return {};
    }
}

/**
 * Build correction map from localizations
 * @returns Correction map for text replacement
 */
function buildCorrectionMap(): CorrectionMap {
    const localizations = loadLocalizations();
    const correctionMap: CorrectionMap = { ...CUSTOM_DEATH_MESSAGES };

    // Process localizations and convert to correction patterns
    for (const [key, entry] of Object.entries(localizations)) {
        // Skip if we already have a custom mapping
        if (correctionMap[`%${key}%`] !== undefined) {
            continue;
        }

        // Use the key as the pattern to match (Minecraft's internal identifiers)
        // like "entity.zombie.name" which would appear in text
        const pattern = "%" + key + "%";

        // Use the text as the replacement
        const replacement = entry.text;

        // Add to correction map
        correctionMap[pattern] = replacement;
    }

    return correctionMap;
}

/**
 * Map of text patterns to corrected versions
 * This is built from the en_US.json localization file
 */
export const correction: CorrectionMap = buildCorrectionMap();

/**
 * Format a parameterized message using standard Minecraft parameter format
 * @param template The message template with parameters like %1$s
 * @param params The parameters to insert
 * @returns Formatted message
 */
function formatParameterizedMessage(template: string, params: string[]): string {
    // Replace %1$s, %2$s, etc. with the respective parameters
    return template.replace(/%(\d+)\$s/g, (match, paramIndex) => {
        const index = parseInt(paramIndex, 10) - 1;
        return index >= 0 && index < params.length ? params[index] : match;
    });
}

/**
 * Corrects text by applying defined replacement patterns
 *
 * @param message The message to correct
 * @param params Optional parameters for parameterized messages
 * @returns The corrected message
 */
export function autoCorrect(message: string, params: string[] = []): string {
    if (!message) return message;

    let correctedMessage = message;

    // First, handle standard Minecraft localization format
    // Example: %entity.zombie.name% -> Zombie
    for (const [key, value] of Object.entries(correction)) {
        correctedMessage = correctedMessage.replace(
            new RegExp(key, "g"),
            // If the value contains parameter placeholders, format it
            value.includes("%1$s") ? formatParameterizedMessage(value, params) : value
        );
    }

    // Handle special Minecraft formatting codes (§)
    correctedMessage = correctedMessage.replace(/§[0-9a-fklmnor]/g, "");

    return correctedMessage;
}
