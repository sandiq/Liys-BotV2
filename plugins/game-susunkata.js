const fs = require('fs');
let timeout = 120000;
let poin = 4999;
let handler = async (m, {
    conn,
    command,
    prefix
}) => {
    global.susunkata = global.susunkata ? global.susunkata : {}
    let id = m.chat
    if (id in global.susunkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', global.susunkata[id][0])
        throw false
    }
    let src = JSON.parse(fs.readFileSync("./src/games/susunkata.json"));
    let json = src[Math.floor(Math.random() * src.length)]
    console.log('Jawaban:', json.jawaban)
    global.susunkata[id] = [
        await conn.sendMessage(m.chat, {
          text: `*_🎮 SUSUN KATA 🎮_*\n\nSoal: ${json.soal}\nTipe: ${json.tipe}\nWaktu: ${(timeout / 1000).toFixed(2)} detik\nBonus: ${poin} XP\n\nhelp = Bantuan\nnyerah = Menyerah`
        }, {
          quoted: fkontak
        }),
        json, poin,
        setTimeout(() => {
            if (global.susunkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, global.susunkata[id][0])
            delete global.susunkata[id]
        }, timeout)
    ]
}
handler.help = ['susunkata'].map((v) => v + " (Ⓕ)");
handler.tags = ['game'];
handler.command = ["susunkata"];

module.exports = handler;
