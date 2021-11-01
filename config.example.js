/**
 * This is an example template of the configuration required to
 * get these scripts to look the correct places. Below you will
 * set your team ID for extra life as well as twitch channels.
 */
module.exports = {
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
    teamID: 12345,

    /**
     * Setting your twitch channels
     * Setting this allows the application to monitor all the listed twitch channels
     * and put the contents in them into a text file, allowing you to aggregate
     * all participating channels into a single chat. Below is set to a few popular
     * channels for example usage.
     */
    channels: [
        'cohhcarnage',
        'pewdiepie'
    ],
};