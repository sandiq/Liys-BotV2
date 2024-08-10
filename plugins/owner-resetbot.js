let handler = async (m, { conn, isROwner, text }) => {
  let { spawn, exec } = require('child_process');
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply('Sedang Merestart Bot...\nMohon tunggu beberapa menit.')
    try {
      process.send('reset')
    } catch (e) {
      exec("pm2 restart all", async (err, stdout) => {})
    }
  } else throw '_eeeeeiiittsssss..._'
}

handler.help = ['restart'].map((a) => a + " (Ⓞ)");
handler.tags = ['owner'];
handler.command = ["restart"];
handler.rowner = true;
module.exports = handler;
