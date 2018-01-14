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

    top: function (data, message, max, Discord) {
        const embed = new Discord.RichEmbed()
            .setTitle("Top Players")
            .setDescription(`${max} High ranked players`);
        for (let i = 0; i < data.length && i < max; i++) {
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

    player: function (data, message, Discord) {
        const embed = new Discord.RichEmbed();
        embed.setTitle("Player Information")
            .setColor("#22A7F0")
            .addField("Name", `${data.name} - Level ${data.stats.level}`)
            .addField("Clan", `${data.clan.name} (${data.clan.role})`)
            .addField("Max trophies", `${data.stats.maxTrophies} \:trophy:`)
            .addField("Current trophies", `${data.trophies} \:trophy:`)
            .addField("Total donations", data.stats.totalDonations)
            .addField("Cards", `${data.stats.cardsFound}/81`)
            .addField("Favorite card", data.stats.favoriteCard.name)
            .addField("W/L/D", `${data.games.winsPercent*100}%/${data.games.lossesPercent*100}%/${data.games.drawsPercent*100}%`)
            .addField("Challenge max win", data.stats.challengeMaxWins)
            .addField("Challenge cards won", data.stats.challengeCardsWon)
            .addField("Tournament cards won", data.stats.tournamentCardsWon)
            .setThumbnail(data.clan.badge.image);

        return message.channel.send({
            embed
        });
    },

    chest: function (data, message, img, Discord) {
        const embed = new Discord.RichEmbed();
        embed.setTitle("Chest informations")
            .setColor("#22A7F0")
            .setDescription(`Next chest incoming for ${data.name}`)
            .addField("Giant", data.chestCycle.giant)
            .addField("Epic", data.chestCycle.epic)
            .addField("Magical", data.chestCycle.magical)
            .addField("Super Magical", data.chestCycle.superMagical)
            .addField("Legendary", data.chestCycle.legendary)
            .setThumbnail(img);

        return message.channel.send({
            embed
        });
    },

    removeHash: function (arg) {
        return arg.replace('#', '');
    },

    errorCommand: function (message) {
        return message.channel.send(`<@${message.author.id}>: bad command!`);
    },

    errorOption: function (error, message) {
        return message.channel.send(`<@${message.author.id}>: ${error}!`);
    }
};