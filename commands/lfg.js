const { MessageEmbed } = require("discord.js"),
    logger = require('../logger');

module.exports.run = async(client, message) => {
    const args = message.content.indexOf('$lfg') == 0 ? message.content.substring(5).split(' ') : message.content.split(' ');
    const link = args.shift();

    if (link.indexOf("https://krunker.io/?") == 0) { //Checks if its a krunker game link
        let eb = new MessageEmbed()
            .setTitle(message.member.displayName + ' is looking to party! :tada:')
            .setAuthor(message.member.displayName + ' (' + message.author.tag + ')', message.author.avatarURL(), null)
            .addField('Link: ', link)
            .setFooter('KrunkerLFG')
            .setTimestamp()

        if (args.length > 0) {
            var desc = args.join(' ')
            if (desc.indexOf('krunker.io') == -1) eb.setDescription(desc == desc.toUpperCase() ? desc.toLowerCase() : desc)
        }

        if (link.indexOf("https://krunker.io/?game=") == 0 && link.split('=')[1].split(':')[1].length == 5) {
            game = await getLinkInfo(link).catch(console.log)
            console.log(game)
            eb.addField('Players', game.players, true)
            eb.addField('Map', game.map, true)
            eb.addField('Game Mode', game.mode, true)

            game.party ? eb.addField('Custom Match', 'Yes') : null;
            switch (link.split('=')[1].split(':')[0]) {
                case 'SV':
                    eb.setColor('BLURPLE')
                    break;
                case 'MIA':
                    eb.setColor('BLUE')
                    break;
                case 'NY':
                    eb.setColor('AQUA')
                    break;
                case 'FRA':
                    eb.setColor('GOLD')
                    break;
                case 'TOK':
                    eb.setColor('ORANGE')
                    break;
                case 'SIN':
                    eb.setColor('LUMINOUS_VIVID_PINK')
                    break;
                case 'BLR':
                    eb.setColor('DARK_VIVID_PINK')
                    break;
                case 'SYD':
                    eb.setColor('GREEN')
                    break;
            }
            message.reply(eb).then(msg => { msg.delete({ timeout: 1800000 }) }).catch(console.error);
        } else if (link.indexOf('https://krunker.io/?party=') == 0 && link.split('=')[1].length == 6) {
            eb.setColor('BLACK')
            message.reply(eb).then(msg => { msg.delete({ timeout: 600000 }) }).catch(console.error);
        } else {
            error(message)
        }
    } else {
        error(message)
    }
    logger.messageDeleted(message, 'LFG', 'DARK_VIVID_PINK');
}

function error(message) {
    message.reply(new MessageEmbed()
        .setColor('RED')
        .setTitle('Error')
        .setDescription('Misuse of <#688434522072809500>. Please only send game links with an optional description afterwards.')
        .setTimestamp()
        .setFooter(`${message.member.displayName} (${message.author.tag})`, message.author.avatarURL())
    ).then(msg => { msg.delete({ timeout: 7000 }) }).catch(console.error);
}

function getLinkInfo(link) {
    return new Promise(async(resolve, reject) => {
        link = link.split("=")[1]

        if (!link) return reject(new Error(false))
        else {

            const fetch = require("node-fetch")
            options = {
                headers: {
                    'authority': 'matchmaker.krunker.io',
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
                    'origin': 'https://krunker.io',
                    'scheme': 'https',
                    'referer': 'https://krunker.io/',

                }
            }
            res = await fetch(`https://matchmaker.krunker.io/game-info?game=${link}`, options)

            json = await res.json().catch(
                error => {
                    console.log(error)
                    reject(new Error('JSON', error))
                })

            if (!json) resolve(false)
            if (!json.error) {

                //json = JSON.parse(body)
                const game = {
                    region: json[0].split(":")[0],
                    players: `${json[2]}/${json[3]}`,
                    mode: json[4].i.split('_')[0],
                    map: json[4].i.split("_")[1],
                    party: json[4].cs,
                }

                resolve(game)

            } else {
                reject(new Error('404', json))
            }
        }

    })
}

module.exports.config = {
    name: "lfg",
}