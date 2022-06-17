const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Checks if the bot is online.'),
    group: "general",
    async execute(inter) {
        await inter.reply('https://tenor.com/view/hello-there-hi-there-greetings-gif-9442662');
    }
}