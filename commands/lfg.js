const {Client,RichEmbed} = require("discord.js")
const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

const {NA,EU,OCE,AS} = require("../utils.js").channels
const {ffa, tdm, ctf, point, party, other} = require('../utils.js').gamemodes

module.exports.run = async(client,message)=>{
    let args = message.content.substring(config.prefix.length).split(' ')
    let channel
    command = args.shift()
    if(args.length < 2){
        utils.Error(message,"100")
    }else{
        link = args.shift()
        if(args.length != 0){
            description = args.join(" ")
        }
        
        if(link.indexOf("https://krunker.io/?") == 0){ //Checks if its a krunker game link
            let eb = new Discord.RichEmbed()
                .setTitle(message.member.getDisplayName + ' is looking to party! :tata:')
                .setDescription(description)
                .setAuthor(message.member.getDisplayName + ' (' + message.author.tag + ')', message.author.displayAvatarURL)
                .setField('Link: ', link)
                .setFooter('KrunkerLFG')
                .setTimestamp()
            if(link.indexOf("https://krunker.io/?game=") == 0) {
                await getLinkInfo(link).then(game => {
                    channel = getChannel(link)
                    eb.setColor(game.color)
                        .addField('Region: ', game.region, false)
                        .addField('Mode: ', game.mode, true)
                        .addField('Map: ', game.map, true)
                        .addField('Players: ', game.players, false)
                    if(game.custom) {
                        eb.addField('Custom? ', 'Yes', true)
                    }else {
                        eb.addField('Custom? ', 'No', true)
                    }
                    channel.send(eb)
                }).catch(error => {
                    utils.Error(message, '404')
                })
            }else if(link.indexOf('https://krunker.io/?party=') == 0 && link.split('=')[1].length == 6) {
                if(getChannel(link) > 0) {
                    channel = getChannel(args[0])

                    eb.setColor(party)
                        .addField('Region: ' + args[0], false)

                    channel.message(eb);
                }else {
                    utils.Error(message, '102')
                }
            }
        }else{
            utils.Error(message,"101") // Error for non-krunker links
            return
        }
    }
}

function getChannel(link) {
    if(link.includes('https://')) {
        link = link.substring(link.indexOf('='), link.lastIndexOf(':'))
    }
    if(link.equals('NA') || link.equals('SV') || link.equals('MIA') || link.equals('NY')) {
        return NA
    }else if(link == 'EU' || link == 'FRA') {
        return EU
    }else if(link == 'AS' || link == 'SIN' || link == 'TOK') {
        return AS
    }else if(link == 'OCE' || link == 'SYD') {
        return OCE
    }else {
        return -1
    }
}

function getLinkInfo(link){
    return new Promise((resolve, reject) =>{
        link = link.split("=")[1]
        if(!link) throw new Error(false);
        else{
            const request = require("request")
            request({uri:`https://matchmaker.krunker.io/game-info?game=${link}`}, (err, res, json) =>{
                json = JSON.parse(json)
                if(err || json.error){
                    throw new Error('404', err)
                }
                else{
                let colour
                switch(json[0].split(':')[0]) {
                    case "ffa":
                        colour = ffa
                        break
                    case "tdm":
                        colour = tdm
                        break
                    case "ctf":
                        colour = ctf
                        break
                    case "point":
                        colour = point
                        break
                    default:
                        colour = other
                        break;
                }
                const game = {
                    region : json[0].split(":")[0],
                    players: `${json[2]}/${json[3]}`,
                    mode: json[4].i.split('_')[0],
                    map: json[4].i.split("_")[1],
                    party: json[4].cs,
                    color: colour
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
    usage : `${config.prefix}lfg NA`, //Example usage of command
    User : 2, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    Roles : ["678830128968499220"], //Guest role, the only role which can use this command
    description : `To look for groups` //Description to come when you use config.prefix help <command name>
}