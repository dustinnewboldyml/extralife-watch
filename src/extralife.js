const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const log = require('./log');
const config = require('./settings');

const teamUrl = `https://www.extra-life.org/api/teams/${config.teamID}/donations`;

let prevDonations = [];

const check = () => {
	log('Attempting EL API Request', 2);
	return new Promise((resolve, reject) => {
		fetch(teamUrl)
			.then((res) => {
				log('EL API Response received', 2);
				if (!res.ok) {
					log(res, 3);
					return reject(
						`Unable to reach ExtraLife API. Team ID: ${config.teamID}`
					);
				}

				return res.json();
			})
			.then((donations) => {
				if (donations === undefined) return;

				log('EL API Response converted', 2);
				log(donations, 3);
				const response = {};

				// If there are new donations, add them to list
				const newDonations = [];
				if (
					JSON.stringify(donations) !== JSON.stringify(prevDonations)
				) {
					// Find which donations are new
					donations.map((donation) => {
						const match = prevDonations.filter(
							(prevDonation) =>
								prevDonation.donationID === donation.donationID
						);
						if (match.length === 0) {
							newDonations.push(donation);
						}
					});
				}
				response.donations = donations;
				response.new = newDonations;
				prevDonations = donations;

				// Set up some stats
				response.stats = {};
				response.stats.total = 0;
				response.stats.average = 0;
				response.stats.donators = 0;
				response.stats.donations = donations.length;

				const donators = [];
				donations.map((donation) => {
					response.stats.total += donation.amount;

					if (donators.indexOf(donation.donorID) <= 0) {
						donators.push(donation.donorID);
					}
				});
				response.stats.donators = donators.length;
				response.stats.average =
					Math.round(
						(response.stats.total / response.stats.donators) * 100
					) / 100;

				// Fix decimals
				response.stats.total = Number(response.stats.total).toFixed(2);
				response.stats.average = Number(response.stats.average).toFixed(
					2
				);

				resolve(response);
			});
	});
};

const write = (stat, file, overwrite, output) => {
	if (overwrite === undefined) overwrite = true;
	if (output === undefined) output = true;

	if (output || config.verbose === 3) {
		log(`Writing to file: ${file} – ${stat} – overwrite ${overwrite}`, 3);
	}

	if (overwrite) {
		fs.writeFile(path.join(__dirname, `../outputs/${file}.txt`), '' + stat, () => {});
	} else {
		fs.appendFile(path.join(__dirname, `../outputs/${file}.txt`), '\n' + stat, () => {});
	}
};

module.exports = {
	check: check,
	write: write,
};
