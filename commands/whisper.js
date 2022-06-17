const { SlashCommandBuilder } = require('@discordjs/builders');
const { dm } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whisper')
        .setDescription('Allows the Dungeon Master to whisper something to somebody.')
        .addUserOption(option => option.setName('target').setDescription('The person the DM is whispering to.')),
    group: "dnd",
    async execute(inter) {
        if (inter.member.id != dm) return await inter.reply({content: "Only the dungeon master can use this command.", ephemeral: true});

        const user = inter.options.getMember('target');
        
        const tavern = "984198043630960681";
        const whispers = "984198247264448532";

        if (!user) {
            inter.member.voice.channel.members.map(m => {
                m.voice.setChannel(tavern);
            });
            await inter.reply({content: "Moved you back to the tavern channel", ephemeral: true});
        } else {
            inter.member.voice.setChannel(whispers);
            user.voice.setChannel(whispers);
            await inter.reply({content: "Moved you to the whispers channel.", ephemeral: true});
        }
    }
}