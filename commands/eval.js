const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'eval',
    async execute(message, args){
        if (message.author.id !== '644452272201400321') return;
        const embedDescription = args.slice(0).join(' ');
        const embed = new MessageEmbed()
            .setDescription('Evaluating ...')
            .setColor(message.guild.me.displayHexColor)
        const msg = await message.channel.send(embed);
        try {
            const data = eval(args.join(' ').replace(/```/g, ''));
            const embed = new MessageEmbed()
                .addField('📥 Input', '```js\n' + embedDescription + '```')
                .addField('📤 Output', '```js\n' + await data + '```')
                .setColor(message.guild.me.displayHexColor)
                .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
            await msg.edit(embed)
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })
        } catch (e) {
            const embed = new MessageEmbed()
                .setDescription('Something went wrong!')
                .setColor(message.guild.me.displayHexColor)
            return await msg.edit(embed);

        }
    }
}
