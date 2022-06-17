const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the bot from playing music in the voice channel'),
    group: "general",
    async execute(inter) {
        const player = inter.client.player;

        if (player) {
            player.stop();
            inter.client.playerLoop = false;
            await inter.reply('I stopped playing music.');
        } else {
            await inter.reply('There is nothing playing');
        }
    }
}