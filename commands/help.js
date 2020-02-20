//Require basic classes
const {Client,RichEmbed} = require("discord.js")
const config = require("../config.json")
module.exports.run = (client,message)=>{
    let fullCommand = message.content.substr(config.prefix.length) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the com
    if(arguments.length == 0){
    const eb = new RichEmbed()
        .setTitle("Help:")
		.setAuthor(client.user.username, client.user.displayAvatarURL, 'https://discordapp.com/api/oauth2/authorize?client_id=678674368783450119&permissions=387136&scope=bot')
        .setColor(0x49C4EF)
        .addField("Utility", "> **-info** \r\n > • Provides bot info. " +
            "\r\n > **-help** \r\n > • Provides list of commands and how to use them.", false)
        .addField("General", "> **-lfg <link> <optional message>** \r\n > • Creates an LFG posting with <link> and <message>.", false)
        .setTimestamp()
        .setFooter("KrunkerLFG")
    message.channel.send(eb)
    }else if(arguments.length == 1){
        arg = arguments[0]

    }
}
module.exports.config = {
    name: "help",
    aliases: ["h", "hlp","wlp","welp","ifkingforgothowthebotworks"],
}
module.exports.help = {
    usage : `\`${config.prefix}help <module>\``, //Example usage of command
    User : 0, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `${config.prefix}help lists all available modules.\n \`${config.prefix}help <module-name>\`\nLists the module help` //Description to come when you use config.prefix help <command name>
}