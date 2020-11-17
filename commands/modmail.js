const config = require("../config.json"),
    id = require("../id.json"),
    { MessageEmbed } = require("discord.js"),
    logger = require("../logger");

const requestKeys = {
    'clan-board': ['clan', 'clans', 'clan-board'],
    'suggestion': ['suggest', 'suggestion'],
}

const clanRequirements = [
    'Clan Name:',
    'Clan Level:',
    'Clan Leader(s):',
    'Clan Info:',
    'Contact Info:',
    'Discord Link:',
];

module.exports.run = (client, message) => {
    const request = message.content.substring(0, message.content.indexOf(' '));
    const content = message.content.substring(message.content.indexOf(' ') + 1);

    if (request == '' || content == '') {
        message.channel.send(new MessageEmbed()
            .setTitle('Oi oi oi, u didnt include enough inputs')
            .setColor('RED')
        ).then(m => { m.delete({ timeout: 7000 }) });
    }

    if (requestKeys['suggestion'].includes(request)) {
        client.channels.resolve(id.channels["bunker-bot-commands"]).send(new MessageEmbed()
            .setTitle('Suggestions submission request')
            .setColor('YELLOW')
            .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .setDescription(content)
            .setTimestamp()
        ).then(m => {
            m.react(client.emojis.cache.get(id.emojis.yes));
            m.react(client.emojis.cache.get(id.emojis.no));
        });
    } else if (requestKeys["clan-board"].includes(request)) {
        let denyReasons = '';
        clanRequirements.forEach(requirement => { if (!content.includes(requirement)) denyReasons += `- Missing field: ***${requirement}*** \n`; });

        if (!content.startsWith('```')) content = '```' + content;
        if (!content.endsWith('```')) content += '```';

        if (denyReasons == '') {
            client.channels.resolve(id.channels["bunker-bot-commands"]).send(new MessageEmbed()
                .setTitle('Clan Boards submission request')
                .setColor('YELLOW')
                .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
                .setDescription(content)
                .setTimestamp()
            ).then(m => {
                m.react(client.emojis.cache.get(id.emojis.yes));
                m.react(client.emojis.cache.get(id.emojis.no));
            });
        } else {
            message.reply(new MessageEmbed()
                .setTitle('Missing info')
                .setColor('RED')
                .setDescription(denyReasons)
            ).then(m => { m.delete({ timeout: 7000 }) });
        }
    }
}

module.exports.react = async(client, reaction, user) => {
    await reaction.fetch();
    await reaction.message.fetch();
    const embed = reaction.message.embeds[0];

    if (embed.color == 'YELLOW') switch (reaction.emoji.id) {
        case id.emojis.yes:
            reaction.message.guild.channels.resolve(id.channels.suggestions).send(embed).then(m => {
                m.react('👍');
                m.react('👎');
            });
            embed.setColor('GREEN');
            break;
        case id.emojis.no:
            reaction.message.channel.send(`<@${user.id}>, What is the reason for declining ${reaction.message.url}`)
            messages = await reaction.message.channel.awaitMessages(m => m.author.id == user.id, { max: 1, time: 60000, errors: ['time'] }).catch(e => reaction.message.channel.send("Time up! Go decline it again."));
            author_id = embed.author.name.match(/(([^)]+))/)[1] //Extracts the ID
            member = reaction.message.guild.member(author_id)
            member.send(new Discord.MessageEmbed().setDescription(`Your suggestion \`${embed.description}\` was declined due to \`${messages.first().content}\` `).setColor("GOLD"))
            embed.setColor('RED');

            break;
    }
}

module.exports.config = {
    name: 'modmail',
}