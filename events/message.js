const Discord = require("discord.js");
const config = require("../config.json");
const db = require("../json.db")
module.exports = async (client, message) => {
<<<<<<< HEAD
    prefix = await db.prefix(message.guild.id)
    if (!message.guild || message.author.bot) return; // This will prevent bots from using the bot (and will also disable DMs). Lovely!
    const args = message.content.split(/\s+/g); // This will return the message content and split the prefix.
    const command = message.content.startsWith(prefix) && args.shift().slice(prefix.length).toLowerCase(); // This is the name of the command itself.
    
    if(command){
        let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command)); // This will look for the command's file by searching it in names and aliases.
        
        if(commandfile) commandfile.run(client, message, args); // And if it finds the command, it will run it.
    }
    if(message.mentions.users.first() == client.user){
        console.log(message.cleanContent)
        if(message.cleanContent.startsWith("@"+client.user.username)) require("../utils").embed(message,`\`${prefix}\` is my prefix, try \`${prefix}help\`.`)
        
    }
};
=======
    client.setTimeout(async()=> {
        if(!message.deleted){
            let prefix = await db.prefix(message.guild.id)
            if (!message.guild || message.author.bot) return; // This will prevent bots from using the bot (and will also disable DMs). Lovely!
                const args = message.content.split(/\s+/g); // This will return the message content and split the prefix.
                const command = message.content.startsWith(prefix) && args.shift().slice(prefix.length).toLowerCase(); // This is the name of the command itself.
            if(command){
                let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command)); // This will look for the command's file by searching it in names and aliases.
                if(commandfile) commandfile.run(client, message, args); // And if it finds the command, it will run it.
            }
            if(message.mentions.users.first() == client.user){
                console.log(message.cleanContent)
                if(message.cleanContent.startsWith("@"+client.user.username)) require("../utils").embed(message,`\`${prefix}\` is my prefix, try \`${prefix}help\`.`) 
            }
        }
    }, 1*1000);
};
>>>>>>> 53ade41229d49abbb3254b40955a78cf74047e14
