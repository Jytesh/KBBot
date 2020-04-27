const js = require("./data/sqlite.json")
const fs = require("fs")
let exp = {
    get : async function(key,value){
        let config = require("./config.json")
        if(config.guild == "/* OPTIONAL GUILD ID HERE */" || !config.guild){
            const client = require("./app").client
            config.guild = client.guilds.cache.first().id
        }
        if(key == config.guild){
            console.log(config.lfg[value])
            return config.lfg[value]
        }
    },
    prefix: async function(id){
        let config = require("./config.json")
        return config.prefix
        
    }
}
module.exports = exp