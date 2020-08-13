require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.DB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const refreshRate = 600000;

async function init() {
    await client.connect();
}

async function store(id, data) {
    const reply = await client.db('LFG').collection('users').updateOne({
        id: { $eq: id },
    }, { $set: data }, { upsert: true });

    if (reply) return 1;

    return -1;
}

async function fetch(id) {
    const reply = await client.db('LFG').collection('users').findOne({ id: { $eq: id } });

    if (reply) return reply.info;

    return -1;
}

module.exports = {
    init,
    store,
    fetch,
};