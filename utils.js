const {RichEmbed} = require("discord.js")
channels = {
    NA : "678830555764228125",
    EU : "678830571547262976",
    OCE : "678830581512929331",
    AS : "678830592946602002"
}
module.exports = {
    channels,
    ErrorMsg : function(m,text){
        const embed = new RichEmbed()
        .setTitle("Error!")
        .setColor("RED")
        .setDescription(text)
        .setFooter(m.author.id)
        .setTimestamp()

    m.channel.send(embed).then(mess=>
        mess.delete(10000)
    )

    }
}