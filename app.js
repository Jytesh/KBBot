// Load dependencies
const config = require("./config.json"),
    id = require('./id.json'),
    Discord = require('discord.js'),
    client = new Discord.Client({ fetchAllMembers: false }),
    fs = require("fs"),
    env = require("dotenv"),
    logger = require('./logger');

//Loading commands from /commands directory, to client
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) return console.log("[KB Bot] There aren't any commands!"); //JJ has fucked up
    jsfile.forEach((f, i) => {
        const pull = require(`./commands/${f}`)
        client.commands.set(pull.config.name, pull);
    });
});

//Login
env.config();
client.login(process.env.TOKEN);

//Event Handlers
client.on('ready', async() => {
    const ts = new Date();
    console.log('[Krunker Bunker Bot] ready to roll!');
    client.user.setActivity('DM JJ with bot suggestions', { type: "PLAYING" });

    client.channels.resolve(id.channels["bunker-bot-commands"]).send(config.version);

    client.channels.resolve(id.channels["looking-for-game"]).messages.fetch({ limit: 100 }, false, true).then(messages => {
        messages.array().forEach(m => {
            logger.messageDeleted(m, 'Bot reboot autodel', 'AQUA')
        });
    });
    client.channels.resolve(id.channels["report-hackers"]).messages.fetch({ limit: 100 }, false, true).then(messages => {
        messages.array().forEach(m => {
            if (m.author.id == id.users.kbbot) m.delete({ timeout: 20000 });
            else if (m.author.id != id.users.vortx && m.author.id != id.users.jj) client.commands.get('reporthackers').run(client, m);
        })
    });
});

client.on('message', async(message) => {
    client.setTimeout(async() => {
        if (!message.deleted) {
            if (message.author.bot) return; // This will prevent bots from using the bot. Lovely!

            if (!message.guild) return; // This will prevent the bot from responding to DMs. Lovely!

            switch (message.channel.id) {
                case id.channels["looking-for-game"]:
                    client.commands.get('lfg').run(client, message);
                    break;
                case id.channels["bunker-bot-commands"] || id.channels["dev"]:
                    if (message.content.indexOf(`${config.prefix}info`) == 0) {
                        client.commands.get('info').run(client, message);
                    } else if (message.content.indexOf(`${config.prefix}lfg`) == 0) {
                        client.commands.get('lfg').run(client, message);
                    }
                    break;
                case id.channels["trading-board"]:
                    client.commands.get('trading').run(client, message);
                    break;
                case id.channels["market-chat"]:
                    client.commands.get('market').run(client, message);
                    break;
                case id.channels["krunker-art"]:
                    client.commands.get('art').run(client, message);
                    break;
                case id.channels["suggestions"]:
                    client.commands.get('suggestions').run(client, message);
                    break;
                case id.channels["report-hackers"]:
                    client.commands.get('reporthackers').run(client, message);
                    break;
                case id.channels["random-chat"]:
                    const randomRoles = [
                        id.roles.dev,
                        id.roles.yendis,
                        id.roles.cm,
                        id.roles.mod,
                        id.roles.tmod,
                        id.roles.active,
                    ];
                    if (message.content.includes('http')) {
                        var canBypass = false;
                        if (!canBypass) randomRoles.forEach(role => { if (message.member.roles.cache.has(role)) canBypass = true; return });
                        if (!canBypass) logger.messageDeleted(message, 'Random Chat Link', 'BLURPLE');
                    }
                    break;
            }

            //Disable stickers in KB
            if (message.guild.id == id.guilds.kb && message.content == '' && message.embeds.length == 0 && message.attachments.keyArray().length == 0) {
                const stickerRoles = [
                    id.roles.dev,
                    id.roles.yendis,
                    id.roles.cm,
                    id.roles.mod,
                    id.roles.tmod,
                    id.roles.devoted,
                ];
                var canBypass = false;
                if (!canBypass) stickerRoles.forEach(role => { if (message.member.roles.cache.has(role)) canBypass = true; return });
                if (!canBypass) logger.messageDeleted(message, 'Sticker/Invite', 'BLURPLE');
            }
        }
    }, 250);
});

module.exports.client = client;