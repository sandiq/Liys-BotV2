const fs = require("fs");
const didyoumean = require('didyoumean')
const similarity = require('similarity')

let handler = m => m
handler.before = async function (m, {
  conn, budy, prefix
}) {
  if (m.text.startsWith(prefix)) {
    let noPrefix = m.text.replace(prefix, '')
    let args = noPrefix.trim().split` `.slice(1)
    let text = args.join` `
    let help = []
    let helpCase = fiturName().map(v => help.push(v));
    let helpPlugins = Object.values(global.plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
    helpPlugins.map(v => help.push(v.split(" ")[0]))
    if (help.includes(noPrefix)) return
    let mean = didyoumean(noPrefix.toLowerCase(), help)
    let sim = similarity(noPrefix, mean)
    let som = sim * 100
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0]: m.fromMe ? conn.user.id: m.sender
    let name = await conn.getName(who)
    let caption = `Command ${prefix+noPrefix.toLowerCase()} tidak ditemukan, mungkin ini yang kamu maksud\n➠ *${prefix + mean}* *(${Number(sim * 100).toFixed(2)}%)*`
    if (mean) conn.sendMessage(m.chat, {
      text: caption
    }, {
      quoted: m
    })

  }
}

module.exports = handler;

const fiturName = () => {
  const casenya = fs.readFileSync('./case/case.js').toString();
  const regex = /case\s+"(.*?)"/g;
  let match;
  let caseNames = [];
  while ((match = regex.exec(casenya)) !== null) {
    caseNames.push(match[1].replace(/\\"/g, '"'));
  }
  return caseNames;
}