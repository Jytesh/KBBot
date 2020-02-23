//Require basic classes
const {Client,RichEmbed} = require("discord.js")
const config = require("../config.json")
module.exports.run = (client,message)=>{
    ms = client.uptime
    seconds = ms/1000
    minutes = seconds/60
    hours = minutes/60
    let embed = new RichEmbed()
    .setTitle("I have been awake for: ")
    .addField("Milliseconds: ",ms)
    .addField("Seconds: ",seconds)
    .addField("Minutes: ",minutes)
    .addField("Hours: ",hours)
    .setFooter("Krunker LFG|")
    .setTimestamp()
    message.channel.send(embed)
}
module.exports.config = {
    name: "uptime",
    aliases: ["u", "up","HOWLONGUAWAKE"],
}
module.exports.help = {
    usage : `\`${config.prefix}uptime\``, //Example usage of command
    User : 2, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    Roles : ["679261891587080202"], //Bot dev role
    description : `${config.prefix}uptime lists the number of seconds, minutes and hours the bot has been up for.\n` //Description to come when you use config.prefix help <command name>
}