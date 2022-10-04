module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {
        

        

        if(interaction.isButton())
        {
            const customIDofButton = interaction.customId.trim().split(" ");
            const command = client.buttonCommands.get(customIDofButton[0])
            if(!command) return;
            customIDofButton.shift();
            command.run(interaction, customIDofButton, client);
            return;
        }
        else if (interaction.isCommand())
        {
            try {
                const command = client.slashCommands.get(interaction.commandName);
                if(!command) return;
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}