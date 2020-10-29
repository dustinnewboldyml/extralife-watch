const interval = 10 * 1000; // 10 seconds
const alerts = process.env.npm_config_alerts || false;

module.exports = {
    interval,
    alerts
};
