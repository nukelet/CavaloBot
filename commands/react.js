const { prefix } = require('../config.json');
module.exports =
{
    name: 'react',
    description: `Reacts with :horse:. Syntax: ${prefix}react`,

    execute(message)
    {
        message.react('🐴')
            .catch(() => {message.reply('There was an error while adding a reaction!');});
    },
};