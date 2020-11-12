const { prefix } = require('../config.json');

module.exports =
{
    name: 'help',
    description: `Displays info about a function. Syntax: ${prefix}help {command}`,

    execute(message, args)
    {
        if (args == '')
        {
            message.reply(`help: ${this.description}`);
            return;
        }

        const argCommand = args.split(' ').shift().toLowerCase();

        try
        {
            const command = require(`./${argCommand}.js`);
            message.reply(`${argCommand}: ${command.description}`);
        }

        catch
        {
            message.reply('Command not found!');
            return;
        }
    },
};