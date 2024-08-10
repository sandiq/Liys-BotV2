const similarity = require("similarity");
const threshold = 0.72;
let handler = (m) => m;
handler.before = async function (m, {
  conn,
  isCmd
}) {
  let id = m.chat;
  global.susunkata = global.susunkata ? global.susunkata : {};
  if (!(id in global.susunkata)) return !0
  if (isCmd) return !0
  let json = JSON.parse(JSON.stringify(global.susunkata[id][1]));
  if (/nyerah/.test(m.text)) {
    clearTimeout(global.susunkata[id][3]);
    delete global.susunkata[id];
    m.reply('yahhh kok nyerah')
  } else if (/bantu/.test(m.text)) {
    let ans = json.jawaban.trim();
    let clue = ans.replace(/[AIUEOaiueo]/g, "_");
    conn.reply(
      m.chat,
      "```" + clue + "```",
      global.susunkata[id][0],
    );
  } else {
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() === json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += global.susunkata[id][2];
      await conn.reply(m.chat, `*Benar!*\n+${global.susunkata[id][2]} XP`, m);
      clearTimeout(global.susunkata[id][3]);
      delete global.susunkata[id];
      if (global.db.data) await global.db.write();
    } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`);
    else m.reply(`*Salah!*`);
  }
};

handler.exp = 0;
module.exports = handler;