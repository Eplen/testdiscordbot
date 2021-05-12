const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "clear",
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
    if(!args.length) {
        const args = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Nedostatek argumentů')
        .setThumbnail('https://img.tpx.cz/uploads/lolmao.png')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('Zkontrolujte a znovu použijte příkaz správně: `!clear <Počet zpráv> <Důvod smazání>`')
       return message.channel.send(args);
    }

        let deleteAmount;

        if (parseInt(args[0]) > 100 ) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

           let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Nebyl zadán důvod';
        await message.channel.bulkDelete(deleteAmount, true);
        message.delete().catch(err => console.log(err));

        const embed = new MessageEmbed()
            .setTitle(`• Záznam o smazání zpráv`)
            .setThumbnail("https://img.tpx.cz/uploads/lolmao.png")
            .setDescription(`Úspěšně smazáno **${deleteAmount}** zpráv!\nDůvod: ||` + reason + `||`)
            .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
        await message.channel.send(embed)
    }
}
