// Load dependencies
const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();
const fs = require("fs");
const path = require("path");
const env = require("dotenv")

//Login
if(config.token){
  console.log("Token Found ==>",config.token)
}
else{
  env.config()
  if(process.argv[2] === 'dev') {
    config.token = process.env.TOKEN
  }else if(process.argv[2] === 'test' || !process.argv[2]) {
    config.token = process.env.TEST_TOKEN
  }
}
//Loading Events from /events directory
fs.readdir("./events/", (err, files) => { //Getting all files from directory
  if (err) return console.error(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
        return console.log("[LFG Bot] There aren't any events!");
    }
  jsfile.forEach(file => { //For each file, ddo this.
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client)); //Name of the file is the name of the event. https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

//Loading commands from /commands directory, to client
client.commands = new Discord.Collection(); //Discord's Collection Class, extends map.
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => { 
    if(err) console.error(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        return console.log("[LFG Bot] There aren't any commands!"); //JJ has fucked up
    }
    jsfile.forEach((f, i) => {
      let pull = require(`./commands/${f}`)
      
      client.commands.set(pull.config.name, pull);
      pull.config.aliases.forEach(alias => {
        client.aliases.set(alias, pull.config.name); //Store this data in our client(Only in cache, this data doesn't goto discord)
      })
    });
});

client.login(config.token).catch(e => console.log("INVALID TOKEN ENTER CORRECT TOKEN!",e))
module.exports.client = client;
