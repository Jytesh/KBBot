const {Client,RichEmbed} = require("discord.js")
const client = require("../app.js").client

module.exports = (client)=>{ 
    console.log("[Krunker Bunker Bot] Ready!")
    client.user.setActivity("jyt branch",{type: "WATCHING"})
    
}