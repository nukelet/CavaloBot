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

client.login(TOKEN);

client.once('ready', () =>
{
    console.log('Login successful!');
});

const allowedChannels = new Discord.Collection();

client.on('message', message =>
{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split('/\s+/');
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try
    {
        client.commands.get(command).execute(message, args);
    }

    catch (error)
    {
        console.log(error);
        message.reply(`Unknown error while executing command "${command}".`);
    }

});