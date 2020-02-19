//Require basic classes
const {Client,RichEmbed} = require("discord.js")
const config = require("../config.json")
module.exports.run = (client,message)=>{
    //DO STUFF HERE
    eb = new RichEmbed()
        eb.setTitle("Help:");
        eb.setColor("0x49C4EF");
        eb.setTimestamp();
        eb.setFooter("KrunkerLFG");

        eb.setAuthor(client.user.tag, null, client.user.avatarURL);

        eb.addField("Util", "> ***$info*** \r\n > ........ Provides bot info. " +
                "\r\n > ***$help*** \r\n > ........ Provides list of commands and how to use them.", false);
        eb.addField("General", "> ***$lfg** <link> <message (optional)>* \r\n > ........ Creates an LFG posting with <link> and <message>.", false);
        eb.addField("Staff", "> ***$setAll*** \r\n > ........ Sets current channel as default LFG channel for all regions." +
                "\r\n > ***$setNA*** \r\n > ........ Sets current channel as default LFG channel for NA." +
                "\r\n > ***$setOCE*** \r\n > ........ Sets current channel as default LFG channel for OCE." +
                "\r\n > ***$setEU*** \r\n > ........ Sets current channel as default LFG channel for EU." +
                "\r\n > ***$setAS*** \r\n > ........ Sets current channel as default LFG channel for AS.", false);
    message.channel.send(eb)
}
module.exports.config = {
    name: "help",
    aliases: ["h", "hlp","wlp","welp","ifkingforgothowthebotworks"],
}
module.exports.help = {
    usage : `\`${config.prefix}help <module>\``, //Example usage of command
    User : 0, //Who this command can be used by, 1 for Everyone 2 for Restricted Roles 3 for Moderators and 4 for Admins 5 for Server Owner
    description : `${config.prefix}help lists all available modules.\n \`${config.prefix}help <module-name>\`\nLists the module help` //Description to come when you use config.prefix help <command name>
}