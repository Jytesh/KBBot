/*module.exports.old = async(client,message)=>{
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
    }*/