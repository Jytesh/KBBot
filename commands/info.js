//This is how a command's structure should be, else JJ has fucked up.


//Require basic classes
const {Client,RichEmbed} = require("discord.js")
const config = require("../config.json")

module.exports.run = (client,message)=>{
    const eb = new RichEmbed()
		.setTitle('Info:')
		.setAuthor(client.user.tag, null, client.user.displayAvatarURL)
        .setColor(0x49C4EF)
		.setDescription('KrunkerLFG is an LFG bot designed for the online FPS game, krunker.io.')
		.addField('Version:', `**${config.version}**`, true)
		.addField('Creator:', '**JJ_G4M3R & Jytesh**', true)
		.addField('Invite:', 'https://discordapp.com/api/oauth2/authorize?client_id=678674368783450119&permissions=387136&scope=bot')
		.addField('Support Server:', 'https://discord.gg/yzEKS2X', false)
		.setTimestamp()
		.setFooter('KrunkerLFG');
    message.channel.send(eb)
    }

module.exports.config = {
        name: "info",
        aliases: ["i", "inf","?","information",],
    }
module.exports.help = {
        usage : `\`${config.prefix}info\``, //Example usage of command
        User : 0, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
        description : `info lists all the info about the bot.` //Description to come when you use config.prefix help <command name>
    }