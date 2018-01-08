const Discord = require('discord.js');
const axios = require('axios');
const auth = require('./auth.json');

const bot = new Discord.Client();

let request = axios.create({
    headers: {
        'auth': auth.apiKey
    }
});

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
    if (message.content.substring(0, 1) == '!') {
        let args = message.content.substring(1).split(' ');
        let instruction = args[0];

        args = args.splice(1);
        switch (instruction) {
            case 'hello':
                message.channel.send(`Hello <@${message.author.id}>!`);
                break;
            case 'clan':
                request.get('http://api.cr-api.com/clan/9PY9VL8J')
                    .then(res => {
                        const data = res.data;
                        const embed = new Discord.RichEmbed()
                            .setTitle(data.name)
                            .setColor("#22A7F0")
                            .setDescription(data.description)
                            .addField(
                                "Players",
                                `${data.memberCount}/50`
                            )
                            .addField(
                                "Score",
                                data.score
                            )
                            .addField(
                                "Donations",
                                data.donations
                            )
                            .addField(
                                "Required Trophies",
                                data.requiredScore
                            )
                            .setThumbnail(data.badge.image)

                        message.channel.send(
                            {
                                embed
                            }
                        );
                    });
                break;
            default:
                message.channel.send(`You've sent a bad command`);
        }
    }
});

bot.login(auth.token);