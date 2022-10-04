const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    id: "help_previous",
    run: async (interaction, args, client) => {
        if(interaction.member.id != args[0])
        {
            interaction.reply({ content: "Its Not Your Button!!", ephemeral: true })
        }
        const helpMenu = client.helpEmbeds.get("HelpMenu")
        let tuco = parseInt(args[1]) - 2
        tuco < 0 ? tuco = helpMenu.length : tuco = tuco
        const helpMenuEmbedObject = helpMenu[tuco]
        
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setEmoji('⬅️')
            .setCustomId(`help_previous ${args[0]} ${tuco}`)
            .setStyle('PRIMARY'),
            new MessageButton()
            .setEmoji('➡️')
            .setCustomId(`help_next ${args[0]} ${helpMenuEmbedObject.embedNumber}`)
            .setStyle('PRIMARY'),
        )
        interaction.update({embeds: [helpMenuEmbedObject.embed], components: [row]})
    }
}