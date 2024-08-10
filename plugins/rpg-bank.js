let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  const caption = `
⛊「 *B A N K  U S E R* 」
│ 📛 *Name:* ${user.registered ? user.name : conn.getName(m.sender)}
│ 🏛️ *atm:* ${user.bank} 💲
│ 💹 *Money:* ${user.money} 💲
│ 🌟 *Status:* ${user.premiumDate ? "Premium" : "Free"}
│ 📑 *Registered:* ${user.registered ? "Yes" : "No"}
╰──┈┈⭑
`.trim();
  await conn.sendMessage(
    m.chat,
    {
      text: caption,
      contextInfo: {
        externalAdReply: {
          title: "BANK USER",
          body: "Info bank user bot",
          thumbnail: thumbfs,
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
};
handler.help = ["bank"].map((v) => v + " (Ⓕ)");
handler.tags = ["rpg"];
handler.command = ["bank"];

module.exports = handler;
