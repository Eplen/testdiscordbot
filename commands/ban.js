const Discord = require("discord.js");
const parseDuration = require('parse-duration');
const humanizeDuration = require('humanize-duration');

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  async execute(message, args){

    if(!message.member.hasPermission("BAN_MEMBERS")) {
      const perms = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek pravomocí')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Nemáte dostatečné pravomoce pro použití tohoto příkazu.')
       return message.channel.send(perms);
    }


    const target = message.mentions.members.first();
    const duration = parseDuration(args[1])
    const reason = args.slice(2).join(" ")
    let bans = message.guild.channels.cache.find((x) => (x.id === "832631033600933928" || x.id === "832631033600933928"))

    if(!target) {
      const args = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek argumentů')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!ban <@Uživatel> <Čas> <Důvod>`')
       return message.channel.send(args);
    }

    if(target.id === message.author.id) {
      const ys = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nesprávné použití příkazu')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Nemůžete banovat sami sebe!')
       return message.channel.send(ys);
    }

    if(!duration) {
      const args2 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek argumentů')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!ban <@Uživatel> <Čas> <Důvod>`')
       return message.channel.send(args2);
    }


   if(!reason) {
     const args3 = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek argumentů')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!ban <@Uživatel> <Čas> <Důvod>`')
       return message.channel.send(args3);
   }

      const dm = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Ban')
      .setThumbnail(message.guild.me.user.avatarURL())
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().username}**, byl jsi zabanován na serveru **${message.guild.name}**!`)
      .addField('• Čas', `${humanizeDuration(duration, {language: 'cs'})}`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Důvod', `${reason}`);
      target.send(dm)


      const msg = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Ban')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().username}** byl úspěšně zabanován!`)
      .addField('• Čas', `${humanizeDuration(duration, {language: 'cs'})}`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Důvod', `${reason}`);

       await message.channel.send(msg)



      const log = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Ban')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().username}** byl zabanován!`)
      .addField('• Čas', `${humanizeDuration(duration, {language: 'cs'})}`)
      .addField('• Administrátor', message.author.tag)
      .addField('• Důvod', `${reason}`);
      await bans.send(log);

      await target.ban({ reason: `${reason}` })


    setTimeout(() => {
            message.guild.members.unban(target)
            const log2 = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Unban')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz', message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().username}** byl odbanován!`)
      .addField('• Uplynulý čas', `${humanizeDuration(duration, {language: 'cs'})}`)
      .addField('• Administrátor', 'GalaktickyPrison.cz')
      .addField('• Předchozí trest', `${reason}`)
      bans.send(log2);
        }, duration)

  }
}
