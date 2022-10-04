const fs = require('fs')
const chalk = require('chalk')
module.exports = (client, path) => {
    //Load buttons
    const CommandsFolder = fs.readdirSync(`${path}/buttons`).filter(file => file.endsWith('.js'))
    for (file of CommandsFolder)
    {
        const command = require(`../buttons/${file}`)
        console.log(chalk.green(`Loaded ${command.id} Button!!`))
        if(!command.id) return console.error(`ID Not Given In ${file}`)
        client.buttonCommands.set(command.id, command)
    }
}