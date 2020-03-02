//Require basic classes
const {Client,RichEmbed} = require("discord.js")
const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

module.exports.run = (client,message)=>{
    let args = message.content.substring(config.prefix.length).split(' ')
    command = args.shift()

    if(args.length != 1) {
        utils.Error(message,"100")
    }else {
        let oldPrefix = config.prefix
        config.prefix = args[0]
        let eb = new Discord.RichEmbed()
            .setTitle('Success!')
            .setFooter('KrunkerLFG')
            .setTimestamp()
            .setColor(0x49C4EF)
            .setDescription('Changed prefix from **' + oldPrefix + '** to **' + args[0] + '**')
        message.channel.send(eb)
    }
}
module.exports.config = {
    name: "prefix",
    aliases: ["setPrefix"],
}
module.exports.help = {
    usage : `prefix`, //Example usage of command
    User : 3, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : 'Sets <prefix> as the new bot prefix for the server.' //Description to come when you use config.prefix help <command name>
}