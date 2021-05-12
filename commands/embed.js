const Discord = require('discord.js');


module.exports = {
    name: 'embed',
    description: "Psaní přes bota pomocí embed",
    execute(message, args){
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      const perms = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek pravomocí')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Nemáte dostatečné pravomoce pro použití tohoto příkazu.')
       return message.channel.send(perms);
    }
    if(!args.length) {
      const args = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek argumentů')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!embed <Text>`')
       return message.channel.send(args);
    }
        message.delete().catch(err => console.log(err));
        const embedDescription = args.slice(0).join(' ');

        const embedSay = new Discord.MessageEmbed()
        .setDescription(embedDescription)
        .setColor(message.guild.me.displayHexColor)
        .setTimestamp('')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())

        message.reply(embedSay)
    }
}
