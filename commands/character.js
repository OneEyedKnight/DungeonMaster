const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const races = require('./races.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("character")
        .addSubcommand(subcommand => 
            subcommand
                .setName('create')
                .setDescription('Starts the character creation process')
        )
        .setDescription('Commands related to the characters'),
    group: "dnd",
    async execute(inter) {
        const subcommand = inter.options.getSubcommand();
        const channel = inter.channel;

        if (subcommand === "create") {
            await inter.reply("What is the name of your character? Type it below.");

        
            let filter = m => m.author.id === inter.member.id && inter.channel.id === m.channel.id;
            let collector = channel.createMessageCollector({filter, time: 15000, max: 1});

            //let races = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 'Half-Orc', 'Human', 'Tiefling'];
            const menu = new MessageSelectMenu()
                        .setCustomId('races')
                        .setPlaceholder('Choose a race, press ✔ to select.')
                        .addOptions([
                            {
                                label: 'Dragonborn',
                                description: 'Born of Dragon',
                                value: 'Dragonborn',
                            },
                            {
                                label: 'Dwarf',
                                description: 'Jack of All Trades',
                                value: 'Dwarf'
                            }
                        ]);
            
            const row = new MessageActionRow().addComponents(menu);
            
            collector.on('collect', async m => {
                let text = `So your character is named **${m.content}**? What race are they? You can choose from the menu and see information about them`;
                let msg = await m.reply({content: text, components: [row]});

                let select = msg.createMessageComponentCollector({componentType: 'SELECT_MENU'});
                
                select.on('collect', async s => {
                    if (s.user.id === inter.member.id && s.customId === 'races') {
                        await s.update({content: text, embeds: [races[s.values[0]]]});
                    }
                });
            
            });
        }
    }
}