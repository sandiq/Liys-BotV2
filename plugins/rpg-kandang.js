let handler = async (m, { conn, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  let cap = `*━━━ ❨ Kandang Buruan ❩ ━━┄┈*
	
=> *Berikut Kandang :*  @${m.sender.split`@`[0]}
	
*🐂 = [ ${user.banteng || "Tidak punya"} ] banteng*
*🐅 = [ ${user.harimau || "Tidak punya"} ] harimau*
*🐘 = [ ${user.gajah || "Tidak punya"} ] gajah*
*🐐 = [ ${user.kambing || "Tidak punya"} ] kambing*
*🐼 = [ ${user.panda || "Tidak punya"} ] panda*
*🐊 = [ ${user.buaya || "Tidak punya"} ] buaya*
*🐃 = [ ${user.kerbau || "Tidak punya"} ] kerbau*
*🐮 = [ ${user.sapi || "Tidak punya"} ] sapi*
*🐒 = [ ${user.monyet || "Tidak punya"} ] monyet*
*🐗 = [ ${user.babihutan || "Tidak punya"} ] babihutan*
*🐖 = [ ${user.babi || "Tidak punya"} ] babi*
*🐓 = [ ${user.ayam || "Tidak punya"} ] ayam*
	
Gunakan *${usedPrefix}sell* untuk dijual atau *${usedPrefix}cook* untuk dijadikan bahan masakan.`;

  conn.reply(m.chat, cap, m, { mentions: await conn.parseMention(cap) });
};

handler.help = ["kandang"].map((v) => v + " (Ⓕ)");
handler.tags = ["rpg"];
handler.command = ["kandang"];

module.exports = handler;