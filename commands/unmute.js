const Discord = require('discord.js');
module.exports = {
  name: "unmute",
  category: "moderation",
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

    if (!user) {
      const args = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek argumentů')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!unmute <@Uživatel>`')
       return message.channel.send(args);
    }

    let muterole = message.guild.roles.cache.find(x => x.id === "814550924533694484")
    let channel = message.guild.channels.cache.find((x) => (x.id === "832631033600933928" || x.id === "832631033600933928"))


 if(user.roles.cache.has(muterole)) {
      const mtd = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Upozornění')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Tento uživatel není umlčený!')
       return message.channel.send(mtd);
    }


    user.roles.remove(muterole)

    message.delete().catch(err => console.log(err));

    const dm = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Umlčení')
      .setThumbnail(message.guild.me.user.avatarURL())
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}**, nyní již nejsi umlčený na serveru **${message.guild.name}**!`)
      .addField('• Administrátor', message.author.tag)
      user.send(dm)

const msg = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Umlčení')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}** již není umlčen!`)
      .addField('• Administrátor', message.author.tag)

       await message.channel.send(msg)



const log = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Záznam o umlčení uživatele')
      .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}** již není umlčen!`)
      .addField('• Administrátor', message.author.tag)
      await channel.send(log);

  }
};
