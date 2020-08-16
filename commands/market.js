const config = require("../config.json");
const roles = [
    '692870902005629041', //Trial Mod
    '448207247215165451', //Mod
    '448195089471111179', //CM
];
const users = [
    '425441636449910807', //JB#6969
    '363756486100385801', //ReDeagle#7877
    '375009526296084491', //MyLittleSpartan#6984
];

module.exports.run = (client, message) => {
    if (message.content.indexOf(`${config.prefix}trade`) == 0) {
        var canAccess = users.includes(message.author.id);
        if (!canAccess) roles.forEach(role => { if (message.member.roles.cache.has(role)) canAccess = true; return });
        if (canAccess) {
            const str = message.content.split(' ').length == 2 ? `<@${message.content.split(' ')[1]}> ` : '';
            message.channel.send(`${str}Trade/Trading? Make sure you are in the right channel. \n - <#604386199976673291> is for trade advice \n - <#710454866002313248> is for trade listings.`);
        }
        message.delete();
    } else if (message.content.indexOf(`${config.prefix}market-help`) == 0) {
        var canAccess = users.includes(message.author.id);
        if (!canAccess) roles.forEach(role => { if (message.member.roles.cache.has(role)) canAccess = true; return });
        if (canAccess) {
            const str = message.content.split(' ').length == 2 ? `<@${message.content.split(' ')[1]}> ` : '';
            message.channel.send(`${str}Need help with market? Here are the commands. \n - \`$stonks\` is for advice on whether a trade is good or bad. \n - \`$bid\` is for creating a new bid. \n -> For both commands, please remember to include relevant images.`);
        }
        message.delete();
    } else if (message.content.indexOf(`${config.prefix}stonks`) == 0) {
        if (message.attachments.size == 0) {
            message.reply("Please include **cropped** image displaying the trade in question.").then(msg => {
                msg.delete({ timeout: 6000 });
            }).catch(console.error);
            message.delete();
            return;
        }
        message.react(client.emojis.cache.get('744384600780046438'));
        message.react(client.emojis.cache.get('744384600780046418'));
        message.react(client.emojis.cache.get('744384601165791302'));
    }
}

module.exports.config = {
    name: 'market',
    aliases: ['market'],
}
module.exports.help = {
    usage: '',
    User: 0,
    description: ''
}