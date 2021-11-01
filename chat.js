const tmi = require('tmi.js');
const config = require('./config');

const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    channels: config.channels
});

module.exports = client;