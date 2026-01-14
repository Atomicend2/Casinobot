import { Client } from "discord.js-selfbot-v13";

// ====================== CONFIG ======================
const CHANNEL_ID = "1413630502383915019"; // Your game channel
const TOKEN = process.env.TOKEN; // Your token in Render env vars

const WAIT_MIN = 180000; // 3 minutes in ms (main cooldown)
const WAIT_BETWEEN_CMD = [1000, 2000]; // Random wait 1-2s between commands
const DAILY_WAIT = 24 * 60 * 60 * 1000; // 24h in ms

let lastDaily = 0;

// ==================== UTILITY =======================
const wait = ms => new Promise(r => setTimeout(r, ms));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ==================== CLIENT ========================
const client = new Client({ checkUpdate: false });

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.username}`);

  const channel = await client.channels.fetch(CHANNEL_ID);

  while (true) {
    try {
      const now = Date.now();

      // ---------- Daily ----------
      if (now - lastDaily >= DAILY_WAIT) {
        await channel.send(".daily");
        console.log("Ran .daily");
        lastDaily = now;
        await wait(rand(...WAIT_BETWEEN_CMD));
      }

      // ---------- Beg ----------
      await channel.send(".beg");
      console.log("Ran .beg");
      await wait(rand(...WAIT_BETWEEN_CMD));
      await channel.send(".dep");
      await wait(rand(...WAIT_BETWEEN_CMD));

      // ---------- Fish ----------
      await channel.send(".fish");
      console.log("Ran .fish");
      await wait(rand(...WAIT_BETWEEN_CMD));
      await channel.send(".dep");
      await wait(rand(...WAIT_BETWEEN_CMD));

      // ---------- Dig ----------
      await channel.send(".dig");
      console.log("Ran .dig");
      await wait(rand(...WAIT_BETWEEN_CMD));
      await channel.send(".dep");

      console.log("Cycle complete. Waiting for cooldown...");
      await wait(rand(WAIT_MIN, WAIT_MIN + 60000)); // 3–4 minutes

    } catch (err) {
      console.error("Error occurred:", err);
      console.log("Waiting 1 minute before retry...");
      await wait(60000);
    }
  }
});

client.login(TOKEN);
