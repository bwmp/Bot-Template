const { SlashCommandBuilder } = require('discord.js');
const config = require("../config/bot.json")
module.exports = async client => {

    let cmds = []
    for (let command of client.commands) {
        command = command[1];
        const cmd = new SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
        if(command.options) command.options(cmd);
        cmds.push(cmd.toJSON())
    }
    await client.guilds.cache.get(config.guildId)?.commands.set(cmds);

    client.logger.info(`Logged in as ${client.user.tag}!`);

}