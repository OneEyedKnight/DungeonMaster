const { SlashCommandBuilder } = require('@discordjs/builders');
const { PlayerSubscription, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leaves the current voice channel'),
    group: "general",
    async execute(inter) {
        const vc = inter.member.voice.channel;
        if (vc) {
            const connection = getVoiceConnection(vc.guild.id);
            connection.destroy();
            await inter.reply(`I left ${vc.name}.`);
        } else {
            await inter.reply('I am not currently in a voice channel');
        }
    }
}