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
            if(message.channel.id == '688434522072809500' || message.channel.id == '687539638168059956') {
                lfg.run(client, message)
            }
            
        }
    }, 1*1000);
};
