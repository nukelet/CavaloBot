module.exports =
{
    name: 'cavalo',
    description: 'cavalo',

    // eslint-disable-next-line no-unused-vars
    execute(message, args)
    {
        const fs = require('fs');
        const files = fs.readdirSync('./cavalo-img');

        // pick a random image file in /cavalo
        const file = files[Math.floor(Math.random() * files.length)];

        const { MessageAttachment } = require('discord.js');
        const attachment = new MessageAttachment (`./cavalo-img/${file}`);

        message.channel.send('cavalo :racehorse:', attachment);
    },
};