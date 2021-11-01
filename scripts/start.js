const fs = require('fs');
const path = require('path');

// Verify config file exists
if (!fs.existsSync(path.join(__dirname, '../config/config.js'))) {
	console.error('Config file missing. Did you forget to create it?');
} else {
	require('../src/app');
}
