//This is how a command's structure should be, else JJ has fucked up.
//stfu Jyt

//Require basic classes
const {Client,RichEmbed} = require("discord.js")
const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

module.exports.run = (client,message)=>{
    //DO STUFF HERE
}
module.exports.config = {
    name: "MAIN_NAME",
    aliases: ["ALT_NAME_1", "ALT_NAME_2"],
}
module.exports.help = {
    usage : `${config.prefix}HELP ME`, //Example usage of command
    User : 0, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : 'use when sidney has kidnapped you' //Description to come when you use config.prefix help <command name>
}