const Discord = require("discord.js");
const config = require("../config.json");

module.exports = async (client, message) => { 
    client.setTimeout(async() => {
        if(!message.deleted){ 
            if(message.author.bot) return; // This will prevent bots from using the bot. Lovely!

            if(!message.guild) { // Comic relief for those who decide to DM the bot.
                message.channel.send("No u")
                return
            }
            if(message.channel.id == '688434522072809500') { //#looking-for-game
                lfg.run(client, message)
            }else if(message.channel.id == '687539638168059956') { //#bunker-bot-commands
                if(message.content.indexOf(`${config.prefix}info`) == 0) {
                    info.run(client, message)
                }else if(message.content.indexOf(`${config.prefix}lfg`) == 0) {
                    lfg.run(client, message)
                }
            } 
            
        }
    }, 1*1000);
};
