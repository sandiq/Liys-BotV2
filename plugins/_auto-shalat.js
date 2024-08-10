async function before(m) {
  global.db.data.chats[m.chat].autosholat = global.db.data.chats[m.chat].autosholat ? global.db.data.chats[m.chat].autosholat: {};
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0]: m.fromMe ? global.db.data.chats[m.chat].user.jid: m.sender;
  let name = global.db.data.users[m.sender].name ? global.db.data.users[m.sender].name : await m.pushName || await conn.getName(who);
  let id = m.chat;
  if (id in global.db.data.chats[m.chat].autosholat) {
    return false;
  }
  let jadwalSholat = {
    Fajr: "04:40",
    Dhuhr: "12:05",
    Asr: "15:05",
    Maghrib: "18:21",
    Isha: "19:31",
    test: "22:25"
  };
  const cities = ["Jakarta" , "Jayapura", "Makassar"];
  for (let city of cities) {
    const date = new Date(new Date().toLocaleString("en-US", {timeZone: `Asia/${city}`}))
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
      if (timeNow === waktu) {
        let caption = `Hai kak ${name},\nWaktu *${sholat}* telah tiba, ambilah air wudhu dan segeralah shalat!(•̀ᴗ•́)و ̑̑\n\n*${waktu}*\n_untuk wilayah ${city} dan sekitarnya._`;
        global.db.data.chats[m.chat].autosholat[id] = [
          conn.reply(m.chat, caption, null),
          setTimeout(() => {
            global.db.data.chats[m.chat].autosholat = null;
          }, 57000)
        ];
      }
    }
  }
}

module.exports = {
  before,
};