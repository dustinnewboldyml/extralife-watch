const fs = require('fs');
const fetch = require('node-fetch');
const log = require('./log');

const teamID = 52474;
const teamUrl = `https://www.extra-life.org/api/teams/${teamID}/donations`;

let prevDonations = [];

const check = () => {
	log('Checking', 0);
	return new Promise(resolve => {
		fetch(teamUrl)
			.then(res => {
				log('Response received', 0);
				if ( ! res.ok ) {
					throw new Error('Unable to reach ExtraLife API');
				}

				return res.json();
			})
			.then(donations => {
				log('Response converted', 0);
				const response = {};

				// If a fresh array, set it
				if ( prevDonations.length === 0 ) {
					// prevDonations = donations;
				}

				// If there are new donations, add them to list
				const newDonations = [];
				if ( JSON.stringify(donations) !== JSON.stringify(prevDonations) ) {
					// Find which donations are new
					donations.map(donation => {
						const match = prevDonations.filter(prevDonation => prevDonation.donationID === donation.donationID);
						if ( match.length === 0 ) {
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
				donations.map(donation => {
					response.stats.total += donation.amount;

					if ( donators.indexOf(donation.donorID) <= 0 ) {
						donators.push(donation.donorID);
					}
				});
				response.stats.donators = donators.length;
				response.stats.average = Math.round((response.stats.total / response.stats.donators) * 100) / 100;

				resolve(response);
			})
	});
}

const write = (stat, file, overwrite) => {
	if ( overwrite === undefined ) overwrite = true;

	log(`Writing to file: ${file} – ${stat} – overwrite ${overwrite}`, 0);

	if ( overwrite ) {
		fs.writeFile(`./outputs/${file}.txt`, '' + stat, () => {});
	} else {
		fs.appendFile(`./outputs/${file}.txt`, '\n' + stat, () => {});
	}
}

module.exports = {
	check: check,
	write: write
}
