const { prefix } = require('../config.json');

module.exports =
{
    name: 'cavalo-quote',
    description: `Add horse quotes. Syntax: ${prefix}cavalo-quote {text}`,
    execute(message, args)
    {
        const quote = `:racehorse: :horse: ${args} :horse: :racehorse:`;
        message.channel.send(quote);
    },
};