const { readdirSync } = require("fs");

module.exports = client => {

	/**
	 * Client Events
     * FILE NAME MUST BE EXACT SPELLING OF EVENT NAME
	 */
	readdirSync("./events/").forEach(file => {
		const event = require(`../events/${file}`);
		let eventName = file.split(".")[0];
		client.logger.info(`Loading Client Event ${eventName}`);
		client.on(eventName, event.bind(null, client));
	});
}; 