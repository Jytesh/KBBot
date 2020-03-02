const js = require("./.data/sqlite.json")
const fs = require("fs")
let exp = {
    get : async function(key,value){
        json = await JSON.parse(fs.readFileSync("./.data/sqlite.json"))
        if(Object.keys(json).includes(key)){
            if(value){
                val = json[key][value]
                if(val)return val
                else return false
            }else{
                return key
            }
        }else return false
        
        
    },
    prefix: async function(id){
        let prefix = await this.get(id,"PREFIX")
        if(prefix){
            return prefix
        }else{
            return require("./config.json").prefix
        }
    },
    set : async function(key,value){
        json = await JSON.parse(fs.readFileSync("./.data/sqlite.json"))
        json[key] = value
        await fs.writeFileSync("./.data/sqlite.json",JSON.stringify(json))
        return {key:value}
    }
}
module.exports = exp