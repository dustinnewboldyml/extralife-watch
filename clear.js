const fs = require('fs');

if ( fs.existsSync('./outputs/average-donation.txt') ) fs.unlinkSync('./outputs/average-donation.txt');
if ( fs.existsSync('./outputs/chat.txt') ) fs.unlinkSync('./outputs/chat.txt');
if ( fs.existsSync('./outputs/clock.txt') ) fs.unlinkSync('./outputs/clock.txt');
if ( fs.existsSync('./outputs/latest-amount.txt') ) fs.unlinkSync('./outputs/latest-amount.txt');
if ( fs.existsSync('./outputs/latest-combined.txt') ) fs.unlinkSync('./outputs/latest-combined.txt');
if ( fs.existsSync('./outputs/latest-message.txt') ) fs.unlinkSync('./outputs/latest-message.txt');
if ( fs.existsSync('./outputs/latest-name.txt') ) fs.unlinkSync('./outputs/latest-name.txt');
if ( fs.existsSync('./outputs/total-donated.txt') ) fs.unlinkSync('./outputs/total-donated.txt');
if ( fs.existsSync('./outputs/total-donations.txt') ) fs.unlinkSync('./outputs/total-donations.txt');
if ( fs.existsSync('./outputs/total-donators.txt') ) fs.unlinkSync('./outputs/total-donators.txt');

console.log('Output logs cleared');
