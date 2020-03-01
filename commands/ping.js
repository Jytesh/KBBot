//Require basic classes
const {Client,RichEmbed} = require("discord.js")
const config = require("../config.json")
module.exports.run = (client,message)=>{
   ping = client.ping
    let eb = new RichEmbed()
        .setTitle("Ping!")
        .setDescription(ping + " ms")
        .setColor(0x49C4EF)
    message.channel.send(eb)
}
module.exports.config = {
    name: "ping",
    aliases: ["p", "pong","HOWUDELAY"],
}
module.exports.help = {
    usage : `\`${config.prefix}ping\``, //Example usage of command
    User : 1, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `**${config.prefix}ping** lists the ping of bot in ms.\n` //Description to come when you use config.prefix help <command name>
}