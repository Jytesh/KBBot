const logger = require('../logger'),
    { MessageEmbed } = require("discord.js");

const roles = [
    '692870902005629041', //Trial Mod
    '448207247215165451', //Mod
    '448195089471111179', //CM
    '638129127555072028', //Yendis
    '448198031041495040', //Dev
];

const rules = {
    social: 'Reports must include their **social profile link**. Acceptable urls: \n - https://kr.social/p/ \n - https://krunker.io/social.html?p=profile&q=',
    video: 'Reports must include a **YouTube** video, a **Streamable** video, a **Loom** video, or a **Twitch** clip when submitting a report. We will only accept video evidence from those platforms. \n - Reports with videos uploaded to any other video sharing platform will be deleted. \n - If your video or clip is deleted and is unavailable in the future, users that you reported may be unflagged.',
};

module.exports.run = (client, message) => {
    var canBypass = false;
    if (!canBypass) roles.forEach(role => { if (message.member.roles.cache.has(role)) canBypass = true; return });
    if (!canBypass) {
        let rulesBroken = '';
        if (!message.content.includes('https://kr.social/p/') && !message.content.includes('https://krunker.io/social.html?p=profile&q=')) rulesBroken += `► ${rules.social} \n`;
        if (!message.content.includes('https://www.youtube.com/watch?v=') && !message.content.includes('https://youtu.be/') && !message.content.includes('https://streamable.com/') && !message.content.includes('https://www.loom.com/share/') && !message.content.includes('https://clips.twitch.tv/') && !message.content.includes('https://www.twitch.tv/')) rulesBroken += `► ${rules.video}`;
        if (rulesBroken != '') {
            message.reply(new MessageEmbed()
                .setTitle('Please make sure you read the rules about submitting a report')
                .setColor('ORANGE')
                .setDescription('Your report has broken the following rule(s): \n' + rulesBroken)
                .setTimestamp()
            ).then(msg => { msg.delete({ timeout: 20000 }) }).catch(console.error);
            logger.messageDeleted(message, 'Hacker Report - Missing required info');
            message.delete();
        } else {
            message.reply(new MessageEmbed()
                .setTitle('Thank you')
                .setColor('GREEN')
                .setDescription('Your report has been submitted for review. Thank you for the report.')
                .setTimestamp()
            ).then(msg => { msg.delete({ timeout: 20000 }) }).catch(console.error);
            client.channels.cache.get('727467397740625951').send(new MessageEmbed()
                .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
                .setColor('BLURPLE')
                .setDescription('► Content: \n> ' + message.content)
                .setFooter('Does anyone actually read this?')
                .setTimestamp());
            logger.messageDeleted(message, 'Hacker Report - Report processed');
            message.delete();
        }
    }
}

module.exports.config = {
    name: 'reporthackers',
}