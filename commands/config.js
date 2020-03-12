//Require basic classes
const {MessageEmbed} = require("discord.js")
const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")
const db = require("../json.db")

module.exports.run = async(client,message)=>{
    const gid = message.guild.id
    if(message.member.permissions.has("MANAGE_SERVER")|| await roleCheck(message.member.roles,gid)){ 
        let prefix = await db.prefix(gid)
        fullcommand = message.content.substring(prefix.length)
        splitCommand = fullcommand.split(" ")
        command = splitCommand.shift()
        c = splitCommand.shift()
        args = splitCommand
        
        if(!c) {
            embed = utils.embed("Config Window","`config [config-id] [arguments]`","GOLD")
            embed.addField("Prefix","Config ID: `1`\n*1 Argument taken\n*Used to change prefix")
            embed.addField("Channel","Config ID: `2`\n*2 Arguments taken\n*Used to change the LFG Channel\n`config 2 <#Channel_Mention> <REGION>`\n*Valid regions are \n> `NA`\n> `EU`\n> `OCE`\n> `AS`\n> `RNK` for ranked-channel")
            embed.addField("Role","Config ID: `3`\n*Upto 10 arguments\n*All arguments should be role mentions, or role IDs.\n*Used to add roles to bot-commander(Can use config command)")

            message.channel.send(embed)
            return;
        }
        switch(c) {
            case "1": //Prefix
                if(args.length == 0) {
                    utils.Error(message,"100")
                }else {
                    oldPrefix = prefix
                    newPrefix = prefixParse(args.join(" "))
                    if(!args.join(" ").includes("`")){
                    utils.setPrefix(gid,newPrefix)
                    let eb = new MessageEmbed()
                        .setTitle('Success!')
                        .setFooter('KrunkerLFG')
                        .setTimestamp()
                        .setColor("GREEN")
                        .setDescription('Changed prefix from **' + oldPrefix + '** to **' + newPrefix + '**')
                    message.channel.send(eb)
                }else{
                    utils.ErrorMsg(message,"Prefix can't contain \\\``\`")
                }} 
                break;
            case "2": //Set Region
                let args = message.content.split(' ')
                command = args.shift()
                c = args.shift()
                if(args.length != 2) {
                    utils.Error(message,"100")
                    return
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
                            utils.setNA(gid,id)
                            break
                        case 'OCE':
                            utils.setOCE(gid,id)
                            break
                        case 'EU':
                            utils.setEU(gid,id)
                            break
                        case 'AS':
                            utils.setAS(gid,id)
                            break
                        case 'RNK':
                            utils.setRNK(gid,id)
                    }
                    
                    message.channel.send(eb)
                    return
                }
            case "3":
                let roles = message.mentions.roles.keyArray()
                roles_ = args.join(" ").replace("<@&","").replace(">","").split(" ")
                roles__ = new Set(roles.concat(roles_)) //Prevents duplication
                roles___ = await db.get(gid,"C_ROLES")
                arr = Array.from(roles__)
                arr_= roles___.filter(value => arr.includes(value))
                arr.concat(roles___)
                if(arr_){
                    for(el in arr_){
                        delete arr[el]
                    }
                }
                array = await db.set(message.guild.id,{"C_ROLES":arr})
                let eb
                if(typeof array.key.C_ROLES[0] === "string"){
                    eb = new MessageEmbed()
                        .setTitle('Sucessfully set ')
                        .setFooter('KrunkerLFG')
                        .setTimestamp()
                        .setColor(0x49C4EF)
                        .setDescription("New list of roles allowed to use `config`\n> <@&"+array.key.C_ROLES.join(">\n> <@&")+">")

                }else{
                    eb = new MessageEmbed()
                        .setTitle('Sucessfully removed all roles from using config command.**Anyone can use the config commands now**')
                        .setFooter('KrunkerLFG')
                        .setTimestamp()
                        .setColor("RED")
                }
                return message.channel.send(eb)
            default:   
                console.log("Invalid Config")
                return utils.Error(message,100)
        }
    }else{
        return utils.Error(message,200)
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
        case 'RNK':
            return true
        default:
            return false
    }
}
function prefixParse(text){
    if(text.includes("`")) return "-"
    else return text
}

async function roleCheck(roles,id){
    roles_ = await db.get(id,"C_ROLES")
    if(!roles_) return true
    else if(roles_){
        roles = roles.cache.keyArray()
        for(role of roles){
            for(role_ of roles_){
                if(role == role_) return true
            }
        }
        return false
    }
}
module.exports.config = {
    name: "config",
    aliases: ["cnfg", "cnf"],
    type: "Staff"
}
module.exports.help = {
    usage : `config 1`, //Example usage of command
    User : 0, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : 'Use for changing settings of bot such as prefix. Do config with no arguments to get detailed guide.' //Description to come when you use config.prefix help <command name>
}