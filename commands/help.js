//Require basic classes
const {Client,MessageEmbed} = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

module.exports.run = (client,message)=>{
    let fullCommand = message.content.substr(config.prefix.length) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the com
    if(arguments.length == 0){
        const eb = new MessageEmbed()
            .setTitle("Help:")
            .setAuthor(client.user.username, client.user.displayAvatarURL, 'https://discordapp.com/api/oauth2/authorize?client_id=678674368783450119&permissions=387136&scope=bot')
            .setColor("BLURPLE")
            .setDescription('Note: *<>* signify required fields and *[]* signify optional fields.')
            .addField("Server Prefix", `**${config.prefix}**`)
            .addField("Utility", 
                `> **${config.prefix}` + client.commands.get('help').help.usage + `** \r\n > • ` + client.commands.get('help').help.description + ` \r\n` +
                `> **${config.prefix}` + client.commands.get('info').help.usage + `** \r\n > • ` + client.commands.get('info').help.description + ` \r\n` +
                `> **${config.prefix}` + client.commands.get('ping').help.usage + `** \r\n > • ` + client.commands.get('ping').help.description + ` \r\n` +
                `> **${config.prefix}` + client.commands.get('uptime').help.usage + `** \r\n > • ` + client.commands.get('uptime').help.description + ` \r\n`, false)
            .addField("General", 
                `> **${config.prefix}` + client.commands.get('lfg').help.usage + `** \r\n > • ` + client.commands.get('lfg').help.description + ` \r\n`, false)
            .addField("Staff",
                `> **${config.prefix}` + client.commands.get('prefix').help.usage + `** \r\n > • ` + client.commands.get('prefix').help.description + ` \r\n` +
                `> **${config.prefix}` + client.commands.get('set').help.usage + `** \r\n > • ` + client.commands.get('set').help.description + ` \r\n`, false)
            .setTimestamp()
            .setFooter("KrunkerLFG")
        message.channel.send(eb)
    }else if(arguments.length == 1){
        let arg = arguments[0]
        if(client.commands.has(arg)){
            
            command = client.commands.get(arg)
            
        }else{
            command = client.commands.get(client.aliases.get(arg))
        }
        if(command){
            let eb = new RichEmbed()
                .setTitle(command.config.name)
                .setDescription(command.help.description)
                .addField('**Usage:**', `\`${config.prefix}`+command.help.usage+"`")
                .addField('**Can be used by:**',utils.getuser(command.help.User))
                .setTimestamp()
                .setColor("BLURPLE")
                .setFooter("KrunkerLFG")
            
            message.channel.send(eb)
        }else{
            utils.ErrorMsg(m,`Module not found.Try ${config.prefix}help for list of all modules`)
        }

    }
}
module.exports.config = {
    name: "help",
    aliases: ["h", "hlp","wlp","welp","ifkingforgothowthebotworks"],
}
module.exports.help = {
    usage : `help [module]`, //Example usage of command
    User : 1, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `Provides usage for all commands/[module].` //Description to come when you use config.prefix help <command name>
}