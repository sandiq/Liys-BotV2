let fs = require("fs");
let handler = async (m, { conn }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
  let name = conn.getName(m.sender);
  let user = global.db.data.users[who];
  let anu;
  if (user) {
    anu = `
🏦 Bank *${user.name}*
⭐ Role : *${user.role}*\n\n
*${user.exp}* Exp ✨
*${user.limit}* Limit 📊
*${user.money}* Money 💵`;
  } else {
    anu = `User tidak ditemukan`;
  }
  await conn.sendMessage(
    m.chat,
    {
      text: anu,
      contextInfo: {
        externalAdReply: {
          title: "💳 D O M P E T  U S E R",
          body: "info Dompet User Bot",
          thumbnailUrl: "https://telegra.ph/file/bb562cfd966da4ed5b81a.jpg",
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
};

handler.help = ["my", "dompet"].map((v) => v + " (Ⓕ)");
handler.tags = ["rpg"];
handler.command = ["dompet", "my"];

module.exports = handler;
