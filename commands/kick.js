const discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kick anyone with one shot xD",
  execute(message, args){

    if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, na tohle nemáš dostatečné pravomoce!`)
    }

    if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, Na tohle nemám pravomoce!`)
    }

    let target = message.mentions.members.first();

    if(!target) {
      return message.channel.send(`**${message.author.username}**, za příkaz prosím označ uživatele!`)
    }

    if(target.id === message.author.id) {
     return message.channel.send(`**${message.author.username}**, Nelze vyhodit tohoto živatele!`)
    }

  if(!args[1]) {
    return message.channel.send(`**${message.author.username}**, za označeného uživatele zadej důvod vyhazovu!`)
  }

    let embed = new discord.MessageEmbed()
    .setTitle("Kick")
    .addField("➜ Uživatel", `${target}`, false)
    .addField("➜ Admin", message.author.tag, false)
    .addField("➜ Důvod", args[1])
    .setColor(message.guild.me.displayHexColor)
    .setThumbnail(target.avatarURL)

    message.channel.send(embed)

    target.kick(args[1]);



  }
}
