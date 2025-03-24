import { Guild, Channel, ChannelType, PermissionsBitField } from "discord.js";
import { loadConfig } from "../core/config/configLoader.js";

const config = loadConfig();

export class VoiceChannelService {
    async createPrivateChannel(guild: Guild, channelName: string, memberIDs: string[]) {
        const category = this.findVoiceCategory(guild);

        return await guild.channels.create({
            name: channelName,
            type: ChannelType.GuildVoice,
            parent: category.id,
            permissionOverwrites: this.buildPermissionOverwrites(guild, memberIDs),
        });
    }

    private findVoiceCategory(guild: Guild): Channel {
        return guild.channels.cache.find((ch: Channel) => ch.type === ChannelType.GuildCategory && ch.name === config.voiceChannelsCategory);
    }

    private buildPermissionOverwrites(guild: Guild, memberIDs: string[]) {
        return [
            {
                id: config.voiceAdminRoleID,
                allow: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ViewChannel],
            },
            ...memberIDs.map((id) => ({
                id,
                allow: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.UseVAD, PermissionsBitField.Flags.Speak],
            })),
            {
                id: guild.roles.everyone,
                deny: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ViewChannel],
            },
        ];
    }
}
