const { PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Colors, ChannelType } = require('discord.js')

module.exports = {
    name: 'serversetup',
    description: 'Setup Server!!',
    aliases: ['ss'],
    permissions: [PermissionFlagsBits.SEND_MESSAGES],
    run: async (client, args, message) => {
      let wantToUseCommand = false;

      let embed = new EmbedBuilder()
        .setTitle(`Warning!!`)
        .setColor('Red')
        .setDescription(`Due to This Command, I will Delete all Server's Roles, Channels etc to Remake Them. You have 15 Seconds. Do You Wish to Continue?`)

      let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('continue-yes')
					.setLabel('Yes')
					.setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
					.setCustomId('continue-no')
					.setLabel('No')
					.setStyle(ButtonStyle.Success),
			);
      
      let msg = await message.channel.send({embeds: [embed], components: [row] })

      let collector = msg.channel.createMessageComponentCollector({ time: 15000 });

collector.on('collect', async i => {
  if(i.customId === `continue-yes`)
  {
    wantToUseCommand = true;
    collector.stop();
  }
  else if(i.customId === `continue-no`)
  {
    wantToUseCommand = false;
    collector.stop();
  }
});

collector.on('end', async collected => {
  if(wantToUseCommand == false) 
  {
    msg.edit({ content: `Command Cancelled`, components: [], embeds: [] })
    wantToUseCommand = false;
    return;
  }
  else if(wantToUseCommand === true)
  {

    await msg.edit({ content: `Loading...`, components: [], embeds: [] })

    row = new ActionRowBuilder()
			.addComponents(

        new ButtonBuilder()
					.setCustomId('skip-server-name')
					.setLabel('Skip')
					.setStyle(ButtonStyle.Secondary),
			);

  await msg.edit({ content: `Enter New Server Name or Click On Skip. You have 15 Seconds or Skip will happen as default`, components: [row], embeds: [] })

      collector = msg.channel.createMessageComponentCollector({ time: 15000 });

      let msgCollector = msg.channel.createMessageCollector({ time: 15000 });

      let wantToSkip = false;
      let serverName = '';

            collector.on('collect', async i => {
        if(i.customId === `skip-server-name`)
        {
          wantToSkip = true;
          collector.stop();
          msgCollector.stop();
        }
      });
      
      collector.on('end', collected => {
        if(wantToSkip === false) return; 
        
          serverName = message.guild.name;
          wantToSkip = false;
          msgCollector.stop();

        
      });

        msgCollector.on('collect', sname => {
          if(sname.author.id != message.author.id) return;
          if(sname.content.length < 2 || sname.content.length > 32) return msg.channel.send(`Server Name Should be less than 32 characters and more than 2 characters`);
        serverName = sname.content;
          sname.delete();
          wantToSkip = false;
          msgCollector.stop();
          collector.stop();

          
          });

          msgCollector.on('end', async () => {
            await msg.edit({ content: `Loading...`, components: [], embeds: [] })

            row = new ActionRowBuilder()
			.addComponents(

        new ButtonBuilder()
					.setCustomId('skip-server-pic')
					.setLabel('Skip')
					.setStyle(ButtonStyle.Secondary),
			);

  await msg.edit({ content: `Enter New Server Pic Link or Click On Skip. You have 15 Seconds or Skip will happen as default`, components: [row], embeds: [] })

      collector = msg.channel.createMessageComponentCollector({ time: 15000 });

      msgCollector = msg.channel.createMessageCollector({ time: 15000 });

      wantToSkip = false;
      let serverNewImage = '';

            collector.on('collect', async i => {
        if(i.customId === `skip-server-pic`)
        {
          wantToSkip = true;
          collector.stop();
          msgCollector.stop();
        }
      });
      
      collector.on('end', collected => {
        if(wantToSkip === false) return; 
          msgCollector.stop();

        
      });

        msgCollector.on('collect', spic => {
          if(spic.author.id != message.author.id) return;

          let url = spic.content.trim().split(' ');

          //Check Link
          if(!isImage(url[0])) return spic.channel.send(`Please Give a valid image ending with .jpeg, .png etc`);
          
          

          serverNewImage = spic.content;
          wantToSkip = false;
          msgCollector.stop();
          collector.stop();
          spic.delete();

          

          
          
          });

          msgCollector.on('end', async () => {
            await msg.edit({ content: `Loading...`, components: [], embeds: [] })

            embed = new EmbedBuilder()
        .setTitle(`Confirm`)
        .setColor('Random')
        if(serverNewImage != '')
        {
        embed.setDescription(`Server name will be - **${serverName}**. With This Image, Do you want to Continue? You have 15 Seconds`)
          embed.setImage(serverNewImage);
          
        }
            else
        {
          {
        embed.setDescription(`Server name will be - **${serverName}**, Do you want to continue? You have 15 Seconds`)
        }
        }

      row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('continue-yes-1')
					.setLabel('Yes')
					.setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
					.setCustomId('continue-no-1')
					.setLabel('No')
					.setStyle(ButtonStyle.Success),
			);
      
      msg.edit({embeds: [embed], components: [row], content: '' })

      collector = msg.channel.createMessageComponentCollector({ time: 15000 });
            let wantToUseCommand1 = false;

collector.on('collect', async i => {
  if(i.customId === `continue-yes-1`)
  {
    wantToUseCommand1 = true;
    collector.stop();
  }
  else if(i.customId === `continue-no`)
  {
    wantToUseCommand1 = false;
    collector.stop();
  }
});


            collector.on('end', async() => {
              if(wantToUseCommand1 === false)
              {
                await msg.edit({ content: `Cancelled`, components: [], embeds: [] })
              }
              else
              {
                await msg.edit({ content: `Loading...`, components: [], embeds: [] })

                await msg.edit({ content: `Deleting Channels...`, components: [], embeds: [] })

                let fetchedChannels = await msg.guild.channels.fetch();

                fetchedChannels.sweep(channel => channel.id === message.channel.id)

                fetchedChannels.each(channel => {channel.delete();})

                await msg.edit({ content: `Deleting Roles...`, components: [], embeds: [] })

                let fetchedRoles = await msg.guild.roles.fetch();

                fetchedRoles.each(role => {role.delete();})

                  await msg.edit({ content: `Deleting Emojis...`, components: [], embeds: [] })

                  let fetchedEmojis = await msg.guild.emojis.fetch();

                fetchedEmojis.each(emoji => {emoji.delete();})

                msg.edit("Setting A Basic Server...")


    //Code
 //time in milliseconds
     await msg.edit("Creating Roles...")
//Creating Roles

message.guild.roles.create({
    name: 'Owner',
    position: 5,
    permissions: [PermissionFlagsBits.Administrator],
})
message.guild.roles.create({
    name: 'Head Mod',
    position: 4,
  permissions: [PermissionFlagsBits.Administrator],
})
message.guild.roles.create({
    name: 'Mod',
    position: 3,
    permissions: [PermissionFlagsBits.Administrator],
})
message.guild.roles.create({
    name: 'Staff',
    position: 2,
    permissions: [PermissionFlagsBits.KickMembers, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.ChangeNickname, PermissionFlagsBits.ModerateMembers, PermissionFlagsBits.KickMembers,
PermissionFlagsBits.ManageGuild],
})
await message.guild.roles.create({
    name: 'Members',
    position: 1,
    permissions: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
})





  await msg.edit("Created Basic Roles")

 
    //Code
  //time in milliseconds


const admin = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'admin')


const hmod = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'head mod')

const mod = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'mod')

const staff = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'staff')

const members = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'members')

await msg.edit("Creating Welcome Channels...")
// Creating Channels
    await message.guild.channels.create({
                name: 'Welcome And Bye-Bye',
                type: ChannelType.GuildCategory,
                position: 0,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    }]
            }).then(cat => {
              message.guild.channels.create({
                name: '👋 || Welcome ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                      id: members.id,
                      allow: [PermissionFlagsBits.ViewChannel],
                      deny: [PermissionFlagsBits.SendMessages],
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                // cat.setPosition('0')
              })
              message.guild.channels.create({
                name: '🥺 || Bye-Bye ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                      id: members.id,
                      allow: [PermissionFlagsBits.ViewChannel],
                      deny: [PermissionFlagsBits.SendMessages],
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                // cat.setPosition('0')
              })
              message.guild.channels.create({
                name: '📝 || Rules ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                      id: members.id,
                      allow: [PermissionFlagsBits.ViewChannel],
                      deny: [PermissionFlagsBits.SendMessages],
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                cat.setPosition('0')
            })
       })
                

await msg.edit("Created Welcome Category")
              


            await msg.edit("Creating Dashboard Channels...")
              message.guild.channels.create({
                name: 'Dashboard ', 
                type: ChannelType.GuildCategory,
                position: 1,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    }]
            }).then(cat => {
              message.guild.channels.create({
                name: '📢 || Announcements ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                      id: members.id,
                      allow: [PermissionFlagsBits.ViewChannel],
                      deny: [PermissionFlagsBits.SendMessages],
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                // cat.setPosition('0')
              })
            
              message.guild.channels.create({
                name: '✨ || Events ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                      id: members.id,
                      allow: [PermissionFlagsBits.ViewChannel],
                      deny: [PermissionFlagsBits.SendMessages],
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                 cat.setPosition('1')
              })
              })
await msg.edit("Created Dashboard Category")

await msg.edit("Creating General Channels...")
              message.guild.channels.create({
                name: 'General ', 
                type: ChannelType.GuildCategory,
                position: 2,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                    }]
            }).then(cat => {
              message.guild.channels.create({
                name: '💬 || General-Chat ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, 
             allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory], 
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                // cat.setPosition('0')
              })
              message.guild.channels.create({
                name: '📸 || Media-Share ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, 
             allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory], 
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                cat.setPosition('2')
              })

              message.guild.channels.create({
                name: '🔊 || General-VC ', 
                type: ChannelType.GuildVoice,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, 
             allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
             }] 
              }).then(dog => {
                dog.setParent(cat.id)
                cat.setPosition('2')
              })
              })

              await msg.edit("Created General Category...")
await msg.edit("Creating Music Channels...")
              message.guild.channels.create({
                name: 'Music ', 
                type: ChannelType.GuildCategory,
                position: 3,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                    }]
            }).then(cat => {
              message.guild.channels.create({
            name: '🎵 || Music-Commands ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, 
             allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory], 
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                // cat.setPosition('0')
              })
              message.guild.channels.create({
                name: '🎶 || Music-VC ', 
                type: ChannelType.GuildVoice,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, 
             allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory], 
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                cat.setPosition('3')
              })
            })



await msg.edit("Created Music Category")




await msg.edit("Creating Bots Channels...")
              message.guild.channels.create({
                name: 'Bots ', 
                type: ChannelType.GuildCategory,
                position: 4,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                    }]
            }).then(cat => {
              message.guild.channels.create({
                name: '🤖 || Bot-Commands ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, 
             allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory], 
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                // cat.setPosition('0')
              })
              message.guild.channels.create({
                name: '❗ || Levels ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, 
             allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory], 
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                cat.setPosition('4')
              })
              
            })
            await msg.edit("Created Bots Category")
await msg.edit("Creating Extras Channels...")


message.guild.channels.create({
                name: 'Extras ', 
                type: ChannelType.GuildCategory,
                position: 5,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                    }]
            }).then(cat => {
              message.guild.channels.create({
                name: '💩 || Spamming ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, 
             allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory], 
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                // cat.setPosition('0')
              })
              message.guild.channels.create({
                name: '📺 || Self-Promo ', 
                type: ChannelType.GuildText,
                parent: cat.parentID,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, 
             allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory], 
                    }]
              }).then(dog => {
                dog.setParent(cat.id)
                cat.setPosition('5')
              })
              
            })

            await msg.edit("Created Extras Category")

            await msg.edit("Assigning All Roles To Channels...")
setTimeout(function(){ 
    //Code
 }, 5000); //time in milliseconds

await msg.edit("Creating Default Emojis...")

      // let emojisToUploadCollection = client.guilds.fetch('id').emojis.fetch();

      //             emojisToUploadCollection.each(emoji => msg.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji.id}.png`))



        await msg.edit("Setting Name and Image of the Server...")


        msg.guild.setName(serverName);

        if(serverNewImage != '')
        {
          msg.guild.setIcon(serverNewImage);
        }





      
            msg.edit("All Done!")




      



                
              }
            })
                            


            
          })
              
          })
      
  }
});







      

      
  

        


    
  








            
    }
}


function isImage(url) {
  if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g).test(url))
  {
    return false;
  }
  else
  {
    return true;
  }
  
}

