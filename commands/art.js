const roles = [
    '692870902005629041', //Trial Mod
    '448207247215165451', //Mod
    '448195089471111179', //CM
    '638129127555072028', //Yendis
    '448198031041495040', //Dev
    '507254593671921667', //CC
    '540960247737745420', //Verified
    '696254536918106182', //Esports
    '519637672294088742', //Reddit
    '527893477577719840', //Wiki
];

module.exports.run = (client, message) => {
    var canBypass = false;
    if (!canBypass) roles.forEach(role => { if (message.member.roles.cache.has(role)) canBypass = true; return });
    if (!canBypass && message.attachments.size == 0) {
        message.delete();
    }
}

module.exports.config = {
    name: 'art',
    aliases: ['art'],
}
module.exports.help = {
    usage: '',
    User: 0,
    description: ''
}