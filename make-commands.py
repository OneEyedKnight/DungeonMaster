code = """
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('%s')
        .setDescription('Plays %s themed music for campaigns, default command plays ambient music.')
        .addStringOption(sub => sub.setName('theme').setDescription('Plays other themes.')
                        .addChoices({name: 'battle', value: 'battle'}, {name: 'night', value: 'night'})
        ),
    async execute(inter) {
        const player = inter.client.player;
        const theme = inter.options.getString('theme');
        
        const con = joinVoiceChannel({
            channelId: inter.member.voice.channel.id,
            guildId: inter.guild.id,
            adapterCreator: inter.guild.voiceAdapterCreator
        });
        
        con.subscribe(player);
        
        let url;
        if (!theme) {
            url = "%s";
            await inter.reply(`Playing %s ambience in **${inter.member.voice.channel.name}**.` %s);
        } else if (theme == 'battle') {
            url = "%s";
            await inter.reply(`Playing %s battle in **${inter.member.voice.channel.name}**.` %s);
        } else {
            url = "%s";
            await inter.reply(`Playing %s night ambience in **${inter.member.voice.channel.name}** %s`); 
        }
        
        let stream = ytdl(url, { filter: 'audioonly' });
        let resource = createAudioResource(stream);
        player.play(resource);

        player.on(AudioPlayerStatus.Idle, () => {
            let stream = ytdl(url, { filter: 'audioonly' });
            let resource = createAudioResource(stream);
            player.play(resource);
        });
    }
} 
"""
themes = {
    "forest": ["https://www.youtube.com/watch?v=43S0PzM_y0o","https://www.youtube.com/watch?v=ZcNyPdipjeU", "https://www.youtube.com/watch?v=hiEt4Oj-AIw", ":evergreen_tree:"],
    "jungle": ["https://www.youtube.com/watch?v=zQtfnPTlFFE", "https://www.youtube.com/watch?v=zQtfnPTlFFE", "", ":snake:"],
    "underdark": ["https://www.youtube.com/watch?v=NMUoicf5kYw&t=2829s", "https://youtube.com/watch?v=QV2uFgIrklk", "delete this", ":spider:"],
    "feywild": ["https://www.youtube.com/watch?v=LwGyIIZQ_PM", "https://www.youtube.com/watch?v=7bfku8OlIlU", "https://www.youtube.com/watch?v=XxEhuSJF780", ":woman_fairy:"],
    "lowerplanes": ["https://www.youtube.com/watch?v=JzVIkY5tKcE", "https://www.youtube.com/watch?v=eYxB527-lF4", "delete this", ":fire:"],
    "uppperplanes": ["https://www.youtube.com/watch?v=RG1ydqEEa0c", "https://www.youtube.com/watch?v=MuJTjKwuZb4", "delete this", ":dizzy:"],
    "underwater": ["https://youtube.com/watch?v=PrSXb44xu0s", "https://www.youtube.com/watch?v=e9mfzLW7N6o", "https://youtu.be/OVct34NUk3U", ":mermaid:"]
}

for theme, urls in themes.items():
    with open(f'commands/{theme}.js', 'w') as f:
        f.write(code % (theme, theme, urls[0], theme, urls[3], urls[1], theme, urls[3], urls[2], theme, urls[3]))
