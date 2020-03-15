const js = require("./data/sqlite.json")
const fs = require("fs")
let exp = {
    get : async function(key,value){
        let json = require("./data/sqlite.json")

        //json = await JSON.parse(fs.readFileSync("./.data/sqlite.json")) ASYNCHROUNOUS
        if(Object.keys(json).includes(key)){
            if(value){
                let val = json[key][value]
                if(val)return val
                else return false
            }else{
                return key
            }
        }else return false
        
        
    },
    prefix: async function(id){
        let guild = require("./data/sqlite.json")[id]
        if(guild){
            let prefix = guild.PREFIX
        if(prefix){
            return prefix
        }else{
            return require("./config.json").prefix
        }
        }else{
            return require("./config.json").prefix
        }
        
    },
    set : async function(key,value){
        let keys = Object.keys(value)
        let json = require("./data/sqlite.json")
        //json = await JSON.parse(fs.readFileSync("./.data/sqlite.json")) // asynchronous + slow
        for(let k of keys){
        json[key][k] = value[k]
        }
        await fs.writeFileSync("./data/sqlite.json",JSON.stringify(json))
        return {key:value}
    }
}
module.exports = exp