const Discord = require('discord.js');
const axios = require('axios');
const conf = require('./conf.json');
const express = require('express');
const app = express();

const Utils = require('./utils.js');

const bot = new Discord.Client();
const clanTag = conf.clanTag;

let request = axios.create({
    headers: {
        'auth': conf.apiKey
    }
});

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
    if (message.content.substring(0, 1) == '!') {
        let args = message.content.substring(1).split(' ');
        let instruction = args[0];

        let option = (args[1] !== undefined) ? args[1] : null;

        switch (instruction) {
            case 'hello':
                Utils.hello(message);
                break;
            case 'clan':
                if (option) {
                    option = Utils.removeHash(option);
                    request.get(`http://api.cr-api.com/clan/${option}`)
                        .then(res => {
                            Utils.clan(res.data, message, Discord);
                        })
                        .catch(err => {
                            Utils.errorOption("Bad clan ID", message);
                        })
                } else {
                    request.get(`http://api.cr-api.com/clan/${clanTag}`)
                        .then(res => {
                            Utils.clan(res.data, message, Discord);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                break;
            case 'top':
                if (option) {
                    if (option >= 1 && option <= 25) {
                        request.get(`http://api.cr-api.com/clan/${clanTag}`)
                            .then(res => {
                                Utils.top(res.data.members, message, option, Discord);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        Utils.errorOption("Bad option for top (max 25 players)", message);
                    }
                } else {
                    request.get(`http://api.cr-api.com/clan/${clanTag}`)
                        .then(res => {
                            Utils.top(res.data.members, message, 5, Discord);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                break;
            case 'donations':
                request.get(`http://api.cr-api.com/clan/${clanTag}`)
                    .then(res => {
                        Utils.donations(res.data.members, message, Discord);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                break;
            case 'player':
                if (option) {
                    option = Utils.removeHash(option);
                    request.get(`http://api.cr-api.com/player/${option}`)
                        .then(res => {
                            Utils.player(res.data, message, Discord);
                        })
                        .catch(err => {
                            Utils.errorOption("Bad player ID", message);
                        })
                } else {
                    Utils.errorOption("You need to specify a player ID", message);
                }
                break;
            case 'chest':
                if (option) {
                    option = Utils.removeHash(option);
                    const chestId = chestIDs[Math.floor(Math.random() * (chestIDs.length - 0 + 1))];
                    const chestImgUrl = `http://www.clashapi.xyz/images/chests/${chestId}.png`;
                    request.get(`http://api.cr-api.com/player/${option}`)
                        .then(res => {
                            Utils.chest(res.data, message, chestImgUrl, Discord);
                        })
                        .catch(err => {
                            Utils.errorOption("Bad player ID", message);
                        })
                } else {
                    Utils.errorOption("You need to specify a player ID", message);
                }
                break;
            case 'help':
                Utils.help(message, Discord);
                break;
            default:
                Utils.errorCommand(message);
        }
    }
});

/* Init chests id names */
let chestIDs = [
    "wooden-chest",
    "silver-chest",
    "golden-chest",
    "crown-chest",
    "magical-chest",
    "giant-chest",
    "super-magical-chest",
    "epic-chest",
    "legendary-chest",
    "lightning-chest",
    "fortune-chest",
    "kings-chest"
];

bot.login(conf.token);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Our app is running on http://localhost:' + port);
});

setInterval(() => {
 http.get('https://murmuring-citadel-27537.herokuapp.com/');
}, 900000);
