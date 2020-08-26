// Load dependencies
const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client({
    fetchAllMembers: false,

});
const fs = require("fs");
const path = require("path");
const env = require("dotenv");
const db = require("./mongo.js");

//Boot up the database
async function init() {
    await db.init().catch(console.error);
}
init();

//Login
env.config();
client.login(process.env.TOKEN);

//Event Handler
client.on('ready', async() => {
    const ts = new Date();
    console.log(`${ts.getFullYear()}-${ts.getMonth()}-${ts.getDate()}T${ts.getHours()}:${ts.getMinutes()}:${ts.getSeconds()}.${ts.getMilliseconds()}B${config.version} [Krunker Bunker Bot] ready to roll!`);
    client.user.setActivity(`v${config.version}`, { type: "WATCHING" });

    const lfgChannel = client.channels.fetch('688434522072809500');
    lfgChannel.messages.cache().each(m => m.delete());
});

client.on('message', async(message) => {
    client.setTimeout(async() => {
        if (!message.deleted) {
            if (message.author.bot) return; // This will prevent bots from using the bot. Lovely!

            if (!message.guild) return; // This will prevent the bot from responding to DMs. Lovely!

            if (message.channel.id == '688434522072809500') { //#looking-for-game
                client.commands.get('lfg').run(client, message)
            } else if (message.channel.id == '687539638168059956' || message.channel.id == '679429025445445643') { //#bunker-bot-commands and #dev
                if (message.content.indexOf(`${config.prefix}info`) == 0) {
                    client.commands.get('info').run(client, message);
                } else if (message.content.indexOf(`${config.prefix}lfg`) == 0) {
                    client.commands.get('lfg').run(client, message);
                }
            } else if (message.channel.id == '710454866002313248') { //#trading-board
                client.commands.get('trading').run(client, message);
            } else if (message.channel.id == '604386199976673291') { //#market-chat
                client.commands.get('market').run(client, message);
            } else if (message.channel.id == '727526422381461514') { //krunker-art
                client.commands.get('art').run(client, message);
            }
        }
    }, 250);
});

//Loading commands from /commands directory, to client
client.commands = new Discord.Collection(); //Discord's Collection Class, extends map.
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        return console.log("[KB Bot] There aren't any commands!"); //JJ has fucked up
    }
    jsfile.forEach((f, i) => {
        const pull = require(`./commands/${f}`)

        client.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name); //Store this data in our client(Only in cache, this data doesn't goto discord)
        })
    });
});

module.exports.client = client;