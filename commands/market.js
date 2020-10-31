const config = require("../config.json"),
    { MessageEmbed } = require("discord.js"),
    logger = require("../logger");

// Access IDs
const roles = [
    '692870902005629041', // Trial Mod
    '448207247215165451', // Mod
    '448195089471111179', // CM
];
const users = [
    '425441636449910807', // JB#0001
    '363756486100385801', // ReDeagle#7877
    '375009526296084491', // MyLittleSpartan#6984
    '235418753335033857', // JJ_G4M3R#2155
    '485676072176713729', // ._.#3220
    '235935874888630272', // SUUUN#0876
    '504794061820133383', // ItzUchiha#8516
];
const advisors = [
    '425441636449910807', // JB#0001
    '504794061820133383', // ItzUchiha#8516
    '485676072176713729', // ._.#3220
    '711641594314358907', // King_#8888
];

module.exports.run = (client, message) => {
    if (message.content.startsWith(`${config.prefix}trade`)) {
        trade(message);
    } else if (message.content.startsWith(`${config.prefix}help`)) {
        helpCmd(message);
    } else if (message.content.startsWith(`${config.prefix}pins`)) {
        //pins(message);
    } else if (message.content.startsWith(`${config.prefix}advisors`)) {
        //advisorsCmd(message);
    } else if (message.content.startsWith(`${config.prefix}advise`)) {
        //advise(client, message);
    } else if (message.content.startsWith(`${config.prefix}stonks`)) {
        stonks(client, message);
    }
}

// Mini Mod Functions
function trade(message) {
    miniModBase(message, 'Trade/Trading? Make sure you are in the right channel. \n - <#604386199976673291> is for trade advice \n - <#710454866002313248> is for trade listings.');
    logger.messageDeleted(message, 'Market command')
    message.delete();
}

function helpCmd(message) {
    const args = message.content.split(' ');
    if (args[1] == '-user') {
        if (users.includes(message.author.id)) {
            const eb = new MessageEmbed()
                .setTitle('Krunker Bunker Bot Help Guide - Users')
                .setColor('ORANGE')
                .addField(`\`${config.prefix}trade [optional id]\``, 'Remind kids where to trade items and where to get trade advice.')
                .addField(`\`${config.prefix}help [optional id]\``, 'Remind kids of what commands they can use.')
                .addField(`\`${config.prefix}help -users\``, 'This thingy.')
                .addField(`\`${config.prefix}pins [optional id]\``, 'Remind kids of the pins.')
                .addField(`\`${config.prefix}advisors\``, 'Remind kids of who the current advisors are.')
                .setFooter('Krunker Bunker Bot • Designed by JJ_G4M3R and Jytesh')
                .setTimestamp();
            message.author.createDM().then(m => m.send(eb));
        }
    } else if (args[1] == '-advisor') {
        if (advisors.includes(message.author.id)) {
            const eb = new MessageEmbed()
                .setTitle('Krunker Bunker Bot Help Guide - Advisors')
                .setColor('RED')
                .addField(`\`${config.prefix}advisors\``, 'Remind kids of who the current advisors are.')
                .addField(`\`${config.prefix}advise (yes/no) (message id)\``, 'React with a special emotes to stonks votes.')
                .addField()
                .setFooter('Krunker Bunker Bot • Designed by JJ_G4M3R and Jytesh')
                .setTimestamp();
            message.author.createDM().then(m => m.send(eb));
        }
    } else {
        miniModBase(message, 'Need help with market? Here are the commands. \n - \`$stonks\` is for advice on whether a trade is good or bad. \n - \`$bid\` is for creating a new bid (See \`$bid -help\` for more information). \n -> For both commands, please remember to include relevant images.');
    }

    logger.messageDeleted(message, 'Market command')
    message.delete();
}

function pins(message) {
    const rules = [
        'No Free KR Spin flexing',
        'No loadout showcases',
        'No unboxings unless you intend to sell them',
        'No cashbacks',
        'No sob-stories',
        'No zero-to-hero challenge advertisements',
        'No excessive usage of caps',
        'No wagers, this is market chat, not wager chat',
        'No begging',
        'No excessive off-topic usage of the `$stonks` command',
    ];

    const args = message.content.split(' ');
    miniModBase(message, args.length == 3 && args[2] >= 0 && args[2] < rules.length ? `\n- ${rules[args[2]]}` : `\n- ${rules.join('\n- ')}`);

    logger.messageDeleted(message, 'Market command')
    message.delete();
}

//Advisor Functions
function advisorsCmd(message) {
    var canAccess = users.includes(message.author.id) || advisors.includes(message.author.id);
    if (!canAccess) roles.forEach(role => { if (message.member.roles.cache.has(role)) canAccess = true; return });
    if (canAccess) {
        var advisorsInString = '';
        advisors.forEach((id) => { advisorsInString += `- <@${id}> \n` });
        const eb = new MessageEmbed()
            .setTitle('Advisors')
            .setDescription('This is a list of people who are known to give proper advice.')
            .setColor('GREEN')
            .addField('Current Advisors:', advisorsInString)
            .setFooter('Krunker Bunker Bot • Designed by JJ_G4M3R and Jytesh')
            .setTimestamp();
        message.channel.send(eb);
    }
    logger.messageDeleted(message, 'Market command')
    message.delete();
}

function advise(client, message) {
    const args = message.content.split(' '); // Checks if author is an advisor
    if (advisors.includes(message.author.id)) {
        const emote = args[1] == 'yes' ? client.emojis.cache.get('540751229022765067') : "💩"; // Gets emote depending on advisor's advice
        message.channel.messages.fetch(args[2]).then(m => m.react(emote)).catch(console.error); // Gets message by id and then reacts with emote
    }
    logger.messageDeleted(message, 'Market command')
    message.delete();
}

// Public Functions
function stonks(client, message) {
    if (message.attachments.size == 0) { // Checks if message lacks an attachment
        message.reply("please include **cropped** image displaying the trade in question.").then(msg => {
            msg.delete({ timeout: 6000 }); // Autodel after 6000ms
        }).catch(console.error);
        message.delete();
        return;
    }
    message.react(client.emojis.cache.get('744384600780046438')); // Stonks emote
    message.react(client.emojis.cache.get('744384600780046418')); // Meh emote
    message.react(client.emojis.cache.get('744384601165791302')); // Bonks emote
}

// Util Functions 
function miniModBase(message, str) {
    var canAccess = users.includes(message.author.id); // Checks if author is in the access list
    if (!canAccess) roles.forEach(role => { if (message.member.roles.cache.has(role)) canAccess = true; return }); // If author is not in access list, checks if roles they have are.
    if (canAccess) {
        const ping = message.content.split(' ').length > 1 ? `<@${message.content.split(' ')[1]}> ` : ''; // Allows for an optional ping with the message.
        message.channel.send(`${ping}${str}`);
    }
}

module.exports.config = {
    name: 'market',
}