const id = require('../id.json'),
    logger = require('../logger'),
    roles = [
        id.roles.dev,
        id.roles.yendis,
        id.roles.cm,
        id.roles.mod,
        id.roles.tmod,
    ],
    socials = [
        'https://krunker.io/social.html?p=profile&q=',
        'https://kr.social/p/',
    ];


module.exports.run = (client, message) => {
    var canBypass = false;
    if (!canBypass) roles.forEach(role => { if (message.member.roles.cache.has(role)) canBypass = true; return });
    if (!canBypass) {
        let rulesBroken = `<@${message.author.id}> Your message was deleted for breaking the following rule(s):`;
        if (social.every(social => message.content.indexOf(social) < 0)) rulesBroken += `\n> All trades require a link to your account. Approved domains: \n> ► ${socials.join('\n> ► ')}`;
        // if (link isnt from socials array) rulesBroken += '\n> No external links besides social hub links to your account.';
        if (rulesBroken != `<@${message.author.id}> Your message was deleted for breaking the following rule(s):`) {
            message.channel.send(rulesBroken + '\n *This is an automated message.*');
            logger.messageDeleted(message, 'Trading board', 'BLACK');
        }
    }
}

module.exports.config = {
    name: 'trading',
}