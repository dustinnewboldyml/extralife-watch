# ExtraLife Watch
This project will connect to extralife with a provided team ID

## Installation
After downloading this codebase, run `npm install` (or `yarn`). This will install all required dependencies

## Configuration
1. Create a new file in the root of the application named `config.js`.
2. Copy the contents of `config.example.js` into `config.js`.
3. Update the `teamID` and `channels` to their appropriate settings.

## Running
To run the application, simply open a terminal into the project directory and run `npm start` (or `yarn start`).

## Usage
Running this application will create several files within the `outputs` directory. These files represent several different data points for which you can use as you wish. For example, if you are using a streaming software like OBS or StreamLabs, you may wish to set the data point to be available within your layout of the software, so it is visible during your streams.