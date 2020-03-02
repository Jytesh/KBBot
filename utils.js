const {MessageEmbed} = require("discord.js")
const Discord = require("discord.js")
const config = require("./config.json")

channels = {
    NA : "678830555764228125",
    EU : "678830571547262976",
    OCE : "678830581512929331",
    AS : "678830592946602002",
    RNK : "681049997885833239"
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
    gamemodes,
    ErrorMsg : function(message,text){
        const eb = new MessageEmbed()
            .setTitle("Error!")
            .setColor("RED")
            .setDescription(text +` \n Try \`${config.prefix}help\``)
            .setFooter("Krunker LFG • ID :"+message.author.id)
            .setTimestamp()

        message.channel.send(eb)
    },
    embed : function(m,text,color){
        if(!color) color = "BLURPLE"
        let eb = new MessageEmbed()

        .setDescription(text)
        .setColor(color)
        .setTimestamp()
        .setFooter("Krunker LFG")

        m.channel.send(eb)
    },
    getuser : (id)=>{
        if(id == "0") return "Everyone"
        if(id == "1") return "Select Roles"
        if(id == "2") return "Moderators"
        if(id == "3") return "Admins"
    },
    Error : function(m,id){
        console.log("Error: "+id)
        let error = errors.find(e => e.id == id)
        if(!error) return
        this.ErrorMsg(m,error.text,error.id,"RED")
    },
    CheckRole(member,roles){
        let ret = false
        for(role in roles){
            ret = member.roles.has(role.id)
        }
        return ret
    },
}