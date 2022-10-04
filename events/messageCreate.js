module.exports = {
    name: "messageCreate",
    run: (client, message) => {
        

        const args = message.content.trim().slice(client.prefix.length).split(" ")

        const command = args.shift().toLowerCase()

        if (!message.content.startsWith(client.prefix)) return;

        let cmd = client.commands.get(command || client.aliases.get(command))

        if(!cmd) return;

        if(!cmd.permissions.length === 0)
        {
            cmd.permissions.forEach(permission => {
                if(!message.guild.me.permissions.has(permission)) return message.channel.send(`Missing Perms For This Command: ${permission}`)
            });
        }

        cmd.run(client, args, message)

    }
}