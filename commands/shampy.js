const RichEmbed = require("discord.js")
const config = require("../config.json")
var spam = 3;

module.exports.run = (client,message)=>{
    let str = 'ha'
    for(i = 0; i < spam; i++) {
        str += 'i';
    }
    spam++;
    if(spam == 0) {
        spam = 3;
    }
    message.channel.send(str + ' ' + message.author.username)
}
module.exports.config = {
    name: "shampy",
    aliases: ["shamps"],
}
module.exports.help = {
    usage : `${config.prefix}fizi`, //Example usage of command
    User : 0, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : 'Use to get description of the coolest wiki staff' //Description to come when you use config.prefix help <command name>
}