const { SlashCommandStringOption } = require('discord.js');
module.exports = async function(cmd){
    cmd.addStringOption(
        new SlashCommandStringOption()
        .setName("command")
        .setDescription("command to reload")
        .setRequired(true)
    )
}