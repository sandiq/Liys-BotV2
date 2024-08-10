let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) `*• Example :* ${usedPrefix + command} *[reply message]*`;
  let q = m.quoted ? m.quoted : m;
  if (!q.fromMe) throw `itu bukan pesan dari bot`;
  await conn.sendMessage(m.chat, { text: text, edit: q });
};

handler.help = ["edit"].map((v) => v + " (Ⓕ)");
handler.tags = ["tools"];
handler.command = ["edit"];

module.exports = handler;
