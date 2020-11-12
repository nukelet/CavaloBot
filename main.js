const { version, prefix } = require('./config.json');

console.log(`CavaloBot ${version}`);
console.log('Starting...');

require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;

const Discord = require('discord.js');
const client = new Discord.Client();

// read all commands
client.commands = new Discord.Collection();
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// TODO: this doesn't really kill the client when there's a login error
client.login(TOKEN)
    .then(() => console.log('Login successful.'))
    .catch(() => console.log('Login error. Exiting...'));

client.on('message', message =>
{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const str = message.content.slice(prefix.length).trim();

    let command, args;

    // check if command has arguments
    if (str.includes(' '))
    {
        command = str.substr(0, str.indexOf(' '));
        args = str.slice(command.length).trim();
    }

    else
    {
        command = str;
        args = [];
    }

    if (!client.commands.has(command))
    {
        // message.channel.send('Command not found!');
        return;
    }

    try
    {
        client.commands.get(command).execute(message, args);
    }

    catch (error)
    {
        console.log(error);
        message.reply(`unknown error while executing command "${command}".`);
    }

});