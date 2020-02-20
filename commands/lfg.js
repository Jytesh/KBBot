const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

const {NA,EU,OCE,AS} = require("../utils.js").channels
module.exports.run = async(client,message)=>{
        var args = message.content.substring(1).split(' ');
    
        if(args.length < 2) {
            message.channel.send('Error. Invalid use of command. Please refer to `$help` for assistance.');
        }else {
            var cmd = args[0];
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
                    .setTitle(random(message.author.username))
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
function random(tempUser) {
        var num = Math.floor(Math.random()*8);
        let string
        switch(num) {
            case 0:
                string =tempUser + ' is here to stomp some Guests.';
                break; 
            case 1:
                string =tempUser + ' is here to flex their skins.';
                break;
            case 2:
                string ='Omg ' + tempUser + ' Is UsIng hAcks. rEpOrtEd.';
                break;
            case 3:
                string ='Krunker? Never heard of it.';
                break;
            case 4:
                string ='Knowledge is knowing a tomato is a fruit; Wisdom is not putting ' + tempUser + ' in a fruit salad.';
                break;
            case 5:
                string ='If being ' + tempUser + ' is a crime, then arrest me.'
                break;
            case 6:
                string ='A bus station is where a bus stops. A train station is where a train stops. On ' + tempUser + '\'s desk, I have a work station..';
                break;
            case 7:
                string ='Politicians and diapers have one thing in common. ' + tempUser + ' should change them both regularly, and for the same reason.';
                break;
        }
        return string
    }
function getChannel(id,val){
    const client = require("../app.js").client
    const {NA,EU,OCE,AS} = require("../utils").channels
    if(val){
        link = id.split("=")[1]
        region = link.split(":")[0]
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
            custom: json[4].cs
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