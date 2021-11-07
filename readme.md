# ExtraLife Watch
This project will connect to extralife with a provided team ID

## Installation
After downloading this codebase, run `npm install` (or `yarn`). This will install all required dependencies

## Configuration
1. Create a new file in the `config` directory. Name the file: `config.js`.
2. Copy the contents of `config.example.js` into `config.js`.
3. Update the `teamID` and `channels` to their appropriate settings.

## Running
To run the application, simply open a terminal into the project directory and run `npm start` (or `yarn start`).

## Usage
Running this application will create several files within the `outputs` directory. These files represent several different data points for which you can use as you wish. For example, if you are using a streaming software like OBS or StreamLabs, you may wish to set the data point to be available within your layout of the software, so it is visible during your streams.

## Advanced Configuration
There are several configuration options that are not displayed in the example config file. This is because most people will not need to use this. However, the application does expose the configuration for advanced user. See the `src/settings.js` file for sample settings that you may be able to use.

|Setting  | Example | Format | Description |
|-|-|-|-|
| `interval` | 10 | Number | Setting this will set the interval for which the application will ping the ExtraLife API servers. Represented in seconds.
| `retry` | 60 | Number | If the API call falls, this is how many seconds until the next API call is attempted.
| `timestamp` | true | Boolean or string | If this is set to `true`, this will use display timestamp information for every log message. If this is set to `false`, it does not. If this is set to a string, it will format the `timestamp` with the provided format. See [this link](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/) for formating options. By default, the format is `h:mm:ss A`. This outputs a time similar to `10:49:46 AM`.
| `verbose` | 1 | Number | Determines the amount of information is output to the log while the application is running.<br/><br/>`0` = Minimal output<br/>`1` = Useful information (chat, donations, etc.)<br/>`2` = Verbose logging, including connection information.<br/>`3` = Debug information, including API responses<br/>`4` = Increased debugging, including raw message objects from chat

### Complex Objects
There are a few configuration options that utilize more complex objects. The following configuration is in object notation.

|Setting  | Example | Format | Description |
|-|-|-|-|
| `alerts.notifications` | true | boolean | If enabled, will use OS level notifications when a new donation comes in
| `alerts.sound.enabled` | true | boolean | If enabled, will play an audible alert (mp3) when a new donation comes in
| `alerts.sound.path` | /Users/me/Downloads/donation.mp3 | string | The path of the sound to use for a sound alert. This uses the application sound by default, but you may override it with this setting.
| `timer.enabled` | true | boolean | Enables the timer to run while the application is running, writing the elapsed seconds to `outputs/timer.txt`
| `timer.zones` | – | Array | Sets the zones for which the timer will run. See zones below

### Zones
When using a timer, the application has the capability to determine seconds that have elapsed within the zones defined. If a zone has passed already, it will assume having streamed for the duration of the zone. If while the application is running and a zone end has approached, the timer will pause until another zone is available. If the zone array is empty, then the application will simply run a timer for the duration of the application running.

Zones utilize an object notation for determining the start and end of every zone. `timer.zones` is an array of the following object, where the `{DATE}` is a javascript `Date()` object, representing the start or end of the zone.
```js
{
    start: new Date(),
    end: new Date()
}
```

#### Example: Empty Zone Array
```js
zones: []
```
When using an empty zone array, the timer will display elapsed during only while the application is running. For example, if you start the application and the application has been running for 4 hours and 12 minutes, it will output `04:12:00`. If you close the application, restart your computer, or the application happens to crash, when you restart the application, it will start back from `00:00:00`.


#### Example: Using Zones
Suppose you are planning on running the application from noon on November 6, 2021 until midnight, and then again using the same times but on November 7th. You may have your zones set up as such:
```js
zones: [
    {
        start: new Date('2021-11-06 12:00:00'),
        end:   new Date('2021-11-07 00:00:00')
    },
    {
        start: new Date('2021-11-07 12:00:00'),
        end:   new Date('2021-11-08 00:00:00')
    }
]
```

**Date Format**
The `start` and `end` objects MUST be in a date object and must follow the notation as used in the example above with `YYYY-MM-DD hh:mm:ss` *(year-month-day hour:minute:second)*.