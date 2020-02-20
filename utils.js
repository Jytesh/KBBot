const {RichEmbed} = require("discord.js")
channels = {
    NA : "678830555764228125",
    EU : "678830571547262976",
    OCE : "678830581512929331",
    AS : "678830592946602002"
}
gamemodes = {
    ffa: 0x66de5b,
    tdm: 0x45e6e3,
    ctf: 0xd13c2e,
    point: 0xba4911,
    party: 0x3611ba,
    other: 0xa8114b
}
module.exports = {
    channels,
    ErrorMsg : function(m,text){
        const embed = new RichEmbed()
            .setTitle("Error!")
            .setColor("RED")
            .setDescription(text +" \n Try `$help`")
            .setFooter("Krunker LFG |ID :"+m.author.id)
            .setTimestamp()

        m.channel.send(embed).then(mess=>
            mess.delete(10000)
        )
    }
}
var autodel = false;