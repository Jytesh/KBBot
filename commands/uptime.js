//Require basic classes
const {Client,MessageEmbed} = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

const day = 86400000
const hour = 3600000
const minute = 60000
const second = 1000

module.exports.run = (client,message)=>{
    time = client.uptime
    let eb = new MessageEmbed()
        .setTitle("I have been awake for: ")
        .setColor("BLURPLE")
        .setFooter("KrunkerLFG")
        .setTimestamp()
    if(time/day > 1) {
        eb.setDescription((time/day).toFixed(2) + 'd')
    }else if(time/hour > 1) {
        eb.setDescription((time/hour).toFixed(2) + 'h')
    }else if(time/minute > 1) {
        eb.setDescription((time/minute).toFixed(2) + 'm')
    }else if(time/second > 1) {
        eb.setDescription((time/second).toFixed(2) + 's')
    }else {
        eb.setDescription(time + 'ms')
    }
    message.channel.send(eb)
}
module.exports.config = {
    name: "uptime",
    aliases: ["u", "up","HOWLONGUAWAKE"],
    type: "Utility"
}
module.exports.help = {
    usage : `uptime`, //Example usage of command
    User : 2, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    Roles : ["679261891587080202"], //Bot dev role
    description : `Provides uptime of bot.` //Description to come when you use prefix help <command name>
}