const Discord = require('discord.js');
const axios = require('axios');
const auth = require('./auth.json');
const informations = require('./informations.json');

const bot = new Discord.Client();
const clanTag = informations.clanTag;

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
                request.get(`http://api.cr-api.com/clan/${clanTag}`)
                    .then(res => {
                        const data = res.data;
                        const embed = new Discord.RichEmbed();
                        embed.setTitle("Clan Informations")
                            .setDescription(data.description)
                            .setColor("#22A7F0")
                            .addField("Name", data.name)
                            .addField("Players", `${data.memberCount}/50`)
                            .addField("Score", data.score)
                            .addField("Donations", data.donations)
                            .addField("Required Trophies", data.requiredScore)
                            .setThumbnail(data.badge.image);

                        message.channel.send({
                            embed
                        });
                    })
                    .catch(err => {
                        console.log(err)
                    });
                break;
            case 'top5':
                request.get(`http://api.cr-api.com/clan/${clanTag}`)
                    .then(res => {
                        const data = res.data.members;
                        const embed = new Discord.RichEmbed()
                            .setTitle("Top Players")
                            .setDescription("5 High ranked players");
                        for (let i = 0; i < data.length && i < 5; i++) {
                            embed.addField(
                                `${i+1}. ${data[i].name}`,
                                `\:trophy: ${data[i].trophies}`
                            );
                        }
                        message.channel.send({
                            embed
                        })
                    });
                break;
            case 'donations':
                request.get(`http://api.cr-api.com/clan/${clanTag}`)
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
                                `\:gift: ${data[i].donations}`
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