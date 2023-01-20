module.exports = {
	name: "reload",
	category: "owner",
	description: "Reloads a command",
    owner: true,
	ephemeral: false,
	options: require("../options/reload.js"),
	execute(client, interaction, args) {

		const commandName = args.getString("command").toLowerCase();
		const command = interaction.client.commands.get(commandName)
            || interaction.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return interaction.editReply(`There is no command with name or alias \`${commandName}\`, ${interaction.member.user}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			interaction.client.commands.set(newCommand.name, newCommand);
			interaction.editReply(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			client.logger.error(error);
			interaction.editReply(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};