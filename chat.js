const tmi = require('tmi.js');

let channels = [
    'ymedialabs',
    'rachelthescrub',
    'gridinius',
    'mythicsmt',
    'Gebrant',
    'Elzeha',
    'Kronusdark',
    'chum__fiesta',
];

// If debugging, add some other popular channels to test chat
if ( process.env.npm_config_debug ) {
    channels.push('Asmongold');
    channels.push('forsen');
    channels.push('Cohhcarnage');
}

const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    channels: channels
});

module.exports = client;