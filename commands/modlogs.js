const id = require("../id.json"),
    { MessageEmbed } = require("discord.js"),
    db = require('../app').db.moderator;

module.exports.run = async(client, message) => {
    const fetchUser = await db.get(message.author.id);
    if (fetchUser) {
        message.reply(new MessageEmbed()
            .setTitle('Modlogs for ' + message.author.username)
            .setDescription('Submissions: ' + fetchUser.submissions)
            .setTimestamp());
    } else {
        message.reply(new MessageEmbed()
            .setTitle('ERROR')
            .setDescription('No modlogs exists for you')
            .setTimestamp());
    }
}

module.exports.config = {
    name: 'modlogs',
}