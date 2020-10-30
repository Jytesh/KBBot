//Require basic classes
const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

const day = 86400000
const hour = 3600000
const minute = 60000
const second = 1000

module.exports.run = (client, message) => {
    const eb = new MessageEmbed()
        .setTitle('Info:')
        .setAuthor(client.user.username, client.user.displayAvatarURL, 'https://discordapp.com/api/oauth2/authorize?client_id=678674368783450119&permissions=387136&scope=bot')
        .setColor("BLURPLE")
        .setDescription('KrunkerLFG is an LFG bot designed for the online FPS game, krunker.io.')
        .addField('Version:', `**${config.version}**`, true)
        .addField('Ping: ', `${client.ws.ping}ms`, true)
        .setTimestamp()
        .setFooter('KrunkerLFG' + " | Coming to get you.");

    time = client.uptime
    if (time / day > 1) {
        eb.addField('Uptime', (time / day).toFixed(2) + 'd', true)
    } else if (time / hour > 1) {
        eb.addField('Uptime', (time / hour).toFixed(2) + 'h', true)
    } else if (time / minute > 1) {
        eb.addField('Uptime', (time / minute).toFixed(2) + 'm', true)
    } else if (time / second > 1) {
        eb.addField('Uptime', (time / second).toFixed(2) + 's', true)
    } else {
        eb.addField(time + 'ms')
    }
    message.channel.send(eb)
}

module.exports.config = {
    name: "info",
}