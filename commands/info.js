//Require basic classes
const {MessageEmbed} = require("discord.js")
const config = require("../config.json")

const day = 86400000
const hour = 3600000
const minute = 60000
const second = 1000

module.exports.run = (client,message)=>{
    const eb = new MessageEmbed()
		.setTitle('Info:')
		.setAuthor(client.user.username, client.user.displayAvatarURL, 'https://discordapp.com/api/oauth2/authorize?client_id=678674368783450119&permissions=387136&scope=bot')
        .setColor("BLURPLE")
		.setDescription('KrunkerLFG is an LFG bot designed for the online FPS game, krunker.io.')
		.addField('Version:', `**${config.version}**`, true)
		.addField('Ping: ', `${client.ws.ping}ms`, true)
		.setTimestamp()
		.setFooter('KrunkerLFG'+" | Coming to get you.");

	time = client.uptime
	if(time/day > 1) {
		eb.addField((time/day).toFixed(2) + 'd', true)
	}else if(time/hour > 1) {
		eb.addField((time/hour).toFixed(2) + 'h', true)
	}else if(time/minute > 1) {
		eb.addField((time/minute).toFixed(2) + 'm', true)
	}else if(time/second > 1) {
		eb.addField((time/second).toFixed(2) + 's', true)
	}else {
		eb.addField(time + 'ms')
	}
    message.channel.send(eb)
}

module.exports.config = {
    name: "info",
	aliases: ["i", "inf","?","information",],
	type: "Utility"
}
module.exports.help = {
    usage : `info`, //Example usage of command
    User : 1, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `Provides bot info.` //Description to come when you use config.prefix help <command name>
}