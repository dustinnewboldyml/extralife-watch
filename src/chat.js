const client = require('./chat-client');
const config = require('./settings');
const log = require('./log');

const knownTwitchBots = require('./chat-known-bots');

const logColor = (colorNumber, output) => {
	if ( config.logColors ) {
		return `\x1b[${colorNumber}m${output}\x1b[0m`;
	}

	return output;
};

module.exports = (el) => {
	const channelStats = {};

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

			if ( channelIndex >= 0 && config.logColors ) {
				return `${chatColors[chatColor]}${channel}${chatColorClear}`;
			} else {
				return channel;
			}
		};

		client.on('connecting', (address, port) => {
			log(`Connecting to Twitch IRC @ ${address}:${port}`, 2);
		});
		client.on('connected', (address, port) => {
			log(`Connected to Twitch IRC @ ${address}:${port}`, 2);
		});
		client.on('disconnected', (reason) => {
			log(`Disconnected from Twitch IRC. ${logColor(31, reason)}`, 2);
		});
		client.on('join', (channel, username, self) => {
			if ( ! channelStats[channel] ) channelStats[channel] = { active: 0, bots: 0 };

			if (self) {
				channelStats[channel].bots++;
				log(`Joined channel: ${coloredChannel(channel)}`, 1);
			} else {
				const isKnownBot = knownTwitchBots.indexOf(username) >= 0;
				if ( isKnownBot ) {
					channelStats[channel].bots++;
					log(`${username} (Known Bot) joined ${coloredChannel(channel)} (${channelStats[channel].active} active, ${channelStats[channel].bots} bots)`, 2);
				} else if ( channel === `#${username}` ) {
					channelStats[channel].bots++;
					log(`${username} joined ${coloredChannel(channel)} (${channelStats[channel].active} active, ${channelStats[channel].bots} bots)`, 2);
				} else {
					channelStats[channel].active++;
					log(`${username} joined ${coloredChannel(channel)} (${channelStats[channel].active} active, ${channelStats[channel].bots} bots)`, 1);
				}
			}
		});
		client.on('part', (channel, username, self) => {
			if ( ! channelStats[channel] ) channelStats[channel] = { active: 0, bots: 0 };

			if (self) {
				channelStats[channel].bots--;
				log(`Left channel: ${coloredChannel(channel)}`, 1);
			} else {
				const isKnownBot = knownTwitchBots.indexOf(username) >= 0;
				if ( isKnownBot ) {
					channelStats[channel].bots--;
					log(`${username} (Known Bot) left ${coloredChannel(channel)} (${channelStats[channel].active} active, ${channelStats[channel].bots} bots)`, 2);
				} else if ( channel === `#${username}` ) {
					channelStats[channel].bots--;
					log(`${username} left ${coloredChannel(channel)} (${channelStats[channel].active} active, ${channelStats[channel].bots} bots)`, 2);
				} else {
					channelStats[channel].active--;
					log(`${username} left ${coloredChannel(channel)} (${channelStats[channel].active} active, ${channelStats[channel].bots} bots)`, 1);
				}
			}
		});
		client.on('cheer', (channel, _, message) => {
			log(`${coloredChannel(channel)} **CHEER**: ${message}`, 1);
		});
		client.on('notice', (channel, _, message) => {
			log(`Channel Notice ${coloredChannel(channel)}: ${message}`, 1);
		});
		client.on('hosting', (channel, target, viewers) => {
			log(`${coloredChannel(channel)} hosted ${coloredChannel(`#${target}`)} with ${viewers} viewers`, 1);
		});
		client.on('unhost', (channel, viewers) => {
			log(`${coloredChannel(channel)} stopped hosting with ${viewers} viewers`, 1);
		});
		client.on('subscription', (channel, username, methods, message, userstate) => {
			log(`${username} subscribed to ${coloredChannel(channel)}${message ? `: ${message}` : ''}`, 1);
		});
		client.on('message', (channel, tags, message, self) => {
			const output = `${coloredChannel(channel)} ${logColor(36, tags['display-name'])}: ${message}`;
			el.write(output, 'chat', false, false);
			log(output, 1);
		});
		client.on('raw_message', (messageCloned, message) => {
			log(messageCloned, 4);
		});
		client.connect();
	}
};
