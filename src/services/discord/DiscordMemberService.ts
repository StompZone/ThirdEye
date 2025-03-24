import { Guild, VoiceChannel } from "discord.js";
import { DiscordMember } from "../../core/types/interfaces";
import { logger } from "../../core/logging/logger";

export class DiscordMemberService {
    async fetchMembers(guild: Guild, usernames: string[]): Promise<DiscordMember[]> {
        const fetchPromises = usernames.map((username) => this.fetchMember(guild, username));
        const results = await Promise.allSettled(fetchPromises);

        return results.filter((result): result is PromiseFulfilledResult<DiscordMember> => result.status === "fulfilled").map((result) => result.value);
    }

    async fetchMember(guild: Guild, username: string): Promise<DiscordMember> {
        try {
            const member = await guild.members.fetch({ query: username, limit: 1 });
            const firstMember = member.first();

            if (!firstMember) {
                throw new Error(`User ${username} not found in the server`);
            }

            return {
                id: firstMember.id,
                voice: {
                    channel: firstMember.voice.channel,
                    setChannel: async (channelId: string) => {
                        await firstMember.voice.setChannel(channelId);
                    },
                    setMute: async (muted: boolean) => {
                        await firstMember.voice.setMute(muted);
                    },
                    setDeaf: async (deafened: boolean) => {
                        await firstMember.voice.setDeaf(deafened);
                    },
                },
                user: {
                    username: firstMember.user.username,
                },
            };
        } catch (error) {
            logger.error(`Error fetching member ${username}: ${error.message}`);
            throw new Error(`Failed to fetch member ${username}: ${error.message}`);
        }
    }

    validateMembersNotInPrivateChannel(members: DiscordMember[]): string[] {
        return members
            .filter((member) => {
                const channel = member.voice.channel;
                return channel instanceof VoiceChannel && channel.name.startsWith("v");
            })
            .map((member) => member.user.username);
    }
}
