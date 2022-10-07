const fs = require('fs')
const chalk = require('chalk')
module.exports = (client, path) => {
    //Load Commands
    const CommandsFolder = fs.readdirSync(`${path}/commands`)
    for (folder of CommandsFolder)
    {
        let commandCategory = fs.readdirSync(`${path}/commands/${folder}`).filter(file => file.endsWith('.js'))
        for(file of commandCategory)
        {
            const command = require(`../commands/${folder}/${file}`)
            console.log(chalk.greenBright(`Loaded ${command.name}!!`))
            if(!command.name) return console.error(`Name Not Given In ${file}`)
            client.commands.set(command.name, command)
            if(command.aliases) 
            {
                for (let i = 0; i < command.aliases.length; i++) {
  client.aliases.set(command.aliases[i], command.name)
                  console.log(chalk.greenBright(`Loaded ${command.name} as ${command.aliases[i]}`))
}

              
            }
        }
    }
}
