const auth = require('./auth.json');

const Discord = require("discord.js");
const bot = new Discord.Client();

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
            default:
                message.channel.send(`You've sent a bad command`);
        }
    }
});

bot.login(auth.token);