module.exports = {
	name: "ping",
	category: "test",
	description: "Ping!",
	ephemeral: false,
	async execute(client, interaction, args) {
		interaction.editReply("Pong!");
	},
}; 