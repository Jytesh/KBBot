module.exports.run = (client, message) => {
    if (message.attachments.size == 0) {
        message.delete();
    }
}

module.exports.config = {
    name: 'art',
    aliases: ['art'],
}
module.exports.help = {
    usage: '',
    User: 0,
    description: ''
}