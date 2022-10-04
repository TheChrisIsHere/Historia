// Catch Errors
process.on("unhandledRejection", (reason, p) => {
    console.log(" [antiCrash] :: Unhandled Rejection/Catch");
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch");
    console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
    console.log(" [antiCrash] :: Multiple Resolves");
    console.log(type, promise, reason);
});
//Import DiscordJS
const discordjs = require('discord.js')
//Import And Config DotENV
require('dotenv').config();
//Make A Discord Client
const client = new discordjs.Client({ intents: [
  discordjs.GatewayIntentBits.Guilds,
  discordjs.GatewayIntentBits.GuildMessages,
  discordjs.GatewayIntentBits.GuildBans,
  discordjs.GatewayIntentBits.GuildEmojisAndStickers,
  discordjs.GatewayIntentBits.GuildIntegrations,
  discordjs.GatewayIntentBits.GuildInvites,
  discordjs.GatewayIntentBits.GuildMembers,
  discordjs.GatewayIntentBits.GuildMessageReactions,
  discordjs.GatewayIntentBits.GuildMessageTyping,
  discordjs.GatewayIntentBits.GuildPresences,
  discordjs.GatewayIntentBits.GuildScheduledEvents,
  discordjs.GatewayIntentBits.GuildVoiceStates,
  discordjs.GatewayIntentBits.GuildWebhooks,
  discordjs.GatewayIntentBits.MessageContent
] })
//Make Path
const path = require('path')







//GLOBAL VARIABLES
client.slashCommands = new discordjs.Collection();
client.commands = new discordjs.Collection()
client.queue = new Map()
client.prefix = '!'
client.aliases = new discordjs.Collection()
client.buttonCommands = new discordjs.Collection()
client.helpEmbeds = new discordjs.Collection()

//Make Path
const fullPath = path.join(__dirname, '/')


//Run Handle.js
require('./handler/handle')(client, fullPath)

//Login To Bot
client.login(process.env.token)