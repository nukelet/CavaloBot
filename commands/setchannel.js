const { prefix } = require('../config.json');

module.exports =
{
    name: 'setchannel',
    description: `Set in which channels the bot can be used (defaults to all channels). Syntax: ${prefix}setchannel {channel-id}.`,

    execute(message)
    {
        message.channel.send('This functionality has not been implemented yet. Sorry!');
    },
};