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

        if((link.includes('?party=') && link.split("=")[1].length != 6) || (!link.includes('https://krunker.io/') && !(link == "NA" || link == "OCE" || link == "AS" || link == "EU" || link == "SV" || link == "MIA" || link == "NY" || link != "FRA" || link == "SYD" || link == "SIN" || link == "TOK"))) {
            utils.ErrorMsg(message,"Invalid Region/Link\nError Code: 100")
        }else {
            var channel
            if(!link.includes('?party=')) {
                channel = getChannel(link)
            }
            const eb = new Discord.RichEmbed()
                .setTitle(message.member.displayName + ' is looking to party! :tada:')
                .setAuthor(message.member.displayName + ' (' + message.author.tag + ')', message.author.displayAvatarURL)
                .setTimestamp()
                .setFooter('KrunkerLFG');

            if(link.includes('?game=')) {
                getLinkInfo(link).then(game =>{
                    eb.setColor(game.colour)
                        .addField('Link: ', link, false)
                        .addField('Mode: ', game.mode, true)
                        .addField('Map: ', game.map, true)
                        .addField("Players: ", game.players, false);                        
                    if(game.custom) {
                        eb.addField("Custom? ", "Yes", true);
                    }else {
                        eb.addField("Custom? ", "No", true);
                    }
                }).catch(e =>{
                    utils.ErrorMsg(message,"Invalid server link provided\nError Code : 404");
                });
            }else if(link.includes('?party=')) {
                if(args.length == 0 || (!(args[0] == "NA" || args[0] == "OCE" || args[0] == "AS" || args[0] == "EU" || args[0] == "SV" || args[0] == "MIA" || args[0] == "NY" || args[0] != "FRA" || args[0] == "SYD" || args[0] == "SIN" || args[0] == "TOK"))) {
                    utils.ErrorMsg(message,"Invalid Region/Link\nError Code: 102")
                }else {
                    channel = getChannel(args[0]);
                    const {ffa, tdm, ctf, point, party, other} = require("../utils").gamemodes
                    eb.setColor(party)
                        .addField('Link: ', link, false)
                        .addField('Region: ', args[0], false)
                    args.shift();
                }
            }else {
                eb.setColor('#fefefe')
                    .addField('Region:', link);
            }

            if(args.length >= 1) {
                eb.setDescription(args.join(' '));
            }
            channel.send(eb);
        }
    }
}

function getChannel(id,val){
    const client = require("../app.js").client
    const {NA,EU,OCE,AS} = require("../utils").channels
    if(val){
        link = id.split("=")[1]
        region = link.split(":")[0]
        id = region
    }
    if(id == "NA" || id == "NY" || id == "MIA" || id == "SV") {
        id = NA
    }else if(id == "EU" || id == "FRA") {
        id = EU
    }else if(id == "OCE"|| id == "SYD") {
        id = OCE
    }else if(id == "AS" ||id == "SIN" || id == "TOK") {
        id = AS
    }else {
        return false
    }
    return client.channels.get(id)
}

function getLinkInfo(link){
    return new Promise((resolve, reject) =>{
        link = link.split("=")[1]
        if(!link) {
            return false;
        }else {
            const request = require("request")
            request({uri:`https://matchmaker.krunker.io/game-info?game=${link}`}, (err, res, json) =>{
                json = JSON.parse(json)
                if(err || json.error){
                    return reject("404",err)
                }else {
                    let tempMode = json[4].i.split("_")[0];
                    let tempColour
                    const {ffa, tdm, ctf, point, party, other} = require("../utils").gamemodes
                    switch(tempMode) {
                        case "ffa":
                            tempColour = ffa;
                            break;
                        case "tdm":
                            tempColour = tdm;
                            break;
                        case "ctf":
                            tempColour = ctf;
                            break;
                        case "point":
                            tempColour = point;
                            break;
                        default:
                            tempColour = other;
                            break;
                    }
                    const game = {
                        region : json[0].split(":")[0],
                        players: `${json[2]}/${json[3]}`,
                        mode:json[4].i.split("_")[0],
                        map: json[4].i.split("_")[1],
                        colour: tempColour,
                        custom: json[4].cs
                    }
                    return resolve(game)
                }
            })
        }
    })
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