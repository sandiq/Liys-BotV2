let handler = async (m, {
  conn
}) => {
  let __timers = (new Date - global.db.data.users[m.sender].lastlont)
  let _timers = (500000 - __timers)
  let timers = clockString(_timers)
  let user = global.db.data.users[m.sender]
  if (new Date - global.db.data.users[m.sender].lastlont > 500000) {
    let hsl = `Kamu Terbaring Lemas Karna Melakukan Skidipapap 24 Jam Tetapi Kamu Mendapatkan:
    Uang: 
    Exp: 10000
    Emas: 1
    Dan Gratis Boba + Nasi Padang
    `
    global.db.data.users[m.sender].money += 300000;
    global.db.data.users[m.sender].exp += 10000;
    global.db.data.users[m.sender].gold += 1;
    global.db.data.users[m.sender].warn += 1;
    
    const ndyzz = [
      `🚗 Kamu Mendapatkan Pelanggan Dan Pergi Ke Hotel`,
      `Kamu Mulai Melakukan Skidipapap Dengannya 😩💦`,
      `Kamu Terbaring Lemas Karna Melakukan Skidipapap 24 Jam`,
      `*—[ Hasil Ngelonte ${await conn.getName(m.sender)} ]—*\n➕ 💹 Uang = [ Rp.300000 ]\n➕ ✨ Exp = [ 10000 ]\n➕ 📛 Warn = +1`
    ];

    let { key } = await conn.sendMessage(
      m.chat,
      { text: "🔍 Sedang Mencari Pelanggan..." },
      { quoted: m },
    );
    for (let i of ndyzz) {
      await conn.delay(3000);
      await conn.sendMessage(m.chat, { text: i, edit: key }, { quoted: m });
    }
    user.lastlont = new Date * 1
  } else conn.reply(m.chat, `*Kamu Sudah Kecapekan*\n*Silahkan Istirahat Dulu Selama* ${timers}`, m)
}

handler.help = ["ngelonte"].map((v) => v + " (Ⓕ)");
handler.tags = ["rpg"];
handler.command = ["ngelonte"];
handler.register = true;

module.exports = handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  // console.log({ ms, h, m, s });
  return [h,
    m,
    s].map((v) => v.toString().padStart(2, 0)).join(":");
}