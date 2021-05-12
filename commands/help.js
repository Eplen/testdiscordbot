const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = {
  name: 'help',
  description: "Pomocný příkaz se všemi commandy",
  execute(message, args) {
      const noEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Seznam příkazů')
        .setThumbnail(message.guild.me.user.avatarURL())
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Prefix: `!`')
        .addField('• Informace', '`warnings`')
        .addField('• Úrovně', '`rank`')
        .addField('• GalaktickyPrison.cz', '`suggest`')
        .addField('• Admin-Tým', '`say` | `embed` | `poll` | `clear` | `warn` | `rwarns` | `mute` | `unmute` | `ban`', false)
       message.channel.send(noEmbed);
  }
}
