import { Guild, VoiceChannel, PermissionFlagsBits, ChannelType } from "discord.js";
import { logger } from "../../core/logging/logger.js";

export class VoiceChannelService {
    async createPrivateChannel(guild: Guild, channelName: string, memberIds: string[]): Promise<VoiceChannel> {
        try {
            // Create the channel with proper permissions
            const channel = (await guild.channels.create({
                name: channelName,
                type: ChannelType.GuildVoice,
                permissionOverwrites: [
                    // Deny access to everyone
                    {
                        id: guild.roles.everyone.id,
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect],
                    },
                    // Allow access to specified members
                    ...memberIds.map((id) => ({
                        id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect, PermissionFlagsBits.UseVAD, PermissionFlagsBits.Speak],
                    })),
                ],
            })) as VoiceChannel;

            logger.log(`Created voice channel: ${channelName}`);
            return channel;
        } catch (error) {
            logger.error(`Failed to create voice channel ${channelName}: ${error.message}`);
            throw new Error(`Failed to create voice channel: ${error.message}`);
        }
    }

    async updateChannelPermissions(
        channel: VoiceChannel,
        memberId: string,
        permissions: {
            ViewChannel?: boolean;
            Connect?: boolean;
            UseVAD?: boolean;
            Speak?: boolean;
        }
    ): Promise<void> {
        try {
            await channel.permissionOverwrites.edit(memberId, permissions);
            logger.log(`Updated permissions for member ${memberId} in channel ${channel.name}`);
        } catch (error) {
            logger.error(`Failed to update permissions for member ${memberId}: ${error.message}`);
            throw new Error(`Failed to update channel permissions: ${error.message}`);
        }
    }
}
