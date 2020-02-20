const {RichEmbed} = require("discord.js")
const Discord = require("discord.js")
channels = {
    NA : "678830555764228125",
    EU : "678830571547262976",
    OCE : "678830581512929331",
    AS : "678830592946602002"
}
gamemodes = {
    ffa: '#66de5b',
    tdm: '#45e6e3',
    ctf: '#d13c2e',
    point: '#ba4911',
    party: '#3611ba',
    other: '#a8114b'
}
const errors = new Discord.Collection()
//Error Loading
require("fs").readdir("./errors", (err, files) => { 
    if(err) console.error(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        return console.log("[KB Bot] There aren't any commands!"); //JJ has fucked up
    }
    jsfile.forEach((f, i) => {
      let pull = require(`./errors/${f}`)
      errors.set(pull.id,pull)
      })
    });
var autodel = false;
module.exports = {
    channels,
    ErrorMsg : function(m,text){
        const embed = new RichEmbed()
            .setTitle("Error!")
            .setColor("RED")
            .setDescription(text +" \n Try `$help`")
            .setFooter("Krunker LFG |ID :"+m.author.id)
            .setTimestamp()

        m.channel.send(embed)
    },
    embed : function(m,text,color){
        if(!color) color = "BLURPLE"
        let embed = new RichEmbed()

        .setDescription(text)
        .setColor(color)
        .setTimestamp()
        .setFooter("Krunker LFG|")

        m.channel.send(embed)
    },
    Error : function(m,id){
        let error = errors.get(id)
        if(!error) return
        this.ErrorMsg(m,error.text,error.id,"RED")
    },
    gamemodes
}
