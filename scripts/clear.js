const fs = require('fs');
const path = require('path');
const log = require('../src/log');

if ( fs.existsSync(path.join(__dirname, '../outputs/average-donation.txt')) ) fs.unlinkSync(path.join(__dirname, '../outputs/average-donation.txt'));
if ( fs.existsSync(path.join(__dirname, '../outputs/chat.txt')) ) fs.unlinkSync(path.join(__dirname, '../outputs/chat.txt'));
if ( fs.existsSync(path.join(__dirname, '../outputs/timer.txt')) ) fs.unlinkSync(path.join(__dirname, '../outputs/timer.txt'));
if ( fs.existsSync(path.join(__dirname, '../outputs/latest-amount.txt')) ) fs.unlinkSync(path.join(__dirname, '../outputs/latest-amount.txt'));
if ( fs.existsSync(path.join(__dirname, '../outputs/latest-combined.txt')) ) fs.unlinkSync(path.join(__dirname, '../outputs/latest-combined.txt'));
if ( fs.existsSync(path.join(__dirname, '../outputs/latest-message.txt')) ) fs.unlinkSync(path.join(__dirname, '../outputs/latest-message.txt'));
if ( fs.existsSync(path.join(__dirname, '../outputs/latest-name.txt')) ) fs.unlinkSync(path.join(__dirname, '../outputs/latest-name.txt'));
if ( fs.existsSync(path.join(__dirname, '../outputs/total-donated.txt')) ) fs.unlinkSync(path.join(__dirname, '../outputs/total-donated.txt'));
if ( fs.existsSync(path.join(__dirname, '../outputs/total-donations.txt')) ) fs.unlinkSync(path.join(__dirname, '../outputs/total-donations.txt'));
if ( fs.existsSync(path.join(__dirname, '../outputs/total-donators.txt')) ) fs.unlinkSync(path.join(__dirname, '../outputs/total-donators.txt'));

log('Output logs cleared');
