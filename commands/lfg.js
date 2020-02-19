const Discord = require("discord.js")
const config = require("../config.json")
const utils = require("../utils")

const {NA,EU,OCE,AS} = require("../utils.js").channels
module.exports.run = (client,message)=>{
        var args = message.content.substring(1).split(' ');
    
        if(args.length < 2) {
            message.channel.send('Error. Invalid use of command. Please refer to `$help` for assistance.');
        }else {
            var cmd = args[0];
            args.shift();
            var link = args[0];
            args.shift();
    
            if(!link.includes('https://krunker.io/?game=')) {
                message.channel.send('Error. Invalid game link. Please refer to `$help` for assistance.');
            }else {
                const eb = new Discord.RichEmbed()
                    .setTitle(randomMessage(message.author.username))
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .addField('Link:', link, false)
                    .setTimestamp()
                    .setFooter('KrunkerLFG');
                if(args.length >= 1) {
                    eb.setDescription(args.join(' '));
                }
                message.channel.send(eb);
            }
        
        }
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

function randomMessage(tempUser) {
    var num = Math.floor(Math.random*8);
    switch(num) {
        case 0:
            return tempUser + ' is here to stomp some Guests.';
        case 1:
            return tempUser + ' is here to flex their skins.';
        case 2:
            return 'Omg ' + tempUser + ' Is UsIng hAcks. rEpOrtEd.';
        case 3:
            return 'Krunker? Never heard of it.';
        case 4:
            return 'Knowledge is knowing a tomato is a fruit; Wisdom is not putting' + tempUser + 'in a fruit salad.';
        case 5:
            return 'If being ' + tempUser + ' is a crime, then arrest me.';
        case 6:
            return 'A bus station is where a bus stops. A train station is where a train stops. On ' + tempUser + '\'s desk, I have a work station..';
        case 7:
            return 'Politicians and diapers have one thing in common. ' + tempUser + ' should change them both regularly, and for the same reason.';
    }
}