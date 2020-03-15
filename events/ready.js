const {MessageEmbed} = require("discord.js")
const client = require("../app.js").client
const config = require("../config.json")

module.exports = (client)=>{ 
    console.log("[Krunker Bunker Bot] ready to roll!")
    client.user.setActivity(`v${config.version}`,{type: "Playing"})
}