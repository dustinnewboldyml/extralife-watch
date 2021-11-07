const config = require('./settings');
const moment = require('moment');

const verbose = config.verbose ? config.verbose : 0;

module.exports = (text, level) => {
	if ( config.timestamp === false ) return console.log(text);
	if (level === undefined) level = 0;

	const defaultFormat = 'h:mm:ss A';
	let timestampFormat;
	if ( typeof config.timestamp === 'string' ) {
		timestampFormat = config.timestamp;
	} else {
		timestampFormat = defaultFormat;
	}
	const date = moment().format(timestampFormat);

	if (level <= verbose) {
		if ( config.logColors ) {
			console.log(`\x1b[36m[${date}]\x1b[0m`, text);
		} else {
			console.log(`[${date}]`, text);
		}
	}
};