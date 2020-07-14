const Discord = require("discord.js");
const config = require("../config.json");

module.exports = async(client, message) => {
    client.setTimeout(async() => {
        if (!message.deleted) {
            if (message.author.bot) return; // This will prevent bots from using the bot. Lovely!

            if (!message.guild) { // Comic relief for those who decide to DM the bot.
                message.channel.send("No u")
                return
            }
            if (message.channel.id == '688434522072809500') { //#looking-for-game
                client.commands.get('lfg').run(client, message)
            } else if (message.channel.id == '687539638168059956' || message.channel.id == '679429025445445643') { //#bunker-bot-commands and #dev
                if (message.content.indexOf(`${config.prefix}info`) == 0) {
                    client.commands.get('info').run(client, message)
                } else if (message.content.indexOf(`${config.prefix}lfg`) == 0) {
                    client.commands.get('lfg').run(client, message)
                }
            } else if (message.channel.id == '710454866002313248') { //#trading-board
                if (message.content.indexOf('https://krunker.io/social.html?=p=profile&q=') < 0 && !message.attachments) {
                    message.channel.send(`<@${message.author.id}> All trades require an inventory screenshot with the username visible, or a link to your account. \n I'm an LFG bot, I shouldn't be telling you this.`);
                    message.delete();
                }
            }
        }
    }, 1 * 1000);
};