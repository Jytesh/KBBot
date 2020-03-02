//Require basic classes
const {MessageEmbed} = require("discord.js")
const db = require("../json.db")
const config = require("../config.json")
const utils = require("../utils")

module.exports.run = async (client,message)=>{
    let prefix = await db.prefix(message.guild.id)
    let args = message.content.substring(prefix.length).split(' ')
    command = args.shift()
    
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
}
module.exports.config = {
    name: "prefix",
    aliases: ["setPrefix"],
}
module.exports.help = {
    usage : `prefix <prefix>`, //Example usage of command
    User : 3, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : 'Sets <prefix> as the new bot prefix for the server.' //Description to come when you use config.prefix help <command name>
}