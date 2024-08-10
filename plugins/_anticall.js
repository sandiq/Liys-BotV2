const {
  WAMessageStubType
} = require('@adiwajshing/baileys')
var {
  format
} = require('util');

let handler = m => m

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
  clearTimeout(this)
  resolve()
}, ms))

handler.before = async function (m, { conn }) {
  console.log(m.messageStubType)
  if (m.fromMe && m.isBaileys) return !0
  let text;
  let setting = global.db.data.settings[conn.user.jid]
  if (!setting.anticall) return

  if (m.messageStubType === (WAMessageStubType.CALL_MISSED_VOICE || WAMessageStubType.CALL_MISSED_VIDEO)) {
    await conn.reply(m.chat, 'Kamu telah di blockir!\nKarna melanggar aturan bot', null)
    await delay(1000)
    await conn.updateBlockStatus(m.chat, "block")
  }
}

module.exports = handler