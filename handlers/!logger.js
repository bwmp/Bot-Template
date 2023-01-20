const winston = require("winston");
function minTwoDigits(n) {return (n < 10 ? "0" : "") + n}
const rn = new Date();
const date = `${minTwoDigits(rn.getMonth() + 1)}-${minTwoDigits(rn.getDate())}-${rn.getFullYear()}/${minTwoDigits(rn.getHours())}`;

module.exports = client => {
    
	client.logger = winston.createLogger({
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.printf(log => `[${log.timestamp.split("T")[1].split(".")[0]} ${log.level}]: ${log.message}`),
		),
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({ filename: `./logs/${date}.log` }),
		],
		rejectionHandlers: [
			new winston.transports.Console(),
			new winston.transports.File({ filename: `logs/${date}.log` }),
		],
	});

	client.logger.info("Logger started!");
	client.on('disconnect', () => client.logger.info('Bot is disconnecting...'));
	client.on('reconnecting', () => client.logger.info('Bot reconnecting...'));
	client.on('warn', error => client.logger.warn(error));
	client.on('error', error => client.logger.error(error));
}; 