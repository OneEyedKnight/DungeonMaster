const { SlashCommandBuilder } = require('@discordjs/builders');
const { developer } = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quit')
        .setDescription('Makes the bot shutdown'),
    async execute(inter) {
        if (!inter.member.id === developer) return await inter.reply({content: "You cannot use this command!", ephemeral: true});

        await inter.reply({content: "Bot has been shutdown", ephemeral: true});
        await inter.client.destroy();
    }
}