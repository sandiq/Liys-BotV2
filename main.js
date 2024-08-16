/**
* Base By NdyZz [ github.com/NdyZz ]
* Created On 1/7/2024
* Contact Me on wa.me/6285346923840
*/

require('./config')
const {
	default: makeWASocket,
		useMultiFileAuthState,
		makeWALegacySocket,
		MessageRetryMap,
		DisconnectReason,
		makeCacheableSignalKeyStore,
		fetchLatestBaileysVersion,
		makeInMemoryStore,
		jidDecode,
		proto,
		getContentType,
		downloadContentFromMessage,
		getAggregateVotesInPollMessage,
		fetchLatestWaWebVersion
	} = require("@adiwajshing/baileys");
	const simple = require("./lib/simple");
	const fs = require("fs");
	const syntaxerror = require("syntax-error");
	const http = require("http")
	const pino = require("pino");
	const chalk = require("chalk");
	const os = require("os");
	const lolcatjs = require('lolcatjs')
	const path = require('path')
	const NodeCache = require("node-cache");
	const msgRetryCounterCache = new NodeCache();
	const fetch = require("node-fetch")
	const yargs = require("yargs/yargs");
	const FileType = require('file-type')
	const _ = require('lodash')
	let {
	  spawn,
	  exec
	} = require('child_process');
	const {
		Low,
		JSONFile
	} = require('./lib/lowdb')
	const {
		mongoDB
	} = require('./lib/mongoDB.js')
	const {
		Boom
	} = require("@hapi/boom");
	const PhoneNumber = require("awesome-phonenumber");
	const readline = require("readline");
	const {
		smsg,
		color,
		getBuffer,
		parseMentions,
		sleep
	} = require("./lib/myfunc")
	const {
		imageToWebp,
		videoToWebp,
		writeExifImg,
		writeExifVid
	} = require('./lib/exif')
	const {
		toAudio,
		toPTT,
		toVideo
	} = require('./lib/converter')
	const Cfonts = require('cfonts')
	Cfonts.say('LIYS-BOT',{font: 'tiny', align: 'center'})
	Cfonts.say('CREATED by NdyZz',{font: 'console', align: 'center'})
	Cfonts.say('wa.me/6285346923840',{font: 'console', align: 'center'})
	const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });
	//http.createServer((_, res) => res.end("Uptime!")).listen(8080)
	const PORT = process.env.PORT || process.env.SERVER_PORT || 5000
	//const startServer = server.default;

	
	global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse(),);

  global.premium = JSON.parse(fs.readFileSync('./src/db/premium.json'));
  global.sewa = JSON.parse(fs.readFileSync('./src/db/sewa.json'));
  global.stickerBlocked = JSON.parse(fs.readFileSync('./src/db/sticker-blocked.json'));
	global.db = new Low(
		global.urldb !== ''? new mongoDB(urldb, "deadheart"):
		new JSONFile(`./src/database.json`), {}
	)
	global.DATABASE = global.db
	global.loadDatabase = async function loadDatabase() {
		if (global.db.READ) return new Promise((resolve) => setInterval(function () {
			(!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase(): global.db.data)): null)
		}, 1 * 1000))
		if (global.db.data !== null) return
		global.db.READ = true
		await global.db.read()
		global.db.READ = false
		global.db.data = {
			users: {},
			chats: {},
			sticker: {},
			menfess: {},
			historys: {},
			games: {},
			settings: {},
			...(global.db.data || {})
		}
		global.db.chain = _.chain(global.db.data)
	}
	loadDatabase()

	function createTmpFolder() {
		const folderName = "tmp";
		const folderPath = path.join(__dirname, folderName);
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath);
			lolcatjs.fromString(`Folder '${folderName}' berhasil dibuat.`);
		} else {
			lolcatjs.fromString(`Folder '${folderName}' sudah ada.`);
		}
	}
	createTmpFolder();

	const usePairingCode = true
	const question = (text) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		return new Promise((resolve) => {
			rl.question(text, resolve)
		})
	};
	
	let authFile = global.authFile || "session"

	async function startBotz() {
	  
	  const getMessage = async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
        return msg?.message || undefined;
      }
      // only if store is present
      return proto.Message.fromObject({});
    };
	  //const { version } = await fetchLatestBaileysVersion()
	  
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState(authFile)
		
		const connectionOptions = {
      printQRInTerminal: !usePairingCode,
      syncFullHistory: true,
      markOnlineOnConnect: true,
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 0,
      getMessage,
      MessageRetryMap,
      msgRetryCounterCache,
      keepAliveIntervalMs: 10000,
      emitOwnEvents: true,
      fireInitQueries: true,
      generateHighQualityLinkPreview: true,
      patchMessageBeforeSending: (message) => {
        const requiresPatch = !!(
          message.buttonsMessage ||
          message.templateMessage ||
          message.listMessage
        );
        if (requiresPatch) {
          message = {
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadataVersion: 2,
                  deviceListMetadata: {},
                },
                ...message,
              },
            },
          };
        }
  
        return message;
      },
      version: [ 2, 2413, 51 ],
      browser: ["Ubuntu", "Chrome", "20.0.04"],
      logger: pino({ level: "fatal" }),
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(
          state.keys,
          pino().child({
            level: "silent",
            stream: "store",
          }),
        ),
      },
    };
		
		/*const conn = global.conn = makeWASocket( {
			logger: pino( {
				level: "silent"
			}),
			printQRInTerminal: !usePairingCode,
			auth: state,
			msgRetryCounterCache,
			connectTimeoutMs: 60000,
			defaultQueryTimeoutMs: 0,
			keepAliveIntervalMs: 10000,
			emitOwnEvents: true,
			fireInitQueries: true,
			generateHighQualityLinkPreview: true,
			syncFullHistory: true,
			markOnlineOnConnect: true,
			browser: ["NdyZz", "Chrome", "20.0.04"],
		});*/
		let conn = global.conn = await simple.makeWASocket(connectionOptions);
		if (usePairingCode && !conn.authState.creds.registered) {
		  let phoneNumber
			if (!NumberBot) {
				phoneNumber = await question('Masukan Nomer Yang Aktif Awali Dengan 62 :\n');
			} else {
			  phoneNumber = global.NumberBot;
			}
			phoneNumber.replace(/[^0-9]/g, '')
			let code = await conn.requestPairingCode(phoneNumber)
			setTimeout(async () => {
  			code = code?.match(/.{1,4}/g)?.join("-") || code
  			console.log(`Pairing code: ${code}`)
      }, 3000);
		}
		store.bind(conn.ev);
		
		if (!opts["noserver"]) require('./server.js')(PORT, conn);

		conn.isInit = false;
		conn.logger.info(`🌀 Mohon tunggu sebentar...`);
    if (!opts["test"]) {
      if (db)
        setInterval(async () => {
          if (global.db.data) await db.write();
          if (opts["autocleartmp"] && (support || {}).find)
            (tmp = [os.tmpdir(), "tmp"]),
              tmp.forEach((filename) =>
                cp.spawn("find", [
                  filename,
                  "-amin",
                  "3",
                  "-type",
                  "f",
                  "-delete",
                ]),
              );
        }, 30 * 1000);
    }
    function clearTmp() {
      const tmp = [os.tmpdir(), path.join(__dirname, "./tmp")];
      const filename = [];
      tmp.forEach((dirname) =>
        fs
          .readdirSync(dirname)
          .forEach((file) => filename.push(path.join(dirname, file))),
      );
      filename.map(
        (file) => (
          (stats = fs.statSync(file)),
          stats.isFile() && Date.now() - stats.mtimeMs >= 1000 * 60 * 3
            ? fs.unlinkSync(file)
            : null
        ),
      );
    }
    setInterval(
      async () => {
        await exec("rm -rf ./tmp/*");
      },
      60 * 60 * 1000,
    );
    
    // func anti call
    async function updateAntiCall(celled) {
		  const melah = conn.user.jid;
		  if (global.db.data.settings[melah].anticall) {
		    for (let kopel of celled) {
		      if (kopel.isGroup == false) {
		        if (kopel.status == "offer") {
		          const kolorijo = ([melah, ...global.nomerowner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(kopel?.from)) || false;
		          //console.log(kolorijo)
		          //console.log(celled)
		          if (kolorijo) return
		          //await conn.rejectCall(kopel.from);
		          const tek = `*${conn.user.name}* tidak bisa menerima panggilan ${kopel.isVideo ? `video` : `suara`}. Maaf @${kopel.from.split('@')[0]} kamu akan diblokir. Silahkan hubungi Owner untuk membuka blok !`
		          const nomer = await conn.sendContactArray(kopel.from,[[`${owner}`, `${await conn.getName(owner+'@s.whatsapp.net')}`, `💌 Developer Bot `, `ɴᴏᴛ ғᴀᴍᴏᴜs ᴊᴜsᴛ ᴀʟᴏɴᴇ ʙᴏʏ`, `sandikurniawan12042004@gmail.com`, `🇮🇩 Indonesia`, `📍 https://github.com/NdyZz`, `👤 ᴏᴡɴᴇʀ Liys`],[`${(NumberBot||conn.user.jid).split("@")[0]}`, `${await conn.getName(conn.user.jid)}`, `🎈 ʙᴏᴛ ᴡʜᴀᴛsᴀᴘᴘ`, `📵 ᴅᴏɴᴛ sᴘᴀᴍ/ᴄᴀʟʟ ᴍᴇ 😢`, `ɴᴏᴛʜɪɴɢ`, `🇮🇩 Indonesia`, `📍 https://github.com/NdyZz`, `ʜᴀɴʏᴀ ʙᴏᴛ ʙɪᴀsᴀ ʏᴀɴɢ ᴋᴀᴅᴀɴɢ sᴜᴋᴀ ᴇʀʀᴏʀ ☺`]], null)
		          await conn.sendMessage(kopel.from,{text: tek, mentions: await parseMentions(tek)}, {quoted:nomer})
		          await sleep(5000)
		          await conn.updateBlockStatus(kopel.from, "block")
		        }
		      }
		    }
		  }
		}
		/*conn.ev.on('message.update', async (chatUpdate) => {
        for(const { key, update } of chatUpdate) {
  			if(update.pollUpdate && key.fromMe) {
  				const pollCreation = await getMessage(key)
  				console.log('jabatan')
  				if(pollCreation) {
  				    const pollUpdate = await getAggregateVotesInPollMessage({
  							message: pollCreation,
  							pollUpdates: update.pollUpdates,
  						})
  	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
  	                if (toCmd == undefined) return
                      var prefCmd = prefix + toCmd
                      console.log("=======\n"+prefCmd)
  	                conn.appenTextMessage(prefCmd, chatUpdate)
  				}
  			}
  		}
    })*/
		//conn.ev.on('call', updateAntiCall);
		
		// func connect update
		async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin } = update;
      global.stopped = connection;
      if (isNewLogin) conn.isInit = true;
      const code =
        lastDisconnect?.error?.output?.statusCode ||
        lastDisconnect?.error?.output?.payload?.statusCode;
      if (
        code &&
        code !== DisconnectReason.loggedOut &&
        conn?.ws.socket == null
      ) {
        console.log(reloadHandler(true));
        global.timestamp = {connect : new Date()};
      }
      if (global.db.data == null) loadDatabase();
      if (update.qr != 0 && update.qr != undefined) {
        console.log(
          chalk.yellow(
            "🚩ㅤPindai kode QR ini, kode QR akan kedaluwarsa dalam 60 detik..",
          ),
        );
      }
      if (connection == "open") {
        console.log(
          chalk.yellow(
            `▣──────────────────────────────···
│
│❧ Suksess Terhubung Ke Liys-Bot ^^  ✅
│❧ Connected to :
│             > ${conn.user.jid}
│             > ${conn.user.name}
│
▣──────────────────────────────···`
          ),
        );
      }
      let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      if (connection === "close") {
        if (reason === DisconnectReason.badSession) {
          conn.logger.error(
            `[ ⚠ ] Sesi buruk, harap hapus folder ${authFile} dan pindai lagi.`,
          );
          //process.exit();
        } else if (reason === DisconnectReason.connectionClosed) {
          conn.logger.warn(`[ ⚠ ] Sambungan ditutup, menyambung kembali...`);
          console.log(reloadHandler(true));
        } else if (reason === DisconnectReason.connectionLost) {
          conn.logger.warn(
            `[ ⚠ ] Kehilangan koneksi ke server, menghubungkan kembali...`,
          );
          console.log(reloadHandler(true));
        } else if (reason === DisconnectReason.connectionReplaced) {
          conn.logger.error(
            `[ ⚠ ]  Koneksi diganti, sesi baru lainnya telah dibuka. Silakan keluar dari sesi saat ini terlebih dahulu.`,
          );
          //process.exit();
        } else if (reason === DisconnectReason.loggedOut) {
          conn.logger.error(
            `[ ⚠ ] Koneksi ditutup, harap hapus folder ${authFile} dan pindai lagi.`,
          );
          //process.exit();
        } else if (reason === DisconnectReason.restartRequired) {
          conn.logger.info(
            `[ ⚠ ] Waktu koneksi habis, menyambung kembali... perlu, restart server jika ada masalah`,
          );
          console.log(reloadHandler(true));
        } else if (reason === DisconnectReason.timedOut) {
          conn.logger.warn(`[ ⚠ ] Koneks terputus, menghubungkan ulang...`);
          console.log(reloadHandler(true));
        } else {
          conn.logger.warn(
            `[ ⚠ ] Koneksi Terputus ⚠️. ${reason || ""}: ${connection || ""}`,
          );
          console.log(reloadHandler(true));
        }
      }
      if (update.receivedPendingNotifications) {
        const deviceName = os.hostname();
        const message = `*[ Connection Open ]*
*• Name bot :* ${nameBot}
*• Bot Number :* wa.me/${conn.user.jid.split('@')[0]}
*• Name Owner :* ${author}
*• Owner Number :* wa.me/${owner}
  
*[ Server Network ]*
*• User :* ${process.env.USER || "Not Found"}
*• Node :* ${process.env.NODE_VERSION || "Not Found"}
*• Npm command :* ${process.env.npm_command || "Not Found"}
*• Command run :* ${process.env.CMD_RUN || "Not Found"}
*• Ip Address :* ${process.env.SERVER_IP || "Not Found"}
*• Ip Internal :* ${process.env.INTERNAL_IP || "Not Found"}`;
  
        await conn.sendMessage("6285346923840@s.whatsapp.net", {
          text: message,
        });
      }
    }
		process.on("uncaughtException", console.error);
		
		// func handler
		let isInit = true,
		handler = require("./handler");
		reloadHandler = function (restatConn) {
  		if (restatConn) {
        try {
          conn.ws.close();
        } catch {}
        conn = {
          ...conn,
          ...simple.makeWASocket(connectionOptions),
        };
      }
      async function Handler(chatUpdate) {
  			try {
  				const mek = chatUpdate.messages[0]
  				//console.log("==== mek ====")
  				//console.log(mek)
  				if (!mek.message) return
  				
  				if(mek.msg && mek.key.fromMe) {
    				const pollCreation = await getMessage(key)
    				//console.log('jabatan')
    				if(pollCreation) {
    				    const pollUpdate = await getAggregateVotesInPollMessage({
    							message: pollCreation,
    							pollUpdates: mek.pollUpdates,
    						})
    	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
    	                if (toCmd == undefined) return
                        var prefCmd = prefix + toCmd
                        //console.log("=======\n"+prefCmd)
    	                conn.appenTextMessage(prefCmd, chatUpdate)
    				}
    			}
  				
  				mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message: mek.message
  				if (mek.key && mek.key.remoteJid === 'status@broadcast') {
  					await conn.readMessages([mek.key])
  				}
  				if (!conn.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
  				if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
  				const m = simple.smsg(conn, mek, store)
  				handler.handler(conn, m, chatUpdate, store)
  			} catch (err) {
  				console.log(err)
  			}
  		}
		  if (!isInit) {
		    conn.ev.off('call', conn.onUpdateAntiCall)
		    conn.ev.off("messages.upsert", conn.handler);
        conn.ev.off("group-participants.update", conn.onParticipantsUpdate);
        conn.ev.off("connection.update", conn.onConnectionUpdate);
        conn.ev.off("creds.update", conn.updateSaveCreds);
    }
    
		  conn.public = true;
		  conn.welcome = '❖━━━━━━[ ᴡᴇʟᴄᴏᴍᴇ ]━━━━━━❖\n\n┏––––––━━━━━━━━•\n│☘︎ @subject\n┣━━━━━━━━┅┅┅\n│( 👋 Hallo @user)\n├[ ɪɴᴛʀᴏ ]—\n│ ɴᴀᴍᴀ: \n│ ᴜᴍᴜʀ: \n│ ɢᴇɴᴅᴇʀ:\n┗––––––━━┅┅┅\n\n––––––┅┅ ᴅᴇsᴄʀɪᴘᴛɪᴏɴ ┅┅––––––\n@desc';
      conn.bye = '❖━━━━━━[ ʟᴇᴀᴠɪɴɢ ]━━━━━━❖\n𝚂𝚊𝚢𝚘𝚗𝚊𝚛𝚊𝚊 @user 👋😃'
      conn.spromote = "@user telah naik jabatan";
      conn.sdemote = "@user telah turun jabatan🗿";
      conn.handler = Handler.bind(conn);
      conn.onUpdateAntiCall = updateAntiCall.bind(conn);
      conn.onParticipantsUpdate = handler.participantsUpdate.bind(conn);
      conn.onConnectionUpdate = connectionUpdate.bind(conn);
      conn.updateSaveCreds = saveCreds.bind(conn);
  
      conn.ev.on('call', conn.onUpdateAntiCall);
      conn.ev.on("messages.upsert", conn.handler);
      conn.ev.on("group-participants.update", conn.onParticipantsUpdate);
      conn.ev.on("connection.update", conn.onConnectionUpdate);
      conn.ev.on("creds.update", conn.updateSaveCreds);
		  isInit = false;
		  return true
		}
		
		let pluginFolder = path.join(__dirname, "plugins");
    let pluginFilter = (filename) => /\.js$/.test(filename);
    plugins = {};
    for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
      try {
        plugins[filename] = require(path.join(pluginFolder, filename));
      } catch (e) {
        conn.logger.error(e);
        delete plugins[filename];
      }
    }
    console.log(Object.keys(plugins));
    reload = (_ev, filename) => {
      if (pluginFilter(filename)) {
        let dir = path.join(pluginFolder, filename);
        if (dir in require.cache) {
          delete require.cache[dir];
          if (fs.existsSync(dir))
            conn.logger.info(`re - require plugin '${filename}'`);
          else {
            conn.logger.warn(`deleted plugin '${filename}'`);
            return delete plugins[filename];
          }
        } else conn.logger.info(`requiring new plugin '${filename}'`);
        let err = syntaxerror(fs.readFileSync(dir), filename);
        if (err)
          conn.logger.error(`syntax error while loading '${filename}'\n${err}`);
        else
          try {
            plugins[filename] = require(dir);
          } catch (e) {
            conn.logger.error(`error require plugin '${filename}\n${e}'`);
          } finally {
            plugins = Object.fromEntries(
              Object.entries(plugins).sort(([a], [b]) => a.localeCompare(b)),
            );
          }
      }
    };
    Object.freeze(reload);
    fs.watch(path.join(__dirname, "plugins"), reload);
    await reloadHandler();
    
		return conn;
	}
	startBotz();
	
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(color(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})
