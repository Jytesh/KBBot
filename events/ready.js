const {Client,RichEmbed} = require("discord.js")
const client = require("../index.js").client

module.exports = (client)=>{ 
    console.log("[Krunker Bunker Bot] Ready!")
    client.user.setActivity("Jytesh make me",{type: "WATCHING"})
    
}