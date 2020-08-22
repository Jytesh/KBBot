const config = require("../config.json");
const db = require("../mongo.js");
const { MessageEmbed } = require("discord.js")

// Access IDs
const roles = [
    '692870902005629041', // Trial Mod
    '448207247215165451', // Mod
    '448195089471111179', // CM
];
const users = [
    '425441636449910807', // JB#6969
    '363756486100385801', // ReDeagle#7877
    '375009526296084491', // MyLittleSpartan#6984
    '235418753335033857', // JJ_G4M3R#2155
];
const advisors = [
    '508165669959892993', // 1gris#0039
    '425441636449910807', // JB#0001
    '504794061820133383', // ItzUchiha#8516
    '363756486100385801', // ReDeagle#7877
];

// Default bid details
const defaultMin = 10;
const defaultStart = 100;

module.exports.run = (client, message) => {
    if (message.content.startsWith(`${config.prefix}trade`)) {
        trade(message);
    } else if (message.content.startsWith(`${config.prefix}market-help`)) {
        marketHelp(message);
    } else if (message.content.startsWith(`${config.prefix}pins`)) {
        pins(message);
    } else if (message.content.startsWith(`${config.prefix}advisors`)) {
        advisorsCmd(message);
    } else if (message.content.startsWith(`${config.prefix}advise`)) {
        advise(client, message);
    } else if (message.content.startsWith(`${config.prefix}stonks`)) {
        stonks(client, message);
    } else if (message.content.startsWith(`${config.prefix}bid`)) {
        //bid(message);
    }
}

// Mini Mod Functions
function trade(message) {
    miniModBase(message, 'Trade/Trading? Make sure you are in the right channel. \n - <#604386199976673291> is for trade advice \n - <#710454866002313248> is for trade listings.');
}

function marketHelp(message) {
    miniModBase(message, 'Need help with market? Here are the commands. \n - \`$stonks\` is for advice on whether a trade is good or bad. \n - \`$bid\` is for creating a new bid (WIP not available yet). \n -> For both commands, please remember to include relevant images.');
}

function pins(message) {
    miniModBase(message, '- No Free KR Spin flexing \n- No loadout showcases \n- No unboxings unless you intend to sell them \n- No cashbacks');
}

//Advisor Functions
function advisorsCmd(message) {
    var canAccess = users.includes(message.author.id) || advisors.includes(message.author.id);
    if (!canAccess) roles.forEach(role => { if (message.member.roles.cache.has(role)) canAccess = true; return });
    if (canAccess) {
        var advisorsInString = '';
        advisors.forEach((id) => {
            advisorsInString += `- <@${id}> \n`
        });
        const eb = new MessageEmbed()
            .setTitle('Advisors')
            .setDescription('This is a list of people who are known to give proper advice.')
            .setColor('GREEN')
            .addField('Current Advisors:', advisorsInString);
        message.channel.send(eb);
    }
    message.delete();
}

function advise(client, message) {
    const args = message.content.split(' '); // Checks if author is an advisor
    if (advisors.includes(message.author.id)) {
        const emote = args[1] == 'yes' ? client.emojis.cache.get('540751229022765067') : client.emojis.cache.get('692001947158315080'); // Gets emote depending on advisor's advice
        message.channel.messages.fetch(args[2]).then(m => m.react(emote)).catch(console.error); // Gets message by id and then reacts with emote
    }
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

async function bid(message) {
    const args = message.content.split(" ");
    if (args[1] == '-c') { // Creating bid
        const hasActiveBid = await db.market.hasActiveBid(message.author.id, message.author.tag);
        if (hasActiveBid == -1) {
            dbError(message);
        } else if (hasActiveBid == true) {
            message.reply("you already have an active bid open. Please close the active bid before creating a new one.").then(msg => {
                msg.delete({ timeout: 6000 });
            }).catch(console.error);
        } else {
            if (message.attachments.size > 0) {
                const attachUrl = message.attachments.first().url;
                const createdBid = await db.market.createNewBid(message.author.id, {
                    start: args.length > 1 ? parseInt(args[2]) : defaultStart,
                    min: args.length > 2 ? parseInt(args[3]) : defaultMin,
                    url: attachUrl
                });
                if (createdBid == -1) {
                    dbError(message);
                } else {
                    console.log(createdBid.url)
                    const eb = new MessageEmbed()
                        .setTitle(`Bid #${await db.market.getUserBid(message.author.id)} Created`)
                        .setColor('GREEN')
                        .addField('Host:', `<@${createdBid.uid}>`, true)
                        .addField('Starting bid:', `${createdBid.start} kr`, true)
                        .addField('Minimum increments:', `${createdBid.min} kr`, true)
                        .setImage(createdBid.url)
                        .setTimestamp()
                    message.channel.send(eb);
                }
            } else {
                message.reply("please include an image displaying the item you wish to auction off.").then(msg => {
                    msg.delete({ timeout: 6000 });
                }).catch(console.error);
            }
        }
    } else if (args[1] == '-f') { // Finalise bid
        const hasActiveBid = await db.market.hasActiveBid(message.author.id, message.author.tag);
        if (hasActiveBid == -1) {
            dbError(message);
        } else if (hasActiveBid == true) {
            const finalisedBid = await db.market.finaliseBid(message.author.id);
            if (finalisedBid == -1) {
                dbError(message);
            } else {
                console.log(finalisedBid.url)
                const eb = new MessageEmbed()
                    .setTitle(`Bid #${finalisedBid.bid} Finalised`)
                    .setColor('RED')
                    .addField('Host:', `<@${finalisedBid.uid}>`, true)
                    .addField('Buyer:', `<@${finalisedBid.bidder}>`, true)
                    .addField('Final Price:', `${finalisedBid.curVal} kr`, true)
                    .setImage(finalisedBid.url)
                    .setTimestamp()
                message.channel.send(eb);
            }
        } else {
            message.reply("you do not have an active bid open. Please create an active bid before finalising one.").then(msg => {
                msg.delete({ timeout: 6000 });
            }).catch(console.error);
        }
    } else if (args[1] == '-b') { // Bid on item
        const args = message.content.split(' ');
        if (args.includes('-id') && args.includes('-inc')) {
            const bidIsHigher = await db.market.bidIsHigher(args[args.indexOf('-id') - 1], args[args.indexOf('-inc') - 1]);
            if (bidIsHigher == -1) {
                dbError(message);
            } else {
                const updateBid = await db.market.updateBid(args[args.indexOf('-id') - 1], message.author.id, args[args.indexOf('-inc') - 1]);
                if (updateBid == -1) {
                    dbError(message);
                }
            }
        } else {
            message.reply('your message was deleted. Please ensure that your message includes the proper details required to bid (\'-id\' and \'-inc\')');
        }
    }
    message.delete();
}

// Util Functions 
function dbError(message) {
    message.channel.send("Database error. Please try again later.").then(msg => {
        msg.delete({ timeout: 6000 });
    }).catch(console.error);
}

function miniModBase(message, str) {
    var canAccess = users.includes(message.author.id); // Checks if author is in the access list
    if (!canAccess) roles.forEach(role => { if (message.member.roles.cache.has(role)) canAccess = true; return }); // If author is not in access list, checks if roles they have are.
    if (canAccess) {
        const ping = message.content.split(' ').length == 2 ? `<@${message.content.split(' ')[1]}> ` : ''; // Allows for an optional ping with the message.
        message.channel.send(`${ping}${str}`);
    }
    message.delete();
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