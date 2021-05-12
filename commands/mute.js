const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
  name: "mute",
  async execute(message, args){
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      const perms = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek pravomocí')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Nemáte dostatečné pravomoce pro použití tohoto příkazu.')
       return message.channel.send(perms);
    }


    const user = message.mentions.members.first();


    if(!user) {
      const args = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek argumentů')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!mute <@Uživatel> <Důvod>`')
       return message.channel.send(args);
    }

    if(user.id === message.author.id) {
      const ys = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nesprávné použití příkazu')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Nemůžete umlčet sami sebe!')
       return message.channel.send(ys);
    }


    let reason = args.slice(1).join(" ")
    let channel = message.guild.channels.cache.find((x) => (x.id === "832631033600933928" || x.id === "832631033600933928"))


    if(!reason) {
      const rsn = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek argumentů')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!warn <@Uživatel> <Důvod>`')
       return message.channel.send(rsn);
    }


    let muterole = message.guild.roles.cache.find(x => x.id === "828740122471563284")



   if(user.roles.cache.has(muterole)) {
      const mtd = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Upozornění')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Tento uživatel již je umlčený!')
       return message.channel.send(mtd);
    }




    user.roles.add(muterole)

message.delete().catch(err => console.log(err));

    const dm = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Umlčení')
      .setThumbnail(message.guild.me.user.avatarURL())
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}**, byl jsi umlčen na serveru **${message.guild.name}**!`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Důvod', `${reason}`);
      user.send(dm)


    const msg = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Umlčení')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}** byl úspěšně umlčen!`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Důvod', `${reason}`);

       await message.channel.send(msg)



       const log = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Záznam o umlčení uživatele')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}** byl umlčen!`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Důvod', `${reason}`);
      await channel.send(log);

  }
};
