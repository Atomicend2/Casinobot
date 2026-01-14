import { Client } from "discord.js-selfbot-v13";

const client = new Client({ checkUpdate: false });

// Your game channel ID
const CHANNEL_ID = "1413630502383915019";

const wait = (ms) => new Promise(r => setTimeout(r, ms));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.username}`);

  const channel = await client.channels.fetch(CHANNEL_ID);

  while (true) {
    try {
      // beg → deposit
      await channel.send(".beg");
      await wait(rand(3000, 5000));
      await channel.send(".dep");

      // dig → deposit
      await wait(rand(3000, 5000));
      await channel.send(".dig");
      await wait(rand(3000, 5000));
      await channel.send(".dep");

      // fish → deposit
      await wait(rand(3000, 5000));
      await channel.send(".fish");
      await wait(rand(3000, 5000));
      await channel.send(".dep");

      // main cooldown: 3–5 minutes
      await wait(rand(180000, 300000));

    } catch (err) {
      console.error("Error:", err);
      await wait(60000);
    }
  }
});

// Token comes from Render Environment Variable
client.login(process.env.TOKEN);
