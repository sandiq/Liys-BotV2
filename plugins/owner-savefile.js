let fs = require("fs");

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} *[filename]*`;

  if (command === "sf") {
    if (!m.quoted) throw `*[ ! ] Reply Your Progress Code*`;
    let path = `plugins/${text.split(".js")[0]}.js`;
    await fs.writeFileSync(path, m.quoted.text);
    let key = await conn.sendMessage(
      m.chat,
      { text: "*[ SAVING CODE... ]*" },
      { quoted: m },
    );
    await conn.sendMessage(
      m.chat,
      {
        text: `*[ SUCCES SAVING CODE ]*\n\n\`\`\`${m.quoted.text}\`\`\``,
        edit: key.key,
      },
      { quored: m },
    );
  } else if (command === "df") {
    let path = `plugins/${text.split(".js")[0]}.js`;
    let key = await conn.sendMessage(
      m.chat,
      { text: "*[ DELETE FILE... ]*" },
      { quoted: m },
    );
    if (!fs.existsSync(path))
      return conn.sendMessage(
        m.chat,
        { text: `*[ FILE NOT FOUND ]*`, edit: key.key },
        { quored: m },
      );
    fs.unlinkSync(path);
    await conn.sendMessage(
      m.chat,
      { text: `*[ SUCCESS DELETE FILE ]*`, edit: key.key },
      { quored: m },
    );
  }
};

handler.help = ["sf", "df"].map((v) => v + " (Ⓞ)");
handler.tags = ["owner"];
handler.command = ["sf","df"];
handler.rowner = true;
module.exports = handler;
