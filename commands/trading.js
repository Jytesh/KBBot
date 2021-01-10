const id = require('../id.json'),
    logger = require('../logger');

const roles = [
    id.roles.dev,
    id.roles.yendis,
    id.roles.cm,
    id.roles.mod,
    id.roles.tmod,
];

module.exports.run = (client, message) => {
    var canBypass = false;
    if (!canBypass) roles.forEach(role => { if (message.member.roles.cache.has(role)) canBypass = true; return });
    if (!canBypass && message.content.indexOf('https://krunker.io/social.html?p=profile&q=') < 0 && message.content.indexOf('https://kr.social/p/') < 0) {
        message.channel.send(`<@${message.author.id}> Your message was deleted for breaking the following rule(s): \n> All trades require a link to your account. \n *This is an automated message.*`);
        logger.messageDeleted(message, 'Trading board - Missing link', 'BLACK');
    }
}

module.exports.config = {
    name: 'trading',
}