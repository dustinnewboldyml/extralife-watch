const client = require('./chat-client');
const config = require('./settings');
const log = require('./log');

module.exports = (el) => {
	// handle chats
	el.write('', 'chat'); // clear chat file
	if (config.channels.length > 0) {
		const chatColors = [
			'\x1b[31m', // red
			'\x1b[32m', // green
			'\x1b[33m', // yellow
			'\x1b[34m', // blue
			'\x1b[35m', // magenta
			'\x1b[91m', // bright red
			'\x1b[92m', // bright green
			'\x1b[93m', // bright yellow
			'\x1b[94m', // bright blue
			'\x1b[95m', // bright magenta
			'\x1b[96m', // bright cyan
		];
		const chatColorClear = '\x1b[0m';

		const coloredChannel = (channel) => {
			const channelIndex = config.channels.indexOf(channel);
			const chatColor = channelIndex % chatColors.length;
			return `${chatColors[chatColor]}${channel}${chatColorClear}`;
		};

		client.on('connecting', (address, port) => {
			log(`Connecting to Twitch IRC @ ${address}:${port}`, 2);
		});
		client.on('connected', (address, port) => {
			log(`Connected to Twitch IRC @ ${address}:${port}`, 2);
		});
		client.on('disconnected', (reason) => {
			log(`Disconnected from Twitch IRC. \x1b[31m${reason}\x1b[0m`, 2);
		});
		client.on('join', (channel, _, self) => {
			if (self) {
				log(`Joined channel: ${coloredChannel(channel)}`, 1);
			}
		});
		client.on('cheer', (channel, _, message) => {
			log(`${coloredChannel(channel)} **CHEER**: ${message}`, 1);
		});
		client.on('notice', (channel, _, message) => {
			log(`Channel Notice ${coloredChannel(channel)}: ${message}`, 1);
		});
		client.on('message', (channel, tags, message, self) => {
			const output = `${coloredChannel(channel)} \x1b[36m${tags['display-name']}\x1b[0m: ${message}`;
			el.write(output, 'chat', false, false);
			log(output, 1);
		});
		client.connect();
	}
};
