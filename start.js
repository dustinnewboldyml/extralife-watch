let player = require('play-sound');

const fs = require('fs');
const path = require('path');

// Verify config file exists
if ( ! fs.existsSync(path.join(__dirname, 'config.js')) ) {
	console.error('Config file missing. Did you forget to create it?');
} else {
	const app = require('./app');
}
