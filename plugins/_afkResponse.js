let handler = (m) => m;
handler.before = async (m) => {
  let user = global.db.data.users[m.sender];
  let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender]: [])])]
  for (let jid of mentionUser) {
    let user = global.db.data.users[jid]
    if (!user) continue
    let afkTime = user.afkTime
    if (!afkTime || afkTime < 0) continue
    let reason = user.afkReason || ''
    m?.reply(`Jangan tag! dia sedang AFK ${reason ? 'dengan alasan ' + reason: 'tanpa alasan'} selama ${clockString(new Date - afkTime)}`.trim())
  }
  if (global.db.data.users[m.sender].afkTime > -1) {
    let user = global.db.data.users[m.sender]
    m?.reply(`kamu kembali setelah *${user.afkReason ? user.afkReason: 'afk'}* selama *${clockString(new Date - user.afkTime)}*`.trim())
    user.afkTime = -1
    user.afkReason = ''
    if (global.db.data) await global.db.write();
  }
  return true;
};

module.exports = handler;

function clockString(ms) {
  let h = isNaN(ms) ? "--": Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--": Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--": Math.floor(ms / 1000) % 60;
  return [h,
    m,
    s].map((v) => v.toString().padStart(2, 0)).join(":");
}