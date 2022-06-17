const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rickroll')
        .setDescription('Plays Never Gonna Give You Up by Rick Astley in the voice channel.'),
    group: "fun",
    async execute(inter) {
        const player = inter.client.player;

        if (!inter.member.voice.channelId) { return await inter.reply({content: 'You need to be in a voice channel', ephemeral: true}); }
        
        const con = joinVoiceChannel({
            channelId: inter.member.voice.channel.id,
            guildId: inter.guild.id,
            adapterCreator: inter.guild.voiceAdapterCreator
        });
        
        con.subscribe(player);
        let url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        let stream = ytdl(url, { filter: 'audioonly' });
        let resource = createAudioResource(stream);
        await inter.reply({content: `Playing Never Gonna Give You Up in **${inter.member.voice.channel.name}**. :microphone:`, ephemeral: true});
        inter.client.playerLoop = false;
        player.play(resource);
    }
}