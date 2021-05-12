const db = require("quick.db")
const Discord = require('discord.js');

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns"],
  usage: "rwarns <@user>",
  description: "Reset warnings of mentioned person",
  async execute(message, args) {


    if(!message.member.hasPermission("ADMINISTRATOR")) {
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
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!rwarns <@Uživatel>`')
       return message.channel.send(args);
    }

    if(message.mentions.users.first().bot) {
      const bots = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nesprávné použití příkazu')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Nemůžete resetovat varování botům!')
       return message.channel.send(bots);
    }

    if(message.author.id === user.id) {
      const ys = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nesprávné použití příkazu')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Nemůžete resetovat vaše varování!')
       return message.channel.send(ys);
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

    if(warnings === null) {
      const nowarns = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Upozornění')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription(`Uživatel **${message.mentions.users.first().tag}** nemá žádné varování`)
       return message.channel.send(nowarns);
    }

    db.delete(`warnings_${message.guild.id}_${user.id}`)
    const dm = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Odstranění varování')
      .setThumbnail(message.guild.me.user.avatarURL())
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`**${message.mentions.users.first().tag}**, nyní máš resetované všechny statistiky na serveru **${message.guild.name}**!`)
      .addField('• Administrátor', message.author.tag)
      user.send(dm)

    const sucess = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Odstranění varování')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription(`Uživatel **${message.mentions.users.first().tag}** již nemá žádné varování!`)
       await message.channel.send(sucess);


    let channel = message.guild.channels.cache.find((x) => (x.id === "832631033600933928" || x.id === "832631033600933928"))

    const log = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Odstranění varování')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription(`Uživatel **${message.mentions.users.first().tag}** již nemá žádné varování!`)
        .addField('• Administrátor', message.author.tag)
        .setThumbnail(`${message.mentions.users.first().avatarURL()}`)
       await channel.send(log);
}
}
