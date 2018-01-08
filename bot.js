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
                            .setTitle("Clan Informations")
                            .setColor("#22A7F0")
                            .setField(
                                "Name",
                                data.name
                            )
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

                        message.channel.send({
                            embed
                        });
                    });
                break;
            case 'top5':
                request.get('http://api.cr-api.com/clan/9PY9VL8J')
                    .then(res => {
                        const data = res.data.members;
                        const embed = new Discord.RichEmbed()
                            .setTitle("Top Players")
                            .setDescription("5 High ranked players");
                        for (let i = 0; i < data.length && i < 5; i++) {
                            embed.addField(
                                `${i+1}. ${data[i].name}`,
                                `🏆 ${data[i].trophies}`
                            );
                        }
                        message.channel.send({
                            embed
                        })
                    });
                break;
            case 'donations':
                request.get('http://api.cr-api.com/clan/9PY9VL8J')
                    .then(res => {
                        const data = res.data.members;
                        const embed = new Discord.RichEmbed()
                            .setTitle("Top Donations Player")
                            .setDescription("5 Best Donations Players");

                        data.sort((a, b) => {
                            return b.donations - a.donations
                        });
                        
                        for (let i = 0; i < data.length && i < 5; i++) {
                            embed.addField(
                                `${i+1}. ${data[i].name}`,
                                `🎁 ${data[i].donations}`
                            );
                        }

                        message.channel.send({
                            embed
                        })
                    });
                break;
            default:
                message.channel.send(`You've sent a bad command`);
        }
    }
});

bot.login(auth.token);