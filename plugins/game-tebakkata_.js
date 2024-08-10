const similarity = require("similarity");
const threshold = 0.72;
let handler = (m) => m;
handler.before = async function (m, {
  conn,
  isCmd
}) {
  let id = m.chat;
  global.tebakkata = global.tebakkata ? global.tebakkata : {};
  if (!(id in global.tebakkata)) return !0
  if (isCmd) return !0
  let json = JSON.parse(JSON.stringify(global.tebakkata[id][1]));
  if (/nyerah/.test(m.text)) {
    clearTimeout(global.tebakkata[id][3]);
    delete global.tebakkata[id];
    m.reply('yahhh kok nyerah')
  } else if (/help|bantu/.test(m.text)) {
    let ans = json.jawaban.trim();
    let clue = ans.replace(/[AIUEOaiueo]/g, "_");
    conn.reply(
      m.chat,
      "```" + clue + "```",
      global.tebakkata[id][0],
    );
  } else {
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() === json.jawaban.toLowerCase().trim()) {
      const money = Math.floor(Math.random() * Math.floor(Math.random() * global.tebakkata[id][2]));
      global.db.data.users[m.sender].exp += global.tebakkata[id][2];
      global.db.data.users[m.sender].money += money
      await conn.reply(m.chat, `*Benar!*\n+${global.tebakkata[id][2]} XP\n+Rp${money} MONEY`, m);
      clearTimeout(global.tebakkata[id][3]);
      delete global.tebakkata[id];
      if (global.db.data) await global.db.write();
    } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`);
    else m.reply(`*Salah!*`);
  }
};

handler.exp = 0;
module.exports = handler;