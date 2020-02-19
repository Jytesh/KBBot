const RichEmbed = require("discord.js")
const config = require("../config.json")
module.exports.run = (client,message)=>{
    message.channel.send('Hello my beautiful Shampy, ' +
    '\r\n\r\nI saw your profile and figured id try writing you. i can\'t disrespect a girl. It\'s not in me. I\'m a gentleman. Quite honestly, It sure surprised me to see you on here. I just have a hard time seeing someone who could easilly be a model having trouble meeting someone. Im not trying to give you a line, you really are astoundingly beautiful to me. It would be a pleasure and a priviledge getting to know you. I\'d love to find out if you are as beautiful inside as you are out.' +
    '\r\n\r\nHope to hear from you soon, ' + message.author.username)
}
module.exports.config = {
    name: "simp",
    aliases: ["simpnation"],
}
module.exports.help = {
    usage : `${config.prefix}fizi`, //Example usage of command
    User : 0, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : 'Use to get description of the coolest wiki staff' //Description to come when you use config.prefix help <command name>
}