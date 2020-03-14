//Require basic classes
const {Client,MessageEmbed} = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

module.exports.run = (client,message)=>{
    message.channel.send("No");
}

module.exports.config = {
    name: "update?",
    aliases: ["update"],
}

module.exports.help = {
    usage : `\`update\``, //Example usage of command
    User : 0, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `Shhh you found a hidden command` //Description to come when you use prefix help <command name>
}