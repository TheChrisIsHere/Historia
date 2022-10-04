const { Permissions, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'setupServer',
    description: 'Show Help Menu!!',
    aliases: ['ss'],
    permissions: [Permissions.FLAGS.SEND_MESSAGES],
    run: async (client, args, message) => {

      let embed = new EmbedBuilder()
        .setTitle(`Warning!!`)
        .setColor(`RANDOM`)
        .setDescription(`Due to This Command, I will Delete all Server's Roles, Channels etc to Remake Them. You have 15 Seconds. Do You Wish to Continue?`)

      const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('continue-yes')
					.setLabel('Yes')
					.setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
					.setCustomId('continue-no')
					.setLabel('No')
					.setStyle(ButtonStyle.Danger),
			);
      
      let msg = await message.channel.send({embeds: [embed]})

      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 5000 });

collector.on('collect', async i => {
  if(i.customId === `continue-yes`)
  {
    await i.update({ content: 'A button was clicked!', components: [] });
    collector.stop();
  }
});

collector.on('end', collected => {
  msg.edit({ content: `JOJO`, components: [] })
  return;
}));
    }
}