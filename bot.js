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
                        console.log(err)
                    });
                break;
            case 'top5':
                request.get(`http://api.cr-api.com/clan/${clanTag}`)
                    .then(res => {
                        Utils.top5(res.data.members, message, Discord);
                    });
                break;
            case 'donations':
                request.get(`http://api.cr-api.com/clan/${clanTag}`)
                    .then(res => {
                        Utils.donations(res.data.members, message, Discord);
                    });
                break;
            default:
                message.channel.send(`You've sent a bad command`);
        }
    }
});

bot.login(conf.token);