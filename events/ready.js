const {MessageEmbed} = require("discord.js")
const client = require("../app.js").client

module.exports = (client)=>{ 
    console.log("[Krunker Bunker Bot] ready to roll!")
    client.user.setActivity("krunker.io",{type: "PLAYING"})
}