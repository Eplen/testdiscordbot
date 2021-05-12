const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js');
const db = require("quick.db")

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  async execute(message, args){
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      const perms = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek pravomocí')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Nemáte dostatečné pravomoce pro použití tohoto příkazu.')
       return message.channel.send(perms);
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      const args = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek argumentů')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!warn <@Uživatel> <Důvod>`')
       return message.channel.send(args);
    }
    
    if(message.mentions.users.first().bot) {
      const bots = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nesprávné použití příkazu')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Nemůžete varovat boty!')
       return message.channel.send(bots);
    }
    
    if(message.author.id === user.id) {
      const ys = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nesprávné použití příkazu')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Nemůžete varovat sami sebe!')
       return message.channel.send(ys);
    }
    
    if(user.id === message.guild.owner.id) {
      const owner = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nesprávné použití příkazu')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Nemůžete varovat majitele serveru!')
       return message.channel.send(owner);
    }
    
    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      const args2 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek argumentů')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!warn <@Uživatel> <Důvod>`')
       return message.channel.send(args2);
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
   let channel = message.guild.channels.cache.find((x) => (x.id === "812752716404621332" || x.id === "812752716404621332"))
   let bans = message.guild.channels.cache.find((x) => (x.id === "813836933251596320" || x.id === "813836933251596320"))
   message.delete().catch(err => console.log(err));


    if(warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
      const dm1 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Varování')
      .setThumbnail(message.guild.me.user.avatarURL())
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}**, byl jsi varován na serveru **${message.guild.name}**!`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Počet varování', `${warnings + 1}`)
      .addField('• Důvod', `${reason}`);
      user.send(dm1)

     const msg1 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Varování')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}** byl úspěšně varován!`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Počet varování', `${warnings + 1}`)
      .addField('• Důvod', `${reason}`);

       await message.channel.send(msg1)


  
     const log1 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Záznam o varování uživatele')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}** byl varován!`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Počet varování', `${warnings + 1}`)
      .addField('• Důvod', `${reason}`);
      await channel.send(log1);

    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       const dm2 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Varování')
      .setThumbnail(message.guild.me.user.avatarURL())
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}**, byl jsi varován na serveru **${message.guild.name}**!`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Počet varování', `${warnings + 1}`)
      .addField('• Důvod', `${reason}`);
      user.send(dm2)
      const msg2 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Varování')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}** byl úspěšně varován!`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Počet varování', `${warnings + 1}`)
      .addField('• Důvod', `${reason}`);

       await message.channel.send(msg2)

      

      const log2 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Záznam o varování uživatele')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}** byl varován!`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Počet varování', `${warnings + 1}`)
      .addField('• Důvod', `${reason}`);
      await channel.send(log2);
    }
    
    
    if(warnings === 4) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 0)
      const dm3 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Ban')
      .setThumbnail(message.guild.me.user.avatarURL())
      .setFooter('GalaktickyPrison.cz', message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().username}**, byl jsi zabanován na serveru **${message.guild.name}**!`)
      .addField('• Administrátor', 'GalaktickyPrison.cz')
      .addField('• Důvod', `Porušení pravidel komunikace`);
      user.send(dm3)

      const msg3 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Ban')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz', message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().username}** byl úspěšně zabanován!`)
      .addField('• Administrátor', 'GalaktickyPrison.cz')
      .addField('• Důvod', `Porušení pravidel komunikace`);

       await message.channel.send(msg3)

      

      const log3 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Ban')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz', message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().username}** byl zabanován!`)
      .addField('• Administrátor', 'GalaktickyPrison.cz')
      .addField('• Důvod', `Porušení pravidel komunikace`);
      await bans.send(log3);

      user.ban({ days: 7, reason: 'Porušení pravidel komunikace' })
    }
  } 
}