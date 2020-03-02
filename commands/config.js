//Require basic classes
const {Client,RichEmbed} = require("discord.js")
const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")
const db = require("../json.db")
module.exports.run = async(client,message)=>{
    let prefix = await db.prefix(message.guild.id)
    fullcommand = message.content.substring(prefix.length)
    splitCommand = fullcommand.split(" ")
    command = splitCommand.shift()
    c = splitCommand.shift()
    args = splitCommand
    
    if(!c) {
        embed = utils.embed("Config Window","`config [config-id] [arguments]`","GOLD")
        embed.addField("Prefix","Config ID: `1`\n*1 Argument taken\n*Used to change prefix",true)
        embed.addField("Channel","Config ID: `2`\n*2 Arguments taken\n*Used to change the LFG Channel\n`config 1 <#Channel_Mention> <REGION>`\n*Valid regions are \n> `NA`\n> `EU`\n> `OCE`\n> `AS`\n> `RNK` for ranked-channel",true)
        embed.addField("Role","Config ID: `3`\n*Upto 10 arguments\n*All arguments should be role mentions, or role IDs.\n*Used to add roles to bot-commander(Can use config command)",true)

        message.channel.send(embed)
        return;
    }
    switch(c){
        case 1: //Prefix
        {
            if(args.length != 1) {
                utils.Error(message,"100")
            }else {
                oldPrefix = prefix
                prefix = await db.set(message.guild.id,{"PREFIX" : args[0]}).PREFIX
                let eb = new MessageEmbed()
                    .setTitle('Success!')
                    .setFooter('KrunkerLFG')
                    .setTimestamp()
                    .setColor("GREEN")
                    .setDescription('Changed prefix from **' + oldPrefix + '** to **' + args[0] + '**')
                message.channel.send(eb)
            } 
            break;
        }
        default:{
            return utils.Error(message,100)
        }
        
    }
}
module.exports.config = {
    name: "config",
    aliases: ["cnfg", "cnf"],
}
module.exports.help = {
    usage : `config 1`, //Example usage of command
    User : 0, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : 'use when sidney has kidnapped you' //Description to come when you use config.prefix help <command name>
}