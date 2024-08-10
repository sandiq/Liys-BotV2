const { toAudio } = require('../lib/converter')
let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (!/video|audio/.test(mime)) throw `*• Example :* ${usedPrefix + command} *[reply/send video]*`
  let media = await q.download()
  let audio = await toAudio(media)
 m.reply(done, audio.data)
}
handler.help =  ["tomp3","toaudio"].map((v) => v + " (Ⓕ)");
handler.tags = ['tools'];
handler.command = ["tomp3","toaudio"];

module.exports = handler