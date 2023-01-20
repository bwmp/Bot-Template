const config = require("../config/bot.json");
module.exports = async (client, interaction) => {

    if(interaction.isCommand()){
        const command = client.commands.get(interaction.commandName);
        const args = interaction.options;
        await interaction.deferReply({ephemeral: command.ephemeral})
        if(command.owner && interaction.member.id != config.ownerId){
            return interaction.editReply({content: "This command can only be used by the bot creator"})
        }
        try {
            await command.execute(client, interaction, args);
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }

	if(interaction.isButton() && !interaction.isSelectMenu()){
		//get button code and try to execute it
		const button = client.buttons.get(interaction.customId);
	    try {
		    button.execute(client, interaction);
	    } catch (error) {
		    client.logger.error(error);
            await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
	    }
	}

};