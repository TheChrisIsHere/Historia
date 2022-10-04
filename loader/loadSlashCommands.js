const fs = require('fs');
const chalk = require('chalk');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

module.exports = (client, path) => {
    //Load And Setting Commands
    const commands = [];
    const CommandsFolder = fs.readdirSync(`${path}/slashCommands`)
    for (folder of CommandsFolder)
    {
        let commandCategory = fs.readdirSync(`${path}/slashCommands/${folder}`).filter(file => file.endsWith('.js'))
        for(file of commandCategory)
        {
            const command = require(`../slashCommands/${folder}/${file}`)
            console.log(chalk.blue(`Loaded ${command.data.name} Slash Command!!`));
            client.slashCommands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        }
    }

    const rest = new REST({ version: '9' }).setToken(process.env.token);

    rest.put(Routes.applicationGuildCommands("938351107439202304", "932654660324581457"), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}