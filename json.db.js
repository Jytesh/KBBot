const js = require("./.data/sqlite.json")
const fs = require("fs")
let exp = {
    get : async function(key,value){
        json = require("./.data/sqlite.json") //Reads the JSON file
        //json = await JSON.parse(fs.readFileSync("./.data/sqlite.json")) ASYNCHROUNOUS
        if(Object.keys(json).includes(key)){ //Checks if the JSON has the key specified.
            if(value){ //If it does
                val = json[key][value] //Get the Value of the key
                if(val)return val //If there is a value
                else return false //If there is no value
            }else{ //If there is key
                return key
            }
        }else return false//There is no JSON[key]
        
        
    },
    prefix: async function(id){ //Just checks if the guild has a prefix, return default prefix if it doesn't
        let guild = require("./.data/sqlite.json")[id]
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
    set : async function(key,value){ //For assigning value to a key in DB
        keys = Object.keys(value) // All the keys
        json = require("./.data/sqlite.json") //Read the JSON
        //json = await JSON.parse(fs.readFileSync("./.data/sqlite.json")) // asynchronous + slow
        for(k of keys){ //For all the keys that have the value specified
        json[key][k] = value[k] // For each change the key to value
        }
        await fs.writeFileSync("./.data/sqlite.json",JSON.stringify(json)) //Convert JS object to JSON, and write it to file.
        return {key:value} //Returns the written values to wherever set was called.
    }
}
module.exports = exp