const fs = require('node:fs');
const path = require('node:path');
const { createAudioPlayer, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const { Client, Intents, Collection } = require('discord.js');
const config = require('./config.json');

const bot = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, 
	Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES]});

bot.commands = new Collection();
bot.player = createAudioPlayer();
bot.playerLoop = true;

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	bot.commands.set(command.data.name, command);
}

bot.once('ready', () => {
	console.log('Let the adventure begin.');
});

bot.on('interactionCreate', async inter => {
	if (!inter.isCommand()) return;

	const command = bot.commands.get(inter.commandName);

	if (!command) return;

	try {
		await command.execute(inter);
	} catch (error) {
		console.error(error);
		await inter.reply({ content: `Error encountered: \`\`\`js\n${error}\`\`\``, ephemeral: true });
	}
});

/*
bot.on('voiceStateUpdate', (oldState, newState) => {
	if (oldState.channelId !== oldState.guild.me.voice.channelId) return;
	
	if (newState.channel.members.size === 1) {
		const connection = getVoiceConnection(newState.guild.id);
		connection.destroy();
	}
});
*/

bot.player.on('error', error => {
	console.log(`Error: ${error.message}`);
});

bot.login(config.token);