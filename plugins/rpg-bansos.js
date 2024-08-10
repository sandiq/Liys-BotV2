let fs = require("fs");

let handler = async (m, { conn, args, usedPrefix }) => {
  try {
    global.DATABASE.data.users[m.sender].lastbansos =
      global.db.data.users[m.sender].lastbansos || 0;
    let randomaku = `${Math.floor(Math.random() * 101)}`.trim();
    let randomkamu = `${Math.floor(Math.random() * 81)}`.trim(); //hehe Biar Susah Menang :v
    let Aku = randomaku * 1;
    let Kamu = randomkamu * 1;
    let kbansos = "https://telegra.ph/file/afcf9a7f4e713591080b5.jpg";
    let mbansos = "https://telegra.ph/file/d31fcc46b09ce7bf236a7.jpg";
    let botol = global.wm;
    //let name = conn.getName[m.sender]
    let __timers = new Date() - global.db.data.users[m.sender].lastbansos;
    let _timers = 300000 - __timers;
    let timers = clockString(_timers);
    let user = global.db.data.users[m.sender];
    if (new Date() - global.db.data.users[m.sender].lastbansos > 300000) {
      if (Aku > Kamu) {
        conn.sendFile(
          m.chat,
          kbansos,
          "b.jpg",
          `Kamu Tertangkap Setelah Kamu korupsi dana bansos,  Dan kamu harus membayar denda 3 Juta rupiah`,
          m,
        );
        user.money -= 3000000;
        global.db.data.users[m.sender].lastbansos = new Date() * 1;
      } else if (Aku < Kamu) {
        user.money += 3000000;
        conn.sendFile(
          m.chat,
          mbansos,
          "b.jpg",
          `Kamu berhasil  korupsi dana bansos,  Dan kamu mendapatkan 3 Juta rupiah`,
          m,
        );
        global.db.data.users[m.sender].lastbansos = new Date() * 1;
      } else {
        conn.sendButton(
          m.chat,
          [[`⋮☰ Menu`,`${usedPrefix}help`]],
          m,
          {body: `Sorry Gan Lu g Berhasil Korupsi bansos Dan Tidak masuk penjara karna kamu *melarikan diri🏃*`, footer: footer2}
        );
        global.db.data.users[m.sender].lastbansos = new Date() * 1;
      }
    } else
      conn.sendButton(
        m.chat,
        [[`⋮☰ Menu`,`${usedPrefix}help`]],
        m,
        {url: null, body: `Kamu sudah Melakukan Korupsi Bansos\nDan kamu harus menunggu selama agar bisa korupsi bansos kembali \n▸ 🕓 *${timers}*`, footer: botol}
      );
  } catch (e) {
    throw `${e}`;
  }
};

handler.help = ["bansos"].map((v) => v + " (Ⓕ)");
handler.tags = ["rpg"];
handler.command = ["bansos"];

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
