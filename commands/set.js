const {Client,RichEmbed} = require("discord.js")
const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

module.exports.run = (client,message)=>{
    let args = message.content.substring(config.prefix.length).split(' ')
    command = args.shift()
    
    if(args.length != 2) {
        utils.Error(message,"100")
    }else {
        var id
        var region
        if(isChannel(args[0], message) && isRegion(args[1])) {
            id = args[0].substring(args[0].indexOf('<#') + 2, args[0].indexOf('>'))
            region = args[1]
        }else if(isChannel(args[1], message) && isRegion(args[0])) {
            id = args[0].substring(args[0].indexOf('<#') + 2, args[0].indexOf('>'))
            region = args[1]
        }else {
            utils.Error(message,"100")
            return
        }

        console.log(region)
        console.log(id)

        region = region.toUpperCase()
        switch(region) {
            case 'NA':
                utils.region.NA = id
                break
            case 'OCE':
                utils.region.OCE = id
                message.channel.send('poopoo')
                break
            case 'EU':
                utils.region.EU = id
                break
            case 'AS':
                utils.region.AS = id
                break

        }
    }
}
module.exports.config = {
    name: "set",
    aliases: ["setChannel"],
}
module.exports.help = {
    usage : `${config.prefix}set`, //Example usage of command
    User : 3, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `**${config.prefix}set** sets given channel as default LFG channel for given region.\n` //Description to come when you use config.prefix help <command name>
}

function isChannel(arg, message) {
    if(arg.includes('<#') && arg.includes('>') && arg.indexOf('<#') < arg.indexOf('>')) {
        let id = arg.substring(arg.indexOf('<#') + 2, arg.indexOf('>'))
        if(message.guild.channels.has(id)) {
            return true
        }else {
            return false
        }
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