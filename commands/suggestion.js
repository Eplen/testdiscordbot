const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "suggest",
  usage: "suggest <message>",
  description: "Odešle návrh",
  execute(message, args){

    if(!args.length) {
      const args = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek argumentů')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!suggest <Návrh>`')
       return message.channel.send(args);
    }


    let channel = message.guild.channels.cache.find((x) => (x.name === "💡┃návrhy" || x.name === "💡┃návrhy"))


    if(!channel) {
      return message.channel.send("there is no channel with name - 🔧︱bot")
    }


    let embed = new MessageEmbed()
    .setFooter('GalaktickyPrison.cz | '+ message.author.tag, message.author.avatarURL())
    .setTitle('• Návrh na vylepšení')
    .setColor(message.guild.me.displayHexColor)
    .setDescription(args.join(" "))


    channel.send(embed).then(m => {
      m.react("✅")
      m.react("❌")
    })


    let success = new MessageEmbed()
    .setFooter('GalaktickyPrison.cz | '+ message.author.tag, message.guild.me.user.avatarURL())
    .setTitle('• Návrh odeslán')
    .setDescription('**' + message.author.tag + '**, návrh na vylepšení byl odeslán do <#826186278454034482>!')
    .setColor(message.guild.me.displayHexColor)
    message.channel.send(success)

  }
}
