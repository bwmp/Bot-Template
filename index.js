const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

//initialize bot client
const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'], 
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
    repliedUser: true
});
const config = require("./config/bot.json");

//create collections for later use
client.commands = new Collection();
client.buttons = new Collection();

//load handlers
for (const handler of fs.readdirSync("./handlers").filter(file => file.endsWith(".js"))) require(`./handlers/${handler}`)(client);

client.login(config.token);