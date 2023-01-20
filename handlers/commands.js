const fs = require("fs");
module.exports = client => {
    
	function getDirectories() {
		return fs.readdirSync("./commands").filter(function subFolder(file) {
			return fs.statSync("./commands/" + file).isDirectory();
		});
	}

	let commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

	for (const folder of getDirectories()) {
		const folderFiles = fs.readdirSync("./commands/" + folder).filter(file => file.endsWith(".js"));
		for (const file of folderFiles) {
			commandFiles.push([folder, file]);
		}
	}

	for (const file of commandFiles) {
		let command;
		command = Array.isArray(file) ? require(`../commands/${file[0]}/${file[1]}`) : require(`../commands/${file}`);
		client.commands.set(command.name, command);
	}

	client.logger.info("Commands Loaded");
}; 