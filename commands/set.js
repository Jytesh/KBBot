const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

module.exports.run = (client,message)=>{
    let args = message.content.substring(config.prefix.length).split(' ')
    command = args.shift()
    
    if(args.length != 2) {
        //throw error: not enough parameters
    }else {
        var channelID
        var region
        if(isChannel(args[0]) && isRegion(args[1])) {
            channelID = args[0].substring(args[0].indexOf('<#') + 2, args[0].indexOf('>'))
            region = args[1]
        }else if(isChannel(args[1]) && isRegion(args[0])) {
            channelID = args[0].substring(args[0].indexOf('<#') + 2, args[0].indexOf('>'))
            region = args[1]
        }else {
            //throw error: invalid channel or region
        }

        if(channelID != null && region != null) {
            switch(region) {
                case 'NA':
                    utils.region.NA = channelID
                    break
                case 'OCE':
                    utils.region.OCE = channelID
                    break
                case 'EU':
                    utils.region.EU = channelID
                    break
                case 'AS':
                    utils.region.AS = channelID
                    break
            }
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

function isChannel(arg) {
    if(arg.includes('<#') && arg.includes('>') && arg.indexOf('<#') < arg.indexOf('>')) {
        let id = arg.substring(arg.indexOf('<#') + 2, arg.indexOf('>'))
        if(message.guild.channels.has(id)) {
            return true
        }
        return false
    }else {
        return false
    }
}

function isRegion(arg) {
    arg = arg.toUpperCase()
    switch(arg) {
        case 'NA':
            return true
        case 'OCE':
            return true
        case 'EU':
            return true
        case 'AS': 
            return true
        default:
            return false
    }
}