const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

module.exports.run = (client,message)=>{
    let args = m.content.substring(config.prefix.length).split(' ')
    command = args.shift()
    console.log("<#123423424234>".substring(args[0].indexOf('<#') + 2, args[0].indexOf('>')))
    if(args.length != 2) {

    }else {
        if(args[0].includes('<#') && args[0].includes('>') && args[0].substring(args[0].indexOf('<#') + 2, args[0].indexOf('>'))) {
            
        }
    }
}
module.exports.config = {
    name: "set",
    aliases: ["setChannel"],
}
module.exports.help = {
    usage : `${config.prefix}set`, //Example usage of command
    User : 1, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `**${config.prefix}set** sets given channel as default LFG channel for given region.\n` //Description to come when you use config.prefix help <command name>
}