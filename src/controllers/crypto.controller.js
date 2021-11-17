const Discord = require("discord.js");
const puppeteer = require("puppeteer");
const moment = require("moment");

module.exports = class CryptoController {
  static async checkPrice(client) {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(process.env.CRYPTO_URL, { waitUntil: "load", timeout: 0 });
    
    setTimeout(async function () {
      // await page.screenshot({ path: "picture.png" });

      const refined = CryptoController.getRefinedContent(await page.content());
      await CryptoController.sendMessage(client, refined);

      await page.close();
    }, Number(process.env.TIMEOUT));
  }

  static getRefinedContent(content) {
    let refined = content.split(`<div class="priceValue`)[1];
    let priceValue = refined.split(`</div>`)[0].split(`R$`)[1];
    priceValue = priceValue.replace("</span>", "");

    refined = refined.split(`</span>`);

    let color = "#d9534f";
    let icon = ":arrow_down:";
    if (refined[1].includes("icon-Caret-up")) {
      color = "#5cb85c";
      icon = ":arrow_up:";
    }

    const percentage = refined[2].split(`<`)[0];

    return { priceValue, percentage, color, icon };
  }

  static async sendMessage(client, refined) {
    try {
      const guild = client.guilds.cache.get(process.env.SERVER_ID);
      const channel = guild.channels.cache.get(process.env.CHANNEL_ID);

      let msg = new Discord.MessageEmbed();

      msg.setColor(refined.color);

      msg.setAuthor(
        `Bombcrypto [BCOIN]`,
        `https://s2.coinmarketcap.com/static/img/coins/64x64/12252.png`
      );

      msg.addFields({
        name: `R$ ${refined.priceValue}`,
        value: `${refined.percentage}% ${refined.icon}`,
      });

      msg.setFooter(
        moment(new Date())
          .utcOffset(process.env.TIMEZONE)
          .format("DD/MM/YYYY HH:mm")
      );

      await channel.send(msg);
    } catch (e) {
      console.log(e);
    }
  }
};
