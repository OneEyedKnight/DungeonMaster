const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

class Paginator {
    constructor(inter, pages) {
        this.inter = inter;
        this.pages = pages;
        this.current = -1;
    }

    info() {
        const info = new MessageEmbed().setColor('PURPLE')
            .setAuthor({name: 'Paginator Help', iconURL: this.inter.client.user.avatarURL()})
            .setDescription('This a paginator, press the buttons to turn the page. This is useful for displaying lots of content without visually cluttering the screen.')
            .addField('Next Page →', 'This will take you to the next page. If you are on last page it will go back to the first one.', false)
            .addField('Previous Page ←', 'This will take you to the previous page. If you are on the first page it will go to the last one.', false)
            .addField('Last Page | End', 'This will take you to the last page.', false)
            .addField('First Page | Start', 'This will take you to the first page.', false)
            .setFooter({text: "Preface"});

        return info;
    }

    buttons() {
        const buttons = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('back').setLabel('←').setStyle('PRIMARY'),
                new MessageButton().setCustomId('next').setLabel('→').setStyle('PRIMARY'),
                new MessageButton().setCustomId('start').setLabel('Start').setStyle('SECONDARY'),
                new MessageButton().setCustomId('end').setLabel('End').setStyle('SECONDARY'),
                new MessageButton().setCustomId('exit').setLabel('Exit').setStyle('DANGER')
            );
        
        return buttons;
    }

    async paginate() {
        const filter = i => i.user.id === this.inter.member.id && this.inter.isButton();

        const collector = this.inter.channel.createMessageComponentCollector(filter, {componentType: 'BUTTONS', time: 150});

        if (this.pages.length === 1) {
            return await this.inter.reply({embeds: this.pages});
        }

        await this.inter.reply({embeds: [this.info()], components: [this.buttons()]});

        let buttons = ['back', 'next', 'start', 'end', 'exit'];

        collector.on('collect', async i => {
            if (buttons.includes(i.customId)) {
                switch (i.customId) {
                    case 'next': await i.update({embeds: [this.pages[this.current !== (this.pages.length - 1) ? ++this.current: this.current = 0]]}); break;
                    case 'back': await i.update({embeds: [this.pages[this.current !== 0 ? --this.current: this.current = this.pages.length - 1]]}); break;
                    case 'start': await i.update({embeds: [this.pages[0]]}); break;
                    case 'end': await i.update({embeds: [this.pages[this.pages.length - 1]]}); break;
                    case 'exit': await i.message.delete();
                }
            }
        });
    }
}

module.exports = Paginator;