const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { desert } = require('../themes.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('desert')
        .setDescription('Plays desert themed music for campaigns, default command plays ambient music.')
        .addStringOption(sub => sub.setName('theme').setDescription('Plays other themes.')
                        .addChoices({name: 'battle', value: 'battle'}, {name: 'night ambience', value: 'night'})
        ),
    group: "dnd",
    async execute(inter) {
        if (!inter.member.voice.channelId) { return await inter.reply({content: 'You need to be in a voice channel', ephemeral: true}); }
        
        const player = inter.client.player;
        const theme = inter.options.getString('theme') || 'ambience';     

        const con = joinVoiceChannel({
            channelId: inter.member.voice.channel.id,
            guildId: inter.guild.id,
            adapterCreator: inter.guild.voiceAdapterCreator
        });
        
        con.subscribe(player);

        let stream = ytdl(desert[theme], { filter: 'audioonly' });
        let resource = createAudioResource(stream);
        await inter.reply(`Playing desert ${theme} in **${inter.member.voice.channel.name}** :desert:`);

        inter.client.playerLoop = true;
        player.play(resource);

        player.on(AudioPlayerStatus.Idle, () => {
            if (inter.client.playerLoop) {
                let stream = ytdl(desert[theme], { filter: 'audioonly' });
                let resource = createAudioResource(stream);
                player.play(resource);
            }
        });
    }
} 