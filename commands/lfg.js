const {MessageEmbed} = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

const {NA,EU,OCE,AS,RNK} = require("../utils.js").channels
const {ffa, tdm, ctf, point, party, other} = require('../utils.js').gamemodes

module.exports.run = async(client,message)=>{
    let args = message.content.substring(config.prefix.length).split(' ')
    let channel
    command = args.shift()
    if(args.length < 2){
        utils.Error(message,"100")
    }else{
        link = args.shift()
        if(args.length > 0){
            description = args.join(" ")
        }
        
        if(link.indexOf("https://krunker.io/?") == 0){ //Checks if its a krunker game link
            let eb = new MessageEmbed()
                .setTitle(message.author.username + ' is looking to party! :tada:')
                .setDescription(description)
                .setAuthor(message.member.displayName + ' (' + message.author.tag + ')', message.author.displayAvatarURL)
                .addField('Link: ', link)
                .setFooter('KrunkerLFG')
                .setTimestamp()
            if(link.indexOf("https://krunker.io/?game=") == 0) {
                channel = await getChannel(link)
                if(channel != -1) {
                    await getLinkInfo(link,message).then(game => {
                        eb.setColor(game.color)
                            .addField('Region: ', game.region, true)
                            .addField('Players: ', game.players, true)
                            if(game.custom) {
                                eb.addField('Custom? ', 'Yes', true)
                            }else {
                                eb.addField('Custom? ', 'No', true)
                            }
                        eb.addField('Mode: ', game.mode.toUpperCase(), true)
                            .addField('Map: ', game.map, true)
                            
                        channel.send(eb)
                    }).catch(error => {
                        console.log(error)
                    })
                }else {
                    utils.Error(message, '103')
                }
            }else if(link.indexOf('https://krunker.io/?party=') == 0 && link.split('=')[1].length == 6) {
                channel = client.channels.get(RNK)

                eb.setColor(party)

                channel.send(eb)
            }
        }else{
            utils.Error(message,"101") // Error for non-krunker links
            return
        }
    }
}

async function getChannel(link) {
    const client = require("../app").client
    if(link.includes('https://krunker.io/')) {
        if(link.split('=')[1].includes(':')) {
            link = link.split("=")[1].split(":")[0]
            
        let channel
        if(link=='NA' || link=='SV' || link=='MIA' || link=='NY') {
             channel = await client.channels.fetch(NA)
        }else if(link == 'EU' || link == 'FRA') {
           channel = await client.channels.fetch(EU)
        }else if(link == 'AS' || link == 'SIN' || link == 'TOK') {
            channel = await client.channels.fetch(AS)
        }else if(link == 'OCE' || link == 'SYD') {
            channel = await client.channels.fetch(OCE)
        }else {
             return void 0
        }
        return channel
        }
    }
}

function getLinkInfo(link,message){
    return new Promise((resolve, reject) =>{
        link = link.split("=")[1]
        
        if(!link)  return reject(new Error(false))
        else{
            
            const fetch = require("node-fetch")
            fetch(`https://matchmaker.krunker.io/game-info?game=${link}`).then(res => res.json())
            .then(json => {
                if(!json.error){
                    
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
                
            }else{
                return reject(new Error('404',json))}
            }).catch(error => {
                console.log(error)
            return reject(new Error('404', error))})
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