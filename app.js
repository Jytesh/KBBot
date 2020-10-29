// Load dependencies
const Discord = require('discord.js'),
    config = require("./config.json"),
    client = new Discord.Client({ fetchAllMembers: false }),
    fs = require("fs"),
    env = require("dotenv"),
    logger = require('./logger');

//Login
env.config();
client.login(process.env.TOKEN);

//Event Handlers
client.on('ready', async() => {
    const ts = new Date();
    console.log(`${ts.getFullYear()}-${ts.getMonth()}-${ts.getDate()}T${ts.getHours()}:${ts.getMinutes()}:${ts.getSeconds()}.${ts.getMilliseconds()}B${config.version} [Krunker Bunker Bot] ready to roll!`);
    client.user.setActivity(`v${config.version}`, { type: "WATCHING" });
});

client.on('message', async(message) => {
    client.setTimeout(async() => {
        if (!message.deleted) {
            if (message.author.bot) return; // This will prevent bots from using the bot. Lovely!

            if (!message.guild) return; // This will prevent the bot from responding to DMs. Lovely!

            switch (message.channel.id) {
                case '688434522072809500': // #looking-for-game
                    client.commands.get('lfg').run(client, message);
                    break;
                case '687539638168059956' || '679429025445445643': // #bunker-bot-commands and #dev
                    if (message.content.indexOf(`${config.prefix}info`) == 0) {
                        client.commands.get('info').run(client, message);
                    } else if (message.content.indexOf(`${config.prefix}lfg`) == 0) {
                        client.commands.get('lfg').run(client, message);
                    }
                    break;
                case '710454866002313248': // #trading-board
                    client.commands.get('trading').run(client, message);
                    break;
                case '604386199976673291': //#market-chat
                    client.commands.get('market').run(client, message);
                    break;
                case '727526422381461514': //#krunker-art
                    client.commands.get('art').run(client, message);
                    break;
                case '534664336027680768': //#suggestions
                    client.commands.get('suggestions').run(client, message);
                    break;
            }

            //Disable stickers in KB
            if (message.guild.id == '448194623580667916' && message.content == '' && message.embeds.length == 0 && message.attachments.keyArray().length == 0) {
                logger.messageDeleted(message, 'Sticker')
                message.delete()
            }
        }
    }, 250);
});

//Loading commands from /commands directory, to client
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) return console.log("[KB Bot] There aren't any commands!"); //JJ has fucked up
    jsfile.forEach((f, i) => {
        const pull = require(`./commands/${f}`)
        client.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => { client.aliases.set(alias, pull.config.name) }) //Store this data in our client(Only in cache, this data doesn't goto discord)
    });
});

module.exports.client = client;