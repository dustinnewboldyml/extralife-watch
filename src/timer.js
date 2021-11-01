const moment = require('moment');
const config = require('./settings');
const log = require('./log');

module.exports = (el) => {
	if (!config.timer.enabled) return;

	const startTime = moment(new Date());
	setInterval(() => {
		let elapsed;
		if (config.timer.zones.length === 0) {
			// If not using zones, simply display a timer for the
			// amount of time the app has been running
			const now = moment(new Date());
			const diffSeconds = now.diff(startTime, 'seconds');

			elapsed = convertSecondsToTime(diffSeconds);
		} else {
			const zonesPastSeconds = pastZoneSeconds(config.timer.zones);
			elapsed = convertSecondsToTime(zonesPastSeconds);
		}

		el.write(elapsed, 'timer', true, false);
	}, 1000);
};

const convertSecondsToTime = (seconds) => {
	// Set days and remove them from total seconds
	let days = Math.floor(seconds / 60 / 60 / 24);
	seconds = seconds - days * 60 * 60 * 24;

	let hours = Math.floor(seconds / 60 / 60);
	seconds = seconds - hours * 60 * 60;

	let minutes = Math.floor(seconds / 60);
	seconds = seconds - minutes * 60;

	if (hours < 10) hours = `0${hours}`;
	if (minutes < 10) minutes = `0${minutes}`;
	if (seconds < 10) seconds = `0${seconds}`;

	return `${hours}:${minutes}:${seconds}`;
};

const pastZoneSeconds = (zones) => {
	const today = moment(new Date());

	let pastSeconds = 0;
	zones.forEach((zone) => {
		if (zone.ignore) return;
		if (zone.seconds) {
			pastSeconds += zone.seconds;
			return;
		}

		const start = moment(zone.start);
		const end = moment(zone.end);
		const startEndDiff = end.diff(start);
		if (startEndDiff <= 0) {
			log(
				`\x1b[31mThe zone end date must come after zone start date. Ignoring this zone.\x1b[0m`
			);
			log(zone);
			zone.ignore = true;
			return;
		}

		if (today.diff(end) >= 0) {
			const zoneSeconds = end.diff(start, 'seconds');
			pastSeconds += zoneSeconds;
			zone.seconds = zoneSeconds;
		} else if (today.diff(start) >= 0) {
			pastSeconds += today.diff(start, 'seconds');
		}
	});

	return pastSeconds;
};
