const RichEmbed = require("discord.js")
const config = require("../config.json")
module.exports.run = (client,message)=>{
    message.channel.send("Immature")
}
module.exports.config = {
    name: "fizi",
    aliases: ["fiz", "fizzi","fizy"],
}
module.exports.help = {
    usage : `${config.prefix}fizi`, //Example usage of command
    User : 0, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : 'Use to get description of the coolest wiki staff' //Description to come when you use config.prefix help <command name>
}