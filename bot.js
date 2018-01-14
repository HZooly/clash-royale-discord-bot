const Discord = require('discord.js');
const axios = require('axios');
const conf = require('./conf.json');

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
                request.get(`http://api.cr-api.com/clan/${clanTag}`)
                    .then(res => {
                        Utils.clan(res.data, message, Discord);
                    })
                    .catch(err => {
                        console.log(err);
                    });
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
            default:
                Utils.errorCommand(message);
        }
    }
});

bot.login(conf.token);