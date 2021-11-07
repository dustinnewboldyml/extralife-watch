// Load rest of requirements now that config is verified
let player;
const path = require('path');
const el = require('./extralife');
const log = require('./log');
const config = require('./settings');
const notifier = require('node-notifier');

if (config.alerts.sound.enabled) player = require('play-sound')((opts = {}));

let firstRun = true;
log('Running ExtraLife scripts!');
log(config, 3);

const logColor = (colorNumber, output) => {
	if (config.logColors) {
		return `\x1b[${colorNumber}m${output}\x1b[0m`;
	}

	return output;
};

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

				if (firstRun) {
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

					el.write(`#donation (${name}) ${message}`, 'chat', false);

					if (config.alerts.notifications) {
						notifier.notify({
							title: `ExtraLife Donation – \$${amount}`,
							message: `${name} ➤ ${donation.recipientName}\n\$${amount}\n${message}`,
							icon: path.join(__dirname, 'assets/coin.png'),
						});
					}

					// Output the final message into chat
					log(
						`
${logColor(33, `        ██████████`)}
${logColor(33, `    ██████      ██████`)}
${logColor(33, `  ████    ░░░░░░░░░░████`)}       ${logColor(
							36,
							`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
						)}
${logColor(33, `  ██  ░░░░  ░░░░██░░░░██`)}              ${logColor(
							36,
							`NEW DONATION`
						)}
${logColor(33, `████  ░░░░  ░░░░██░░░░████`)}     ${logColor(
							36,
							`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
						)}
${logColor(33, `██  ░░░░░░  ░░░░██░░░░░░██`)}
${logColor(33, `██  ░░░░░░  ░░░░██░░░░░░██`)}     \$${amount}
${logColor(33, `██  ░░░░░░  ░░░░██░░░░░░██`)}     ${name} ➤ ${
							donation.recipientName
						}
${logColor(33, `██  ░░░░░░  ░░░░██░░░░░░██`)}     ${message}
${logColor(33, `██  ░░░░░░  ░░░░██░░░░░░██`)}
${logColor(33, `██  ░░░░░░  ░░░░██░░░░░░██`)}
${logColor(33, `████  ░░░░  ░░░░██░░░░████`)}     Total: \$${
							donations.stats.total
						}
${logColor(33, `  ██  ░░░░████████░░░░██`)}       Average: \$${
							donations.stats.average
						}
${logColor(33, `  ████  ░░░░░░░░░░░░███`)}        Total Donations: ${
							donations.stats.donations
						}
${logColor(33, `    ██████░░░░░░█████`)}
${logColor(33, `        ██████████`)}`,
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
			log(
				`${logColor(31, error)} ${logColor(
					33,
					`– Will retry in ${config.retry} seconds`
				)}`
			);
			setTimeout(tick, config.retry * 1000);
		});
};
tick();

require('./chat')(el);
require('./timer')(el);
