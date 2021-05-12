// REQUIRE
const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ["MESSAGE", "USER", "REACTION"] });
const enmap = require('enmap');
const fs = require('fs');
const { token, prefix } = require('./botconfig.json');
const ytdl = require('ytdl-core');
const ms = require('ms');

const leveling = require('discord-leveling');
const db = require('quick.db');

const { badwords } = require("./data.json");
const jointocreate = require("./jointocreate");
jointocreate(bot);



// EVENTS
bot.events = new Discord.Collection();


// 24/7 RADIO
bot.on('ready', async () => {
  let channel = bot.channels.cache.get("832604345995886613") || await bot.channels.fetch("832604345995886613")

  if (!channel) return;
  const connection = await channel.join();
  connection.play(ytdl("https://www.youtube.com/watch?v=gnyW6uaUgk4"))
})

setInterval(async function () {
  if (!bot.voice.connections.get("825154728551514143")) {
    let channel = bot.channels.cache.get("832604345995886613") || await bot.channels.fetch("832604345995886613")
    if (!channel) return;

    const connection = await channel.join()
    connection.play(ytdl("https://www.youtube.com/watch?v=gnyW6uaUgk4"))
  }
}, 20000)




// bot
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  bot.commands.set(command.name, command)
}

// EXPRESS
const express = require("express")
const app = express()

app.get("/", async (req, res) => {
  res.send("g")
})

app.listen(3000)


// CONSOLE LOGS & STATUS
bot.once('ready', () => {
  console.log('=== bot is ready to use! ===');
  bot.user.setStatus('idle')


  let botStatus = [
    "mc.galaktickyprison.cz | !help",
    "ts3.galaktickyprison.cz | !help",
    "www.galaktickyprison.cz | !help"
  ]

  setInterval(function () {
    let status = botStatus[Math.floor(Math.random() * botStatus.length)];
    bot.user.setActivity(status, { type: "WATCHING" });

  }, 7000)
});








// CMD HANDLER
bot.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  try {
    command.execute(message, args);
  }
  catch (error) {
    console.error(error);
  }
})




bot.on("message", async message => {
  if (message.author.bot) return;
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    let confirm = false;
    var i;
    for (i = 0; i < badwords.length; i++) {

      if (message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;

    }

    if (confirm) {
      message.delete()
      const words = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('• Zakázaný výraz')
        .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
        .setDescription('**' + message.author.tag + '**, tento výraz je zakázaný!')
      return message.channel.send(words);
    }


  }
})

// VERIFY

bot.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.id === '832652641292386304') {
    if (reaction.emoji.name === 'checkmark') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('827289754332692510')
      const verified = new Discord.MessageEmbed()
        .setColor(reaction.message.guild.me.displayHexColor)
        .setTimestamp()
        .setTitle('• Přístup udělen')
        .setThumbnail(reaction.message.guild.me.user.avatarURL())
        .setFooter('GalaktickyPrison.cz | ' + reaction.message.guild.members.cache.get(user.id).user.tag, reaction.message.guild.members.cache.get(user.id).user.avatarURL())
        .setDescription('Gratulujeme, **' + reaction.message.guild.members.cache.get(user.id).user.tag + '**\nNyní jsi ověřil svůj účet!\n_ _\nNejdříve si prosím přečti naše pravidla v <#827294184951382026>!\nNejnovější informace nalezneš v <#826183078694748221>!\n_ _\nDěkujeme, že tvoříš naší komunitu!')
      user.send(verified)


      let channel = reaction.message.guild.channels.cache.find((x) => (x.id === "832606354711117834" || x.id === "832606354711117834"))

      let embed = new Discord.MessageEmbed()
        .setFooter('GalaktickyPrison.cz | ' + reaction.message.guild.members.cache.get(user.id).user.tag, reaction.message.guild.members.cache.get(user.id).user.avatarURL())
        .setTitle('• Záznam o ověření')
        .setColor(reaction.message.guild.me.displayHexColor)
        .setThumbnail(reaction.message.guild.members.cache.get(user.id).user.avatarURL())
        .setDescription("Uživalel **" + reaction.message.guild.members.cache.get(user.id).user.tag + "** byl úspěšně ověřen!")


      channel.send(embed)
    }
  }
})
bot.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.id === '832652641292386304') {
    if (reaction.emoji.name === 'checkmark') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('827289754332692510')
    }
  }
})

bot.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.id === '832656338370428928') {
    if (reaction.emoji.name === 'checkmark') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('826878384553721877')
    }
  }
})
bot.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.id === '832656338370428928') {
    if (reaction.emoji.name === 'checkmark') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('826878384553721877')
    }
  }
})

bot.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.id === '832652641292386304') {
    if (reaction.emoji.name === 'checkmark') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('833278880185188364')
    }
  }
})

bot.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.id === '832652641292386304') {
    if (reaction.emoji.name === 'checkmark') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('833277862575865887')
    }
  }
})

bot.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.id === '835526318015774740') {
    if (reaction.emoji.name === 'checkmark') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('835148164074831872')
    }
  }
})

bot.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.id === '835526318015774740') {
    if (reaction.emoji.name === 'checkmark') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('835148164074831872')
    }
  }
})
bot.on("message", async message => {
  if (message.author.id === '644452272201400321') return;
  if (message.author.bot) return;
  let profile = await leveling.Fetch(message.author.id);
  leveling.AddXp(message.author.id, 5);

  if (profile.xp + 15 > 150) {
    leveling.AddLevel(message.author.id, 1);
    leveling.SetXp(message.author.id, 0)
    const rankup = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('• Postup na novou úroveň!')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter('GalaktickyPrison.cz | ' + message.author.tag, message.guild.me.user.avatarURL())
      .setDescription(`Gratulujeme, **${message.author.tag}** k postupu na novou úroveň: **${profile.level + 1}**`)
    message.channel.send(rankup);
  }
})

const {Client} = require('discord.js')

const client = new Client()

// Stores the current count.
let count = 99999
// Stores the timeout used to make the bot count if nobody else counts for a set period of
// time.
let timeout

client.on('message', ({channel, content, member}) => {
  // Only do this for the counting channel of course
  // If you want to simply make this work for all channels called 'counting', you
  // could use this line:
  // if (client.channels.cache.filter(c => c.name === 'counting').keyArray().includes(channel.id))
  if (channel.id === '841961432169185296') {
    // You can ignore all bot messages like this
    if (member.user.bot) return
    // If the message is the current count + 1...
    if (Number(content) === count + 1) {
      // ...increase the count
      count++
      // Remove any existing timeout to count
      if (timeout) client.clearTimeout(timeout)
      // Add a new timeout
      timeout = client.setTimeout(
        // This will make the bot count and log all errors
        () => channel.send(++count).catch(console.error),
        // after 30 seconds
        30000
      )
    // If the message wasn't sent by the bot...
    } else if (member.id !== client.user.id) {
      // ...send a message because the person stuffed up the counting (and log all errors)
      channel.send(`${member} zkazil počet!`).catch(console.error)
      // Reset the count
      count = 0
      // Reset any existing timeout because the bot has counted so it doesn't need to
      // count again
      if (timeout) client.clearTimeout(timeout)
    }
  }
})


bot.login(token)
