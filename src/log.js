const config = require('./settings');
const moment = require('moment');

const verbose = config.verbose ? config.verbose : 0;

module.exports = (text, level) => {
	if (level === undefined) level = 0;
	const date = moment().format('h:mm:ss A');

	if (level <= verbose) {
		console.log(`\x1b[36m[${date}]\x1b[0m`, text);
	}
};
