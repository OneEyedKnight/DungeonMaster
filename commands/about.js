const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Shows information about this bot.'),
    async execute(inter) {
        const bot = inter.client;

        let total = (bot.uptime / 1000);
		let days = Math.floor(total / 86400);
		total %= 86400;

		let hours = Math.floor(total / 3600);
		total %= 3600;

		let minutes = Math.floor(total / 60);
		let seconds = Math.floor(total % 60);

		let uptime = `${days}d, ${hours}h, ${minutes}m, and ${seconds}s`;

        const about = new MessageEmbed().setColor('PURPLE')
            .setAuthor({name: 'About Dungeon Master', iconURL: bot.user.avatarURL()})
            .setDescription('This bot was created for the University of Windsor Board Games Club. It was made to port some board games into Discord, while also having more fun commands.')
            .addField('Made by', '<@!507490400534265856> & <@!411368645524979742>', true)
            .addField('Library', 'discord.js', true)
            .addField('Uptime', uptime, true)
            .addField('Recent Changes', 'To be added');
        await inter.reply({embeds: [about]});
    }
}