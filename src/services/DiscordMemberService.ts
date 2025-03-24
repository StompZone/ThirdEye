import { Guild, VoiceChannel } from "discord.js";
import { DiscordMember } from "../interface/interfaces.i";

export class DiscordMemberService {
    async fetchMembers(guild: Guild, usernames: string[]): Promise<DiscordMember[]> {
        const fetchPromises = usernames.map((username) => this.fetchMember(guild, username));
        const results = await Promise.allSettled(fetchPromises);

        return results.filter((result): result is PromiseFulfilledResult<DiscordMember> => result.status === "fulfilled").map((result) => result.value);
    }

    async fetchMember(guild: Guild, username: string): Promise<DiscordMember> {
        const fetchedMembers = await guild.members.fetch({ query: username, limit: 1 });
        const member = fetchedMembers.first();

        if (!member) {
            throw new Error(`User "${username}" not found.`);
        }

        return member as unknown as DiscordMember;
    }

    validateMembersNotInPrivateChannel(members: DiscordMember[]): string[] {
        const usersInPrivateChannels: string[] = [];

        members.forEach((member) => {
            const currentChannelName = member.voice.channel?.name;
            if (currentChannelName?.startsWith("v")) {
                usersInPrivateChannels.push(member.user.username);
            }
        });

        return usersInPrivateChannels;
    }
}
