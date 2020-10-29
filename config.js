const interval = 10 * 1000; // 10 seconds
const noSounds = process.env.npm_config_nosound || false;

module.exports = {
    interval,
    noSounds
};
