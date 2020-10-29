const { MessageEmbed } = require("discord.js"),
    logger = require('../logger');

module.exports.run = (client, message) => {
    message.channel.send(new MessageEmbed()
            .setColor('YELLOW')
            .setDescription(`${message.content.split(' ').splice(1).join(' ')} \n\n - Suggested by <@${message.content.split(' ')[0]}>`))
        .then(sentEmbed => {
            sentEmbed.react("👍");
            sentEmbed.react("👎");
        });
    logger.messageDeleted(message, 'Suggestion')
    message.delete();
}

module.exports.config = {
    name: 'suggestions',
    aliases: ['sug'],
}
module.exports.help = {
    usage: '',
    User: 0,
    description: ''
}