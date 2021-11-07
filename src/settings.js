/**
 * This file contains all the default configuration. Any setting here
 * can be overridden. Do NOT set configuration via this file. Please
 * set all configuration through config.js file
 */

const merge = require('lodash.merge');
const config = require('../config/config');
const defaults = {
	/**
	 * Setting your extralife team ID
	 * Setting this allows the application to pull in donation information,
	 * including the latest donations, who donated, etc.
	 *
	 * To get your team ID, visit your team page on ExtraLife's website. You
	 * will see your team ID in the URL of the team page. Example URL looks like:
	 * https://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=12345
	 *
	 * In the above example, the team ID is 12345.
	 */
	teamID: null,

	/**
	 * Setting your twitch channels
	 * Setting this allows the application to monitor all the listed twitch channels
	 * and put the contents in them into a text file, allowing you to aggregate
	 * all participating channels into a single chat. Below is set to a few popular
	 * channels for example usage.
	 */
	channels: [],

	/**
	 * Setting this will enable audible alerts any time there is a new donation
	 *
	 * Notifications – Enables whether or not a OS-level notification will appear when
	 * a donation occurs (default: false)
	 *
	 * Sound – Object that controls if a sound is played when a donation comes in
	 *  | Enabled – Whether or not to play a sound (default: false)
	 *  | Path – The path to the mp3 of the sound to play. By default, this is a relative
	 *           path to the project. If you begin with / (Mac) or a C: (Windows), this
	 *           will use absolute paths instead.
	 */
	alerts: {
		notifications: true,
		sound: {
			enabled: false,
			path: 'assets/sounds/donation.mp3',
		},
	},

	/**
	 * How often do you wish the Extra Life API for donation updates in seconds.
	 * Default is 10 seconds
	 */
	interval: 10,

	/**
	 * Should an error occur when trying to reach ExtraLife API, how soon should the
	 * application re-attempt. (in seconds)
	 */
	retry: 60,

	/**
	 * Verbose is the amount of information that is logged into the console as the
	 * application is running. There are three different settings here.
	 *
	 * 0 = Minimal output
	 * 1 = Useful information (chat, donations, etc.) (Default)
	 * 2 = Verbose logging, including connection information.
	 * 3 = Debug information, including API responses
	 * 4 = Increased debugging, including raw message objects from chat
	 */
	verbose: 1,

	/**
	 * Enables or disables the use of colors in the console
	 */
	logColors: true,

	/**
	 * Sets whether or not the timestamps are output for every system output.
	 * Timestamps show up as at the beginning of each system output. If the value
	 * is set to false, it won't display any timestamp. If the value is true, the
	 * default format is used (h:mm:ss A). You can also specify a format to use as
	 * a string format. Refer to this page for format definitions:
	 * https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/
	 */
	 timestamp: true,

	/**
	 * Enables the timer
	 */
	timer: {
		enabled: true,
		/**
		 * Zones are a way for the timer to run in sections. This is useful for
		 * setting up your stream time in advance. This can also support multiple
		 * zones, so that you can split up your streaming days into smaller chunks.
		 *
		 * Example:
		 * 		zones: [
		 * 				{
		 * 					start: new Date('2021-11-06 12:00:00'),
		 * 					end:   new Date('2021-11-07 00:00:00')
		 * 				},
		 * 				{
		 * 					start: new Date('2021-11-07 12:00:00'),
		 * 					end:   new Date('2021-11-08 00:00:00')
		 * 				}
		 * 		]
		 *
		 * In the above example, the timer will run from noon on November 6th, 2021
		 * until midnight on November 7th and then stop. It will pick up again on
		 * November 7th at noon and then stop again at midnight.
		 *
		 * If you leave this as an empty array or don't include it, the timer will
		 * run during the duration of you running the application in the background.
		 */
		zones: [],
	},
};

module.exports = merge(defaults, config);
