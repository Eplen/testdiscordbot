const Discord = require('discord.js');
const leveling = require('discord-leveling');

module.exports = {
  name: "rank",
async execute(message, args){

let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author

    let output = await leveling.Fetch(user.id)
    const rank = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Úroveň')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription(`Úroveň uživatele ${user} je nyní: **${output.level}**!`)
       message.channel.send(rank);
    }
    }
