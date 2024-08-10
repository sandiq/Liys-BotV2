const { googleImage } = require("@bochilteam/scraper");

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let response = args.join(" ").split("--");
    let query = response[0];
    let jumlah = parseInt(response[1]);

    if (!query) throw `*• Example :* ${usedPrefix + command} *[query]*`;
    if (!jumlah) {
      const res = await googleImage(query);
      let image = res[Math.floor(Math.random() * res.length)];
      let caption = `*[ GOOGLE IMAGE ]*
*• Result from :* ${query}`;

      conn.sendFile(m.chat, image, "image.jpg", caption, m);
    } else {
      if (jumlah > 10) {
        throw "Kebanyakan bang 😭";
      }

      const res = await googleImage(query);
      for (let i = 0; i < jumlah; i++) {
        setTimeout(async () => {
          let image = res[Math.floor(Math.random() * res.length)];
          let captionWithLink = `*[ GOOGLE IMAGE ]*
*• Result from :* ${query}`;
          conn.sendFile(m.chat, image, "image.jpg", captionWithLink, m);
        }, i * 3000);
      }
    }
  } catch (error) {
    console.log(error);
    m.reply("Gagal mengirim hasil gambar");
  }
};

handler.help = ["gimage"].map((v) => v + " (Ⓛ)");
handler.tags = ["tools"];
handler.command = ["gimage"];
handler.limit = true;

module.exports = handler;
