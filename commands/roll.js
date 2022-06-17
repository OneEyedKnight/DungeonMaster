const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a dice, default max is 20, you can add modifier to your roll.')
        .addNumberOption(option => option.setName('max').setDescription('Sets the max number, default is 20.'))
        .addNumberOption(option => option.setName('modifier').setDescription('Adds + n to your roll.')),
    group: "dnd",
    async execute(inter) {
        const max = inter.options.getNumber('max') || 20;
        const mod = inter.options.getNumber('modifier') || 0;
        
        let random = Math.floor(Math.random() * (max - 1)) + 1;

        await inter.reply(`You rolled ${random} + ${mod} = **${random + mod}** :game_die:.`);
    }
}
