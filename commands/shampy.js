//Require basic classes
const {Client,MessageEmbed} = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

module.exports.run = (client,message)=>{
    message.channel.send("haiii");
}

module.exports.config = {
    name: "shampy",
    aliases: ["shamps"],
}

module.exports.help = {
    usage : `\`shampy\``, //Example usage of command
    User : 0, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `Shhh you found the hidden command` //Description to come when you use prefix help <command name>
}