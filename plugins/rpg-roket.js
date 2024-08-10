let handler = async (m, { conn }) => {
  let __timers = new Date() - global.db.data.users[m.sender].lastngojek;
  let _timers = 300000 - __timers;
  let order = global.db.data.users[m.sender].ojekk;
  let timers = clockString(_timers);
  let name = conn.getName(m.sender);
  let user = global.db.data.users[m.sender];

  if (new Date() - global.db.data.users[m.sender].lastngojek > 300000) {
    let randomaku1 = `${Math.floor(Math.random() * 10)}`;
    let randomaku2 = `${Math.floor(Math.random() * 10)}`;
    let randomaku4 = `${Math.floor(Math.random() * 5)}`;
    let randomaku3 = `${Math.floor(Math.random() * 10)}`;
    let randomaku5 = `${Math.floor(Math.random() * 10)}`.trim();

    let rbrb1 = randomaku1 * 2;
    let rbrb2 = randomaku2 * 10;
    let rbrb3 = randomaku3 * 1;
    let rbrb4 = randomaku4 * 15729;
    let rbrb5 = randomaku5 * 120;

    var zero1 = `${rbrb1}`;
    var zero2 = `${rbrb2}`;
    var zero3 = `${rbrb3}`;
    var zero4 = `${rbrb4}`;
    var zero5 = `${rbrb5}`;

    var dimas = `🌕


▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▄▄▄▒▒▒█▒▒▒▒▄▒▒▒▒▒▒▒▒
▒█▀█▀█▒█▀█▒▒█▀█▒▄███▄▒
░█▀█▀█░█▀██░█▀█░█▄█▄█░
░█▀█▀█░█▀████▀█░█▄█▄█░
████████▀█████████████
🚀

👨‍🚀 Memulai penerbangan....`;

    var dimas2 = `🌕


🚀
▒▒▄▄▄▒▒▒█▒▒▒▒▄▒▒▒▒▒▒▒▒
▒█▀█▀█▒█▀█▒▒█▀█▒▄███▄▒
░█▀█▀█░█▀██░█▀█░█▄█▄█░
░█▀█▀█░█▀████▀█░█▄█▄█░
████████▀█████████████

➕ Dalam penerbangan....`;

    var dimas3 = `🌕🚀


▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▄▄▄▒▒▒█▒▒▒▒▄▒▒▒▒▒▒▒▒
▒█▀█▀█▒█▀█▒▒█▀█▒▄███▄▒
░█▀█▀█░█▀██░█▀█░█▄█▄█░
░█▀█▀█░█▀████▀█░█▄█▄█░
████████▀█████████████

➕ Sampai di tujuan....`;

    var dimas4 = `🌕🚀\n\n\n➕ Sukses Mendarat.... 👨‍🚀`;

    var hsl = `**—[ Hasil Ngeroket ${name} ]—*\n➕ 💹 Uang = [ ${zero4} ]\n➕ ✨ Exp = [ ${zero5} ]\n➕ 😍 Mendarat Selesai = +1\n➕ 📥 Total Mendarat Sebelumnya : ${order}`;

    var dimas5 = `*👋 HALLO, Waktunya misi Ke bulan Lagi kawan.*`;

    global.db.data.users[m.sender].money += rbrb4;
    global.db.data.users[m.sender].exp += rbrb5;
    global.db.data.users[m.sender].ojekk += 1;
    
    const ndyzz = [
      dimas,
      dimas2,
      dimas3,
      dimas4,
      hsl
    ]
    
    let { key } = await conn.sendMessage(
      m.chat,
      { text: "🔍 Mencari Pencuri....." },
      { quoted: m },
    );
    for (let i of ndyzz) {
      await conn.delay(3000);
      await conn.sendMessage(m.chat, { text: i, edit: key }, { quoted: m });
    }

    setTimeout(() => {
      m.reply(`${dimas5}`);
    }, 79200000);
    user.lastngojek = new Date() * 1;
  } else
    conn.reply(
      m.chat,
      `Sepertinya Anda Sudah Kecapean Silahkan Istirahat Dulu sekitar\n🕔 ${timers}`,
      m,
    );
};
handler.help = ["roket"].map((v) => v + " (Ⓕ)");
handler.tags = ["rpg"];
handler.command = ["roket"];
handler.register = true;

module.exports = handler;

function clockString(ms) {
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [
    "\n" + d,
    " *Days ☀️*\n ",
    h,
    " *Hours 🕐*\n ",
    m,
    " *Minute ⏰*\n ",
    s,
    " *Second ⏱️* ",
  ]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
