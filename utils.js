module.exports = {

    hello: function (message) {
        return message.channel.send(`Hello <@${message.author.id}>!`);
    },

    clan: function (data, message, Discord) {
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

        return message.channel.send({
            embed
        });
    },

    top5: function (data, message, Discord) {
        const embed = new Discord.RichEmbed()
            .setTitle("Top Players")
            .setDescription("5 High ranked players");
        for (let i = 0; i < data.length && i < 5; i++) {
            embed.addField(
                `${i+1}. ${data[i].name}`,
                `\:trophy: ${data[i].trophies}`
            );
        }
        return message.channel.send({
            embed
        })
    },

    donations: function (data, message, Discord) {
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

        return message.channel.send({
            embed
        })
    },

    errorCommand: function (message) {
        return message.channel.send(`<@${message.author.id}>: bad command!`);
    },

    errorOption: function(error, message){
        return message.channel.send(`<@${message.author.id}>: ${error}!`);      
    }
};