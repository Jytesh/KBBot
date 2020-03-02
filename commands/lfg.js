const {MessageEmbed} = require("discord.js")
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
            let eb = new MessageEmbed()
                .setTitle(message.author.username + ' is looking to party! :tada:')
                .setDescription(description)
                .setAuthor(message.author.username + ' (' + message.author.tag + ')', message.author.displayAvatarURL)
                .addField('Link: ', link)
                .setFooter('KrunkerLFG')
                .setTimestamp()
            if(link.indexOf("https://krunker.io/?game=") == 0) {
                await getLinkInfo(link).then(game => {
                    channel = getChannel(link)
                    eb.setColor(game.color)
                        .addField('Region: ', game.region, true)
                        .addField('Players: ', game.players, true)
                        .addField('Mode: ', game.mode.toUpperCase(), true)
                        .addField('Map: ', game.map, true)
                    if(game.custom) {
                        eb.addField('Custom? ', 'Yes', true)
                    }else {
                        eb.addField('Custom? ', 'No', true)
                    }
                    channel.send(eb)
                }).catch(error => {
                console.log(error)
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
    const client = require("../app").client
    if(link.includes('https://')) {
        link = link.split("=")[1].split(":")[0]

    }
    if(link=='NA' || link=='SV' || link=='MIA' || link=='NY') {
        return client.channels.get(NA)
    }else if(link == 'EU' || link == 'FRA') {
        return client.channels.get(EU)
    }else if(link == 'AS' || link == 'SIN' || link == 'TOK') {
        return client.channels.get(AS)
    }else if(link == 'OCE' || link == 'SYD') {
        return client.channels.get(OCE)
    }else {
        return -1
    }
}

function getLinkInfo(link){
    return new Promise((resolve, reject) =>{
        link = link.split("=")[1]
        
        if(!link)  return reject(new Error(false))
        else{
            
            const fetch = require("node-fetch")
            fetch(`https://matchmaker.krunker.io/game-info?game=${link}`).then(res => res.json())
            .then(json => {
                //json = JSON.parse(body)
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
                
            }).catch(error => {
                console.log(error)
            return reject(utils.Error('404', err))})
        }
    })
}
module.exports.config = {
    name : "lfg",
    aliases : ["looking", "lf", "lfm"]
}
module.exports.help = {
    usage : `lfg <link> [message]`, //Example usage of command
    User : 2, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `Creates an LFG posting with <link> and [message].` //Description to come when you use config.prefix help <command name>
}