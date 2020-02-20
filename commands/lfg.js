const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

const {NA,EU,OCE,AS} = require("../utils.js").channels
module.exports.old = async(client,message)=>{
        var args = message.content.substring(1).split(' ');
    
        if(args.length < 2) {
            message.channel.send('Error. Invalid use of command. Please refer to `$help` for assistance.');
        }else {
            var cmd = args.shift()
            args.shift();
            var link = args[0];
            args.shift();
    
            if(!link.includes('https://krunker.io/?game=')) {
                if(link == "NA" || link == "OCE" || link == "AS" || link == "EU"){
                    channel = getChannel(link)
                    if(channel === false){
                        utils.ErrorMsg(message,"Invalid Region\nError Code: 101")
                    }else{
                    const embedLfg = new Discord.RichEmbed()
                    .setTitle(message.author.username + ' is looking for people.')
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .addField('Region:',link)
                    .setTimestamp()
                    .setFooter('KrunkerLFG');
                if(args.length >= 1) {
                    embedLfg.setDescription(args.join(' '));
                }
                channel.send(embedLfg);
                }}else{
                    utils.ErrorMsg(message,"Invalid Region/Link\nError Code: 100")
                }
            }else {
                channel = getChannel(link,true)
                if(channel === false){
                    utils.ErrorMsg(message,"Invalid Region/Link\nError Code: 100")
                    return;
                }else{
                    getLinkInfo(link).then(game =>{
                    
                const embedLfg = new Discord.RichEmbed()
                    .setTitle("LFG")
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    .addField('Link: ', link,)
                    .addField('Map: ',game.map)
                    .addField("Players: ",game.players)
                    .addField("Custom?: ",game.custom)
                    .setTimestamp()
                    .setFooter('KrunkerLFG');
                if(args.length >= 1) {
                    embedLfg.setDescription(args.join(' '));
                }
                channel.send(embedLfg);
            }).catch(e =>{
                    utils.ErrorMsg(message,"Invalid server link provided\nError Code : 404")
            }
            )}
            }
        
        }
    }
module.exports.run = async(client,m)=>{
    let args = m.content.substring(config.prefix.length).split(' ')
    command = args.shift()
    if(args.length < 2){
        utils.Error(m,"100")
    }else{
        link = args.shift()
        if(args.length != 0){
            description = args.join(" ")
        }
        
        if(link.includes("https://krunker.io/?")){ //Checks if its a krunker game link
            let templink = link
            channel = getChannel(templink,true)
            let embed = new Discord.RichEmbed()
            .setTitle(m.author.tag + "is looking for a group")
            .setDescription(description)
            .setAuthor(m.author.tag,m.author.displayAvatarURL)
            .addField("Link: ",link,true)
            .setFooter("Krunker LFG|")
            .setTimestamp()
            if(link.includes("https://krunker.io/?game=")){
                let game = await getLinkInfo(link).catch(e=>utils.Error(m,"404"))
                if(game){
                embed.addField('Map: ',game.map)
                embed.addField("Players: ",game.players)
                embed.addField("Custom?: ",game.party)
                }
            }
            channel.send(embed)
        }else{
            utils.Error(m,"101") // Error for non-krunker links
            return
        }
    }
}
function getChannel(id,val){
    const client = require("../app.js").client
    const {NA,EU,OCE,AS} = require("../utils").channels
    if(val){
        
        let link1 = id.split("=")[1]
        region = link1.split(":")[0]
        id = region
    }
    if(id == "NA" || id == "NY" || id == "MIA" || id == "SV"){
        id = NA
    }else if(id == "EU" || id == "FRA"){
        id = EU
    }else if(id == "OCE"|| id == "SYD"){
        id = OCE
    }else if(id == "AS" ||id == "SIN" || id == "TOK"){
        id = AS
    }else return false
    return client.channels.get(id)
}
function getLinkInfo(link){
    return new Promise((resolve, reject) =>{
    link = link.split("=")[1]
    if(!link) return false;
    else{
        const request = require("request")
        console.log(`https://matchmaker.krunker.io/game-info?game=${link}`)
        request({uri:`https://matchmaker.krunker.io/game-info?game=${link}`}, (err, res, json) =>{
            json = JSON.parse(json)
        if(err || json.error){
            return reject("404",err)
        }
        else{
            
            
        const game = {
            region : json[0].split(":")[0],
            players: `${json[2]}/${json[3]}`,
            map: json[4].i.split("_")[1],
            party :json[4].cs,
        }
        return resolve(game)
        }})
    }})
}
module.exports.config = {
    name : "lfg",
    aliases : ["looking", "lf", "lfm"]
}
module.exports.help = {
    usage : `\`${config.prefix}lfg NA\``, //Example usage of command
    User : 1, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    Roles : ["678830128968499220"], //Guest role, the only role which can use this command
    description : `To look for groups` //Description to come when you use config.prefix help <command name>
}