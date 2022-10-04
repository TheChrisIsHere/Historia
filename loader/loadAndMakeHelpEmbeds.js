const fs = require('fs')
const { MessageEmbed } = require('discord.js')
const chalk = require('chalk')
module.exports = (client, path) => {
    //Load Commands
    const CommandsFolder = fs.readdirSync(`${path}/commands`)
    for (folder of CommandsFolder)
    {
        let commandCategory = fs.readdirSync(`${path}/commands/${folder}`).filter(file => file.endsWith('.js'))
        let embed = new MessageEmbed()
        .setTitle(`Help Menu!!`);

        let oldEmbed = new MessageEmbed()
        .setTitle(`Help Menu!!`);

        let i = 0;
        let fileArray = [];
        let embedsArray = [];
        for(files of commandCategory)
        {
            const file = require(`${path}/commands/${folder}/${files}`)
            fileArray.push(file)
        }
        for(let j = 0; j < fileArray.length; j+= 5)
        {
            const chunk = fileArray.slice(j, j + 5)
            i++;
            let k = 0;
            chunk.forEach(cmd => {
                k++;
                embed.addFields({ name: `${k}) ${cmd.name}`, value: `Description: ${cmd.description}\nAliases: ${cmd.aliases}` })
            });
            let embedObject = {
                embed: embed,
                embedNumber: i
            }
            embedsArray.push(embedObject)
            embed = oldEmbed
        }
        client.helpEmbeds.set("HelpMenu", embedsArray)
        console.log(chalk.blue("Loaded Help Menu!!"))
    }
}