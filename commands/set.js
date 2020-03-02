const {Client,MessageEmbed} = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

module.exports.run = (client,message)=>{
    let args = message.content.split(' ')
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

        region = region.toUpperCase()

        let eb = new MessageEmbed()
            .setTitle('Sucessfully set ')
            .setFooter('KrunkerLFG')
            .setTimestamp()
            .setColor(0x49C4EF)
            .setDescription('<#' + id + '> as LFG channel for ' + region)
        
        switch(region) {
            case 'NA':
                utils.setNA(id)
                break
            case 'OCE':
                utils.setOCE(id)
                break
            case 'EU':
                utils.setEU(id)
                break
            case 'AS':
                utils.setAS(id)
                break
        }
        
        message.channel.send(eb)
    }
}


function isChannel(arg, message) {
    if(arg.includes('<#') && arg.includes('>') && arg.indexOf('<#') < arg.indexOf('>')) {
        let id = arg.substring(arg.indexOf('<#') + 2, arg.indexOf('>'))
        if(message.guild.channels.cache.has(id)) {
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
module.exports.config = {
    name: "set",
    aliases: ["setChannel"],
}
module.exports.help = {
    usage : `set <channel> <region>`, //Example usage of command
    User : 3, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `Sets <channel> as the default LFG channel for <region>.` //Description to come when you use config.prefix help <command name>
}