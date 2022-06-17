const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { chunk } = require('../tools/tools.js');
const Paginator = require('../tools/paginator.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows all the available commands')
        .addStringOption(option => option.setName('category').setDescription('Get commands that fall under a certain category.')
        .addChoices({name: 'General', value: 'general'}, {name: 'Dungeons & Dragons', value: 'dnd'}, {name: 'Fun', value: 'fun'})),
    group: "general",
    async execute(inter) {
        const bot = inter.client;
        const group = inter.options.getString('category');

        let commands = [];
        bot.commands.map(command => {
            if (!group) {
                commands.push(command);
            }

            if (command.group === group) {
                commands.push(command);
            } 

        });
        
        let chunked = chunk(commands, 6);
        
        let pages = [];
        
        let groups = {dnd: 'Dungeons & Dragons', fun: 'Fun', general: 'General'};

        for (let i = 0; i < chunked.length; i++) {
            let help = new MessageEmbed().setColor('PURPLE')
                .setAuthor({name: 'Help', iconURL: bot.user.avatarURL()})
                .setDescription(
                    'These are all the commands that Dungeon Master currently has, if you would like to suggest a command type it in <#947187348951674880>'
                );

                if (group) {
                    help.setDescription(`These are all the commands in the ${groups[group]} category.`);
                }

                help.setFooter({text: `Page ${i + 1} of ${chunked.length}`});
            for (let x = 0; x < chunked[i].length; x++) {
                help.addField(`/${chunked[i][x].data.name}`, chunked[i][x].data.description, false);
            }

            pages.push(help);
        }

        let paginator = new Paginator(inter, pages);
        paginator.paginate();
    }
}