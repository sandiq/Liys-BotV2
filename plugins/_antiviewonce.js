const { downloadContentFromMessage } = require('@adiwajshing/baileys')
let handler = m => m

handler.before = async function (m) {
    let chat = db.data.chats[m.chat]
    if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return
    if (!chat.viewonce) return
    if (m.mtype == 'viewOnceMessageV2') {
        let msg = m.message.viewOnceMessageV2.message
        let type = Object.keys(msg)[0]
        let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
        let buffer = Buffer.from([])
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk])
        }
        if (/video/.test(type)) {
            return conn.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m)
        } else if (/image/.test(type)) {
            return conn.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m)
        }
    }
}

module.exports = handler