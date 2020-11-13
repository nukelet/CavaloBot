const { prefix } = require('../config.json');

module.exports =
{
    name: 'help',
    description: `Displays info about a function. Syntax: ${prefix}help {command}`,

    execute(message, args, client)
    {
        if (args === '')
        {
            let help_message = 'List of available commands:\n';
            for (const command of client.commands)
            {
                help_message += `**${command[1].name}**: ${command[1].description}` + '\n\n';
            }

            message.reply(help_message.trim());
            return;
        }

        const argCommand = args.split(' ').shift().toLowerCase();

        try
        {
            // TODO: maybe fetch this from client.commands instead?
            const command = require(`./${argCommand}.js`);
            message.reply(`**${argCommand}**: ${command.description}`);
        }

        catch
        {
            message.reply('Command not found!');
            return;
        }
    },
};