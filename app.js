// Load rest of requirements now that config is verified
const el = require('./extralife');
const log = require('./log');
const settings = require('./settings');
const chat = require('./chat.js');
const { exit } = require('process');

if ( settings.alerts ) player = player(opts = {});

log('Running ExtraLife scripts!');
log(settings, 0);

const tick = () => {
	el.check()
		.then(donations => {
			log(donations, 0);

			// Update stats if needed
			if ( donations.new.length > 0 ) {
				const newDisplayName = donations.new[0].displayName || 'Anonymous';
				log('New donations! Updating files', 0);
				el.write(`\$${donations.stats.total}`, 'total-donated');
				el.write(donations.stats.donators, 'total-donators');
				el.write(donations.stats.donations, 'total-donations');
				el.write(`\$${donations.stats.average}`, 'average-donation');
				el.write(`\$${donations.new[0].amount}`, 'latest-amount');
				el.write(donations.new[0].message || '', 'latest-message');
				el.write(newDisplayName, 'latest-name');
				el.write(`${newDisplayName} – \$${donations.new[0].amount}`, 'latest-combined');

				donations.new.map(donation => {
					if ( donation.message ) {
						el.write(`#donation (${donation.displayName || 'Anonymous'}) ${donation.message}`, 'chat', false);
					}
				})

				if ( settings.alerts ) {
					// Use simple notification instead
					player.play('./assets/donation.mp3');
				}
			}
		})
		.catch(error => {
			console.error(error);
		});
}

setInterval(tick, settings.interval);
tick();

// handle chats
el.write('', 'chat'); // clear chat file
chat.connect();
chat.on('message', (channel, tags, message, self) => {
    el.write(`${channel} ${tags['display-name']}: ${message}`, 'chat', false);
});

setInterval(() => {
	const moment = require('moment');
	const startDate = moment('2020-11-07 09:00:00', 'YYYY-M-DD HH:mm:ss');
	const endDate = moment(new Date()); // now
	const diffSeconds = endDate.diff(startDate, 'seconds');

	let seconds = diffSeconds;

	// Set days and remove them from total seconds
	let days = Math.floor(seconds / 60 / 60 / 24);
	seconds = seconds - (days * 60 * 60 * 24);
	
	let hours = Math.floor(seconds / 60 / 60);
	seconds = seconds - (hours * 60 * 60);

	let minutes = Math.floor(seconds / 60);
	seconds = seconds - (minutes * 60);

	if ( hours < 10 ) hours = `0${hours}`;
	if ( minutes < 10 ) minutes = `0${minutes}`;
	if ( seconds < 10 ) seconds = `0${seconds}`;

	el.write(`${hours}:${minutes}:${seconds}`, 'clock');
}, 1000);
