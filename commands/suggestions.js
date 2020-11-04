const { MessageEmbed } = require("discord.js"),
    logger = require('../logger');

module.exports.run = (client, message) => {
    client.users.fetch(message.content.split(' ')[0], true, true).then(suggester => {
        message.channel.send(new MessageEmbed()
                .setColor('YELLOW')
                .setAuthor(`${suggester.tag} (${suggester.id})`, suggester.displayAvatarURL())
                .setDescription(message.content.split(' ').splice(1).join(' '))
                .setFooter('DM a moderator to have your suggestion posted')
                .setTimestamp())
            .then(sentEmbed => {
                sentEmbed.react("👍");
                sentEmbed.react("👎");
            });
        logger.messageDeleted(message, 'Suggestion', 'YELLOW')
    });
}

module.exports.config = {
    name: 'suggestions',
}