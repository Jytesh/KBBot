const Discord = require("discord.js");
const config = require("../config.json");
module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return; // This will prevent bots from using the bot (and will also disable DMs). Lovely!
    const args = message.content.split(/\s+/g); // This will return the message content and split the prefix.
    const command = message.content.startsWith(config.prefix) && args.shift().slice(config.prefix.length).toLowerCase(); // This is the name of the command itself.
    
    if(command){
        let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command)); // This will look for the command's file by searching it in names and aliases.
        
        if(commandfile) commandfile.run(client, message, args); // And if it finds the command, it will run it.
    }
    if(message.mentions.users.first() == client.user){
        require("../utils").embed(message,`\`${config.prefix}\` is my prefix, try \`${config.prefix}help\`.`)
    }
};
