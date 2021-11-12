const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

console.info(new Date(), "Starting to load commands");
const commandsList = require("./commands");
const Commands = {};
for (const each of commandsList) {
  Commands[each.command] = each;
}
console.info(new Date(), "Commands loaded sucessfully");

console.info(new Date(), "Starting to load events");
const Events = require("./events");
console.info(new Date(), "Events loaded sucessfully");

client.on("ready", () => {
  client.user.setPresence({
    status: "online",
    activity: {
      name: `${process.env.PREFIX || "?"}ping`,
      type: "LISTENING",
    },
  });

  console.info(new Date(), `Started logged as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  const prefix = process.env.PREFIX || "?";

  if (message.content.charAt(0) != prefix) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLocaleLowerCase();

  if (!Commands[command]) {
    return;
  }

  if (!Commands[command].onlyAdmin) {
    return await Commands[command].action(message, args);
  }

  if (message.member.hasPermission("ADMINISTRATOR")) {
    return await Commands[command].action(message, args);
  }
});

for (const event of Events) {
  if (event.event === "loop") {
    event.action(client);
  }
}

client.login(process.env.TOKEN);
