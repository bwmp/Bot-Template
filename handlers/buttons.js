const fs = require("fs");
module.exports = client => {
    
	function getDirectories() {
		return fs.readdirSync("./buttons").filter(function subFolder(file) {
			return fs.statSync("./buttons/" + file).isDirectory();
		});
	}

	let commandFiles = fs.readdirSync("./buttons").filter(file => file.endsWith(".js"));

	for (const folder of getDirectories()) {
		const folderFiles = fs.readdirSync("./buttons/" + folder).filter(file => file.endsWith(".js"));
		for (const file of folderFiles) {
			commandFiles.push([folder, file]);
		}
	}

	for (const file of commandFiles) {
		let button;
		button = Array.isArray(file) ? require(`../buttons/${file[0]}/${file[1]}`) : require(`../buttons/${file}`);
		client.buttons.set(button.name, button);
	}
    
	client.logger.info("Buttons Loaded");
}; 