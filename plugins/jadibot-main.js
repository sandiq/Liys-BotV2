let baileys = require("@adiwajshing/baileys");
let {
  useMultiFileAuthState,
  DisconnectReason,
  makeInMemoryStore,
  jidNormalizedUser,
  makeCacheableSignalKeyStore,
  PHONENUMBER_MCC,
} = baileys;
let { Boom } = require("@hapi/boom");
let NodeCache = require("node-cache");
let Pino = require("pino");
let simple = require("../lib/simple");
let fs = require("fs");
if (global.ak instanceof Array) console.log();
else global.ak = [];

let handler = async (m, { conn, args, prefix, command, isOwner, text }) => {
  let user = global.db.data.users[m.sender];
  let ak = global.conn;
  
  async function startJadiBotz() {
    const store = makeInMemoryStore( {
  		logger: Pino().child({
  			level: "silent", stream: "store"
  		})
  	});
  
    let authFile = "src/jadibot/" + m.sender.split("@")[0];
    let isInit = !fs.existsSync(authFile);
    let { state, saveCreds } = await useMultiFileAuthState(authFile);
    let msgRetryCounterCache = new NodeCache();
  
    const config = {
      logger: Pino({ level: "fatal" }).child({ level: "fatal" }),
      printQRInTerminal: false,
      mobile: false,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(
          state.keys,
          Pino({ level: "fatal" }).child({ level: "fatal" }),
        ),
      },
      browser: ["Liys", "Chrome", "20.0.04"],
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      msgRetryCounterCache,
      defaultQueryTimeoutMs: undefined,
    };
    conn = simple.makeWASocket(config);
    let ev = conn.ev
  
    if (!conn.authState.creds.registered) {
      let nomernya = m.sender.split("@")[0];
      //console.log(nomernya)
      let code = await conn.requestPairingCode(nomernya);
      setTimeout(async () => {
        let hasilcode = code?.match(/.{1,4}/g)?.join("-") || code;
        let key = await ak.reply(
          m.chat,
          "*[ System Guide ]* Kamu telah mendapatkan notifikasi dari perangkat tautan, salin kode dibawah, tekan tombol notifikasi, kemudian tempel kode tersebut maka kamu akan menjadi bot sementara",
          m,
        );
        await ak.reply(m.chat, hasilcode, key);
      }, 3000);
    }
    store.bind(conn.ev);
    
    const connectionUpdate = async (update) => {
			const {
				connection,
				lastDisconnect
			} = update
			try {
				if (connection == "connecting") {
          console.log(connection);
        } else if (connection == "open") {
          ak.reply(m.chat, `*[ System Notice ]* Success Comment To WhatsApp`);
          global.ak.push(conn);
        } else if (connection === "close") {
          let statusCode = new Boom(lastDisconnect?.error)?.output.statusCode;
          if (statusCode === DisconnectReason.badSession) {
            console.log("Bad Session File, Please Delete Session and Scan Again");
            ak.logout();
            ak.reply(m.chat, '*[ System Notice ]" Deleting sessions...');
          } else if (statusCode === DisconnectReason.connectionClosed) {
            console.log("Connection closed, reconnecting....");
            console.log(startJadiBotz());
          } else if (statusCode === DisconnectReason.connectionLost) {
            console.log("Connection Lost from Server, reconnecting...");
            console.log(startJadiBotz());
          } else if (statusCode === DisconnectReason.connectionReplaced) {
            console.log(
              "Connection Replaced, Another New Session Opened, Please Close Current Session First",
            );
            ak.logout();
          } else if (statusCode === DisconnectReason.loggedOut) {
            console.log("Device Logged Out, Please Scan Again And Run.");
            ak.logout();
          } else if (statusCode === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting...");
            console.log(startJadiBotz());
            ak.reply(m.chat, "*[ System Notice ]* merestart");
          } else if (statusCode === DisconnectReason.timedOut) {
            console.log("Connection TimedOut, Reconnecting...");
            console.log(startJadiBotz());
          } else {
            ak.end("Unknown DisconnectReason: " + statusCode + "|" + connection);
          }
        }
			} catch (err) {
				console.log('Error Di Connection.update '+err)
			}
		}
		const callUpdate = async (celled) => {
		  const melah = await conn.decodeJid(conn.user.id)
		  if (global.db.data.settings[melah].anticall) {
		    console.log(celled)
		    for (let kopel of celled) {
		      if (kopel.isGroup == false) {
		        if (kopel.status == "offer") {
		          const crotor = (kopel && kopel?.from && [melah, ...global.nomerowner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(kopel?.from)) || false;
		          if (crotor) return
		          //await conn.rejectCall(kopel.from);
		          const tek = `*${conn.user.name}* tidak bisa menerima panggilan ${kopel.isVideo ? `video` : `suara`}. Maaf @${kopel.from.split('@')[0]} kamu akan diblokir. Silahkan hubungi Owner untuk membuka blok !`
		          const nomer = await conn.sendContactArray(kopel.from,[[`${owner}`, `${await conn.getName(owner+'@s.whatsapp.net')}`, `💌 Developer Bot `, `ɴᴏᴛ ғᴀᴍᴏᴜs ᴊᴜsᴛ ᴀʟᴏɴᴇ ʙᴏʏ`, `sandikurniawan12042004@gmail.com`, `🇮🇩 Indonesia`, `📍 https://github.com/NdyZz`, `👤 ᴏᴡɴᴇʀ Liys`],[`${NumberBot}`, `${await conn.getName(conn.user.id)}`, `🎈 ʙᴏᴛ ᴡʜᴀᴛsᴀᴘᴘ`, `📵 ᴅᴏɴᴛ sᴘᴀᴍ/ᴄᴀʟʟ ᴍᴇ 😢`, `ɴᴏᴛʜɪɴɢ`, `🇮🇩 Indonesia`, `📍 https://github.com/NdyZz`, `ʜᴀɴʏᴀ ʙᴏᴛ ʙɪᴀsᴀ ʏᴀɴɢ ᴋᴀᴅᴀɴɢ sᴜᴋᴀ ᴇʀʀᴏʀ ☺`]], null)
		          await conn.sendMessage(kopel.from,{text: tek, mentions: await parseMentions(tek)}, {quoted:nomer})
		          await sleep(5000)
		          await conn.updateBlockStatus(kopel.from, "block")
		        }
		      }
		    }
		  }
		}
		const groupUpdate = async (anu) => {
		  console.log(anu)
		  for (const lot of anu.participants) {
		    let pp = await conn.profilePictureUrl(lot, 'image').catch((_) => ppkosong)
		    let user = await conn.getName(lot) || lot || ""
		    let metadata = await conn.groupMetadata(anu.id).catch(e => {});
		    let gcname = metadata?.subject || anu.id || ""
  		  if (anu.action === "add") {
  		    if (global.db.data.chats[anu.id].welcome) {
  		      const welcome = `Hi @${lot.split("@")[0]}, Welcome to ${gcname}`;
    		    try {
              await conn.sendMessage(anu.id, {image: {url: pp}, caption: welcome, mentions: await parseMentions(welcome)})
    		    } catch (e) {
    		      await conn.sendMessage(anu.id, {text: welcome, mentions: await parseMentions(welcome)})
    		    }
  		    }
  		  }
  		  if (anu.action === "remove") {
  		    if (global.db.data.chats[anu.id].goodbay) {
  		      const goodbay = `Goodbye @${lot.split("@")[0]} 👋`;
    		    try {
              await conn.sendMessage(anu.id, {image: {url: pp}, caption: goodbay, mentions: await parseMentions(goodbay)})
    		    } catch (e) {
    		      await conn.sendMessage(anu.id, {text: goodbay, mentions: await parseMentions(goodbay)})
    		    }
  		    }
  		  }
  		  if (anu.action === "promote") {
  		    const promote = `@${lot.split("@")[0]} *Promote* to Admin`;
  		    try {
            await conn.sendMessage(anu.id, {image: {url: pp}, caption: promote, mentions: await parseMentions(promote)})
  		    } catch (e) {
  		      await conn.sendMessage(anu.id, {text: promote, mentions: await parseMentions(promote)})
  		    }
  		  }
  		  if (anu.action === "demote") {
  		    const demote = `@${lot.split("@")[0]} *Demote* from Admin`;
  		    try {
            await conn.sendMessage(anu.id, {image: {url: pp}, caption: demote, mentions: await parseMentions(demote)})
  		    } catch (e) {
  		      await conn.sendMessage(anu.id, {text: demote, mentions: await parseMentions(demote)})
  		    }
  		  }
		  }
		}
		const messagesUpdate = async (chatUpdate) => {
			try {
				const mek = chatUpdate.messages[0]
				if (!mek.message) return
				mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message: mek.message
				if (mek.key && mek.key.remoteJid === 'status@broadcast') {
					await conn.readMessages([mek.key])
				}
				if (!conn.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
				if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
				const m = simple.smsg(conn, mek, store)
				require("../handler")(conn, m, chatUpdate, store)
			} catch (err) {
				console.log(err)
			}
		}
		const contactUpdate = async (update) => {
			for (let contact of update) {
				let id = await conn.decodeJid(contact.id);
				if (store && store.contacts) store.contacts[id] = {
					id,
					name: contact.notify
				};
			}
		}
    if (!isInit) {
      conn.ev.off('call', callUpdate)
  		conn.ev.off('group-participants.update', groupUpdate)
  		conn.ev.off("messages.upsert", messagesUpdate);
  		conn.ev.off("contacts.update", contactUpdate);
  		conn.ev.off('connection.update', connectionUpdate)
  		conn.ev.off("creds.update", saveCreds);
    }
		
    conn.ev.on('call', callUpdate)
		conn.ev.on('group-participants.update', groupUpdate)
		conn.ev.on("messages.upsert", messagesUpdate);
		conn.ev.on("contacts.update", contactUpdate);
		conn.ev.on('connection.update', connectionUpdate)
		conn.ev.on("creds.update", saveCreds);
		
		conn.public = true;
		isInit = true;
		return true;
  }
  startJadiBotz()
};
handler.help = ["jadibot"].map((v) => v + " (Ⓟ)");
handler.tags = ["jadibot"];
handler.command = ["jadibot"];
handler.premium = true;
handler.private = true;
module.exports = handler;
