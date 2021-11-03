// Load rest of requirements now that config is verified
let player = require('play-sound');
const path = require('path');
const el = require('./extralife');
const log = require('./log');
const config = require('./settings');
const notifier = require('node-notifier');


if (config.alerts.sound.enabled) player = player((opts = {}));

let firstRun = true;
log('Running ExtraLife scripts!');
log(config, 3);

const tick = () => {
	el.check()
		.then((donations) => {
			log(donations, 3);

			// Update stats if needed
			if (donations.new.length > 0) {
				const newDisplayName =
					donations.new[0].displayName || 'Anonymous';
				log('New donations! Updating files', 2);
				el.write(`\$${donations.stats.total}`, 'total-donated');
				el.write(donations.stats.donators, 'total-donators');
				el.write(donations.stats.donations, 'total-donations');
				el.write(`\$${donations.stats.average}`, 'average-donation');
				el.write(`\$${donations.new[0].amount}`, 'latest-amount');
				el.write(donations.new[0].message || '', 'latest-message');
				el.write(newDisplayName, 'latest-name');
				el.write(
					`${newDisplayName} – \$${donations.new[0].amount}`,
					'latest-combined'
				);

				if ( firstRun ) {
					firstRun = false;
					log(`Total Donated: \$${donations.stats.total}`);
					log(`Average Donations: \$${donations.stats.average}`);
					log(`Total Donators: ${donations.stats.donators}`);
					log(`Total Donations: ${donations.stats.donations}`);
                    setTimeout(tick, config.interval * 1000);
					return;
				}

				donations.new.map((donation) => {
					const name = donation.displayName || 'Anonymous';
					const amount = donation.amount;
					const message = donation.message || '';

					el.write(
						`#donation (${name}) ${message}`,
						'chat',
						false
					);

					notifier.notify(
						{
							title: `ExtraLife Donation – \$${amount}`,
							message: `${name} ➤ ${donation.recipientName}\n\$${amount}\n${message}`,
							icon: path.join(__dirname, 'assets/coin.png'),
						}
					);

					// Output the final message into chat
					log(
						`
\x1b[33m        ██████████\x1b[0m
\x1b[33m    ██████      ██████\x1b[0m
\x1b[33m  ████    ░░░░░░░░░░████\x1b[0m       \x1b[36m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m
\x1b[33m  ██  ░░░░  ░░░░██░░░░██\x1b[0m              \x1b[36mNEW DONATION\x1b[0m
\x1b[33m████  ░░░░  ░░░░██░░░░████\x1b[0m     \x1b[36m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m
\x1b[33m██  ░░░░░░  ░░░░██░░░░░░██\x1b[0m
\x1b[33m██  ░░░░░░  ░░░░██░░░░░░██\x1b[0m     \$${amount}
\x1b[33m██  ░░░░░░  ░░░░██░░░░░░██\x1b[0m     ${name} ➤ ${donation.recipientName}
\x1b[33m██  ░░░░░░  ░░░░██░░░░░░██\x1b[0m     ${message}
\x1b[33m██  ░░░░░░  ░░░░██░░░░░░██\x1b[0m
\x1b[33m██  ░░░░░░  ░░░░██░░░░░░██\x1b[0m
\x1b[33m████  ░░░░  ░░░░██░░░░████\x1b[0m     Total: \$${donations.stats.total}
\x1b[33m  ██  ░░░░████████░░░░██\x1b[0m       Average: \$${donations.stats.average}
\x1b[33m  ████  ░░░░░░░░░░░░███\x1b[0m        Total Donations: ${donations.stats.donations}
\x1b[33m    ██████░░░░░░█████\x1b[0m
\x1b[33m        ██████████\x1b[0m`,
						1
					);
				});

				if (config.alerts.sound.enabled) {
					log(`Playing sound: ${config.alerts.sound.path}`, 2);
					player.play(config.alerts.sound.path);
				}
			}

			setTimeout(tick, config.interval * 1000);
		})
		.catch((error) => {
			log(`\x1b[31m${error}\x1b[0m \x1b[33m– Will retry in ${config.retry} seconds\x1b[0m`);
			setTimeout(tick, config.retry * 1000);
		});
};
tick();

require('./chat')(el);
require('./timer')(el);
