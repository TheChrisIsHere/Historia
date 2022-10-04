const fs = require('fs')
module.exports = (client, path) => {
    require('../loader/loadCommands')(client, path)
    require('../loader/loadButtonCommands')(client, path)
    require('../loader/loadAndMakeHelpEmbeds')(client, path)
    require('../loader/eventsLoad')(client, path)
    require('../loader/loadSlashCommands')(client, path)
    

}