var handler = async (m, { conn, usedPrefix: _p }) => {
    let info = `*ᴏʀᴀɴɢ ʏᴀɴɢ ᴍᴇɴɢᴜᴄᴀᴘᴋᴀɴ ꜱᴀʟᴀᴍ ꜱᴇᴘᴇʀᴛɪ ɪɴɪ ᴍᴀᴋᴀ ɪɑ ᴍᴇɴᴅᴀᴘᴛᴋᴀɴ 30 ᴘᴀʜᴀʟᴀ, ᴋᴇᴍᴜᴅɪᴀɴ, ᴏʀᴀɴɢ ʏᴀɴɢ ᴅɪʜᴀᴅᴀᴘᴀɴ ᴀᴛᴀᴜ ᴍᴇɴᴅᴇɴɢᴀʀɴʏᴀ ᴍᴇᴍʙᴀʟᴀꜱ ᴅᴇɴɢᴀɴ ᴋᴀʟɪᴍᴀᴛ ʏᴀɴɢ ꜱᴀᴍᴀ ʏᴀɪᴛᴜ ᴡᴀᴀʟᴀɪᴋᴜᴍᴜsꜱᴀʟᴀᴍ ᴡᴀʀᴀʜᴍᴀᴛᴜʟʟᴀʜɪ ᴡᴀʙᴀʀᴀᴋᴀᴛᴜʜ” ᴀᴛᴀᴜ ᴅɪᴛᴀᴍʙᴀʜ ᴅᴇɴɢᴀɴ ʏᴀɴɢ ʟᴀɪɴ (ᴡᴀʀɪᴅʜᴡᴀᴀɴᴀ). ᴀʀᴛɪɴʏᴀ ꜱᴇʟᴀɪɴ ᴅᴀʀɪᴘᴀᴅᴀ ᴅᴏ'ᴀ ꜱᴇʟᴀᴍᴀᴛ ᴊᴜɢᴀ ᴍᴇᴍɪɴᴛᴀ ᴘᴀᴅᴀ ᴀʟʟᴀʜ ꜱᴡᴛ*\nSumber: https://rumaysho.com/2677-lebih-sempurna-dalam-salam-lebih-baik.html#:~:text=Disebutkan%20dalam%20sunan%20An%20Nasai,%20ada%20seseorang%20mendatangi%20beliau%20lantas%20mengucapkan%20salam`

    if (m.text.match(/assalamu'alaikum/i)) {
        info = `*ᴏʀᴀɴɢ ʏᴀɴɢ ᴍᴇɴɢᴜᴄᴀᴘᴋᴀɴ ꜱᴀʟᴀᴍ ꜱᴇᴘᴇʀᴛɪ ɪɴɪ ᴍᴀᴋᴀ ɪɑ ᴍᴇɴᴅᴀᴘᴛᴋᴀɴ 30 ᴘᴀʜᴀʟᴀ, ᴋᴇᴍᴜᴅɪᴀɴ, ᴏʀᴀɴɢ ʏᴀɴɢ ᴅɪʜᴀᴅᴀᴘᴀɴ ᴀᴛᴀᴜ ᴍᴇɴᴅᴇɴɢᴀʀɴʏᴀ ᴍᴇᴍʙᴀʟᴀꜱ ᴅᴇɴɢᴀɴ ᴋᴀʟɪᴍᴀᴛ ʏᴀɴɢ ꜱᴀᴍᴀ ʏᴀɪᴛᴜ ᴡᴀᴀʟᴀɪᴋᴜᴍᴜsꜱᴀʟᴀᴍ ᴡᴀʀᴀʜᴍᴀᴛᴜʟʟᴀʜɪ ᴡᴀʙᴀʀᴀᴋᴀᴛᴜʜ” ᴀᴛᴀᴜ ᴅɪᴛᴀᴍʙᴀʜ ᴅᴇɴɢᴀɴ ʏᴀɴɢ ʟᴀɪɴ (ᴡᴀʀɪᴅʜᴡᴀᴀɴᴀ). ᴀʀᴛɪɴʏᴀ ꜱᴇʟᴀɪɴ ᴅᴀʀɪᴘᴀᴅᴀ ᴅᴏ'ᴀ ꜱᴇʟᴀᴍᴀᴛ ᴊᴜɢᴀ ᴍᴇᴍɪɴᴛᴀ ᴘᴀᴅᴀ ᴀʟʟᴀʜ ꜱᴡᴛ*\nSumber: https://rumaysho.com/2677-lebih-sempurna-dalam-salam-lebih-baik.html#:~:text=Disebutkan%20dalam%20sunan%20An%20Nasai,%20ada%20seseorang%20mendatangi%20beliau%20lantas%20mengucapkan%20salam`;
    }
    
    let waalaikumsalam = `📚 _وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_\n_wa\'alaikumussalam wa rahmatullahi wa barakatuh_ 🙏`;

    await conn.sendMessage(m.chat, {
        react: {
            text: '🙏',
            key: m.key,
        }
    });
    await conn.reply(m.chat, waalaikumsalam, m);
    await conn.reply(m.chat, info, m);
}

// handler.customPrefix = /^(assalam(ualaikum)?|(salamualaiku|(sa(lamu|m)liku|sala))m)$/i;

handler.customPrefix = /^(assalamualaikum)$/i;


handler.command = new RegExp;

//module.exports = handler;
