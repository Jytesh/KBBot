const Discord = require("discord.js");
const config = require("../config.json");

var lastTime = new Date().getTime();

module.exports = async(client, message) => {
    client.setTimeout(async() => {
        if (!message.deleted) {
            if (message.author.bot) return; // This will prevent bots from using the bot. Lovely!

            if (!message.guild) return; // This will prevent the bot from responding to DMs. Lovely!

            if (message.channel.id == '688434522072809500') { //#looking-for-game
                // client.commands.get('lfg').run(client, message)
            } else if (message.channel.id == '687539638168059956' || message.channel.id == '679429025445445643') { //#bunker-bot-commands and #dev
                if (message.content.indexOf(`${config.prefix}info`) == 0) {
                    client.commands.get('info').run(client, message)
                } else if (message.content.indexOf(`${config.prefix}lfg`) == 0) {
                    client.commands.get('lfg').run(client, message)
                }
            } else if (message.channel.id == '710454866002313248' && !message.member.roles.cache.has('692870902005629041') && !message.member.roles.cache.has('448207247215165451')) { //#trading-board
                if (message.content.indexOf('https://krunker.io/social.html?p=profile&q=') < 0 && message.attachments.size == 0) {
                    message.channel.send(`<@${message.author.id}> All trades require an inventory screenshot with the username visible, or a link to your account. \n *This is an automated message.*`);
                    message.delete();
                }
            } else if (message.channel.id == '604386199976673291') { //#market-chat
                if (message.content.indexOf('trad') >= 0 && new Date().getTime() - lastTime > 120000) {
                    message.channel.send('Trade/Trading? Make sure you are in the right channel. \n - <#604386199976673291> is for trade advice \n - <#710454866002313248> is for trade listings. \n *This is an automated message.*')
                    lastTime = new Date().getTime();
                }
            }
        }
    }, 1 * 1000);
};