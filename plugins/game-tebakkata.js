const fs = require('fs');
let timeout = 120000;
let poin = 4999;
let handler = async (m, {
    conn,
    command,
    prefix
}) => {
    global.tebakkata = global.tebakkata ? global.tebakkata : {}
    let id = m.chat
    if (id in global.tebakkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', global.tebakkata[id][0])
        throw false
    }
    let src = JSON.parse(fs.readFileSync("./src/games/tebakkata.json"));
    let json = src[Math.floor(Math.random() * src.length)]
    console.log('Jawaban:', json.jawaban)
    global.tebakkata[id] = [
        await conn.sendMessage(m.chat, {
          text: `*_🎮 TEBAK KATA 🎮_*\n\nSoal: ${json.soal}\nWaktu: ${(timeout / 1000).toFixed(2)} detik\nBonus: ${poin} XP & 0-${poin} Money\n\nhelp = Bantuan\nnyerah = Menyerah`
        }, {
          quoted: fkontak
        }),
        json, poin,
        setTimeout(() => {
            if (global.tebakkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, global.tebakkata[id][0])
            delete global.tebakkata[id]
        }, timeout)
    ]
}
handler.help = ['tebakkata'].map((a) => a + " (Ⓕ)");
handler.tags = ['game'];
handler.command = ["tebakkata"];

module.exports = handler
