//Require basic classes
const {Client,RichEmbed} = require("discord.js")
const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

module.exports.run = (client,message)=>{
    ping = client.ping
    let eb = new RichEmbed()
        .setTitle("Pong!")
        .setDescription(Math.round(ping) + " ms")
        .setFooter('KrunkerLFG')
        .setTimestamp()
        .setColor(0x49C4EF)
    message.channel.send(eb)
}
module.exports.config = {
    name: "ping",
    aliases: ["p", "pong","HOWUDELAY"],
}
module.exports.help = {
    usage : `ping`, //Example usage of command
    User : 1, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `Provides ping of bot.` //Description to come when you use config.prefix help <command name>
}