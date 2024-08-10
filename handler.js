/**
* Base By NdyZz [ github.com/NdyZz ]
* Created On 1/7/2024
* Contact Me on wa.me/6285346923840
*/

require('./config')
const {
  exec,
  spawn,
  execSync
} = require("child_process")
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory
} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
const {
  delay,
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia
} = require("@adiwajshing/baileys")
const cron = require('node-cron')
const lolcatjs = require('lolcatjs')
const didyoumean = require('didyoumean')
const {
  createHash
} = require('crypto')
const similarity = require('similarity')
const threshold = 0.72
const fs = require('fs')
const fsx = require('fs-extra')
const util = require('util')
const fetch = require('node-fetch')
const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path')
const yts = require('yt-search')
const ytdl = require("@distube/ytdl-core");
const {
  pipeline
} = require("stream")
const {
  promisify
} = util;
const streamPipeline = promisify(pipeline)
const {
  performance
} = require("perf_hooks");
const {
  TelegraPH
} = require("./lib/TelegraPH")
const {
  remini,
  jarak,
  ssweb,
  pinterest,
  quotesAnime,
  hentaivid,
  stickersearch,
  thinkany,
  happymod,
  igStory,
  geospy,
  simsimi,
  igstalk,
  ttSearch,
  xhentai,
  waifu
} = require("./lib/scraper")
const process = require('process');
const moment = require("moment-timezone")
const os = require('os');
const Chalk = require('chalk');
const checkDiskSpace = require('check-disk-space').default;
const speed = require('performance-now')
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const {
  bytesToSize,
  fetchJson,
  checkBandwidth,
  formatSize,
  getBuffer,
  isUrl,
  jsonformat,
  nganuin,
  pickRandom,
  getRandom,
  myGender,
  runtime,
  shorturl,
  formatp,
  color,
  getGroupAdmins,
  clockString,
  msToDate,
  parseMentions
} = require("./lib/myfunc");
const {
  UrlShorten
} = require("./lib/url-short");
const {
  removebg,
  toanime,
  tozombie,
  xnxxs,
  xvideoss,
  xnxxdl,
  xvideosdl
} = require('betabotz-tools');
const {
  getCodeCountries,
  getCountryNumbers,
  getViewMessages
} = require('./lib/number-virtual');
const {
  webpToVideo,
  addExif
} = require('./lib/exif')
const {
  addBlockedStickers,
  checkBlockedStickers
} = require('./src/sticker-blocked.js')
const {
  addPremiumUser,
  getPremiumExpired,
  getPremiumPosition,
  expiredPremiumCheck,
  checkPremiumUser,
  getAllPremiumUser,
} = require('./src/premium.js')
const {
  addSewaGroup,
  delSewaGroup,
  getSewaExpired,
  getSewaPosition,
  expiredSewaCheck,
  checkSewaGroup,
  getAllSewaGroup
} = require('./src/sewa.js')

module.exports = {
  async handler(conn, m, chatUpdate, store) {
  try {
    console.log(m)
    const body = m.text || m.type || "";
    const budy = (m && typeof m?.text === 'string') ? m?.text: '';
    global.prefix = prefix = /^[°zZ#,.''()√%!¢£¥€π¤ΠΦ&<`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#,.''()√%¢£¥€π¤ΠΦ&<!`™©®Δ^βα¦|/\\©^]/gi): global.prefx
    const isCmd = body.startsWith(prefix)
    const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase(): ''
    const args = body.trim().split(/ +/).slice(1);
    const full_args = body.replace(command, '').slice(1).trim();
    const pushname = m?.pushName || "No Name";
    const botNumber = await conn.decodeJid(conn.user.id);
    const isCreator = (m && m?.sender && [botNumber, ...global.nomerowner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m?.sender)) || false;
    const itsMe = (m && m?.sender && m?.sender.split('@')[0] == botNumber) || false;
    const isPremium = isCreator || checkPremiumUser(m.sender, premium);
    const isSewa = isCreator || checkSewaGroup(m.chat, sewa);
    const text = q = args.join(" ");
    const fatkuns = m && (m?.quoted || m);
    const quoted = (fatkuns?.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]]:
    (fatkuns?.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]]:
    (fatkuns?.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]]:
    m?.quoted || m;
    const mime = ((quoted?.msg || quoted) || {}).mimetype || '';
    const qmsg = (quoted?.msg || quoted);
    const isMedia = /image|video|sticker|audio/.test(mime);
    let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender];
    //group
    const groupMetadata = m?.isGroup ? await conn.groupMetadata(m?.chat).catch(e => {}): {};
    const groupName = m?.isGroup ? groupMetadata?.subject || '': '';
    const participants = m?.isGroup ? await groupMetadata?.participants || []: [];
    const userk = (m.isGroup ? participants.find((u) => conn.decodeJid(u.id) === m.sender): {}) || {}; // User Data
    const bot = (m.isGroup ? participants.find((u) => conn.decodeJid(u.id) == conn.user.jid): {}) || {}; // Your Data
    const groupAdmins = m?.isGroup ? await getGroupAdmins(participants) || []: [];
    const isBotAdmins = m?.isGroup ? groupAdmins.includes(botNumber): false;
    const isRAdmin = (userk && userk.admin == "superadmin") || false;
    const isAdmins = isRAdmin || m?.isGroup ? groupAdmins.includes(m?.sender): false;
    const groupOwner = m?.isGroup ? groupMetadata?.owner || '': '';
    const isMyGroup = m?.chat === idgc ? true: false;
    const isGroupOwner = isCreator || m?.isGroup ? (groupOwner ? groupOwner: groupAdmins).includes(m?.sender): false;

    //================== [ TIME ] ==============//
    const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
    const wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    const wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
    const wita = moment.tz('Asia/Makassar').format('HH:mm:ss')

    const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
    if (time2 < "23:59:00") {
      global.ucapanWaktu = 'Selamat Malam 🏙️'
    }
    if (time2 < "19:00:00") {
      global.ucapanWaktu = 'Selamat Petang 🌆'
    }
    if (time2 < "18:00:00") {
      global.ucapanWaktu = 'Selamat Sore 🌇'
    }
    if (time2 < "15:00:00") {
      global.ucapanWaktu = 'Selamat Siang 🌤️'
    }
    if (time2 < "10:00:00") {
      global.ucapanWaktu = 'Selamat Pagi 🌄'
    }
    if (time2 < "05:00:00") {
      global.ucapanWaktu = 'Selamat Subuh 🌆'
    }
    if (time2 < "03:00:00") {
      global.ucapanWaktu = 'Selamat Tengah Malam 🌃'
    }

    //=============== [ DATABASE ] ================//
    try {
      let isNumber = x => typeof x === 'number' && !isNaN(x)
      let user = global.db.data.users[m?.sender]
      if (typeof user !== 'object') global.db.data.users[m?.sender] = {}
      let firtsLimit = isPremium ? firstLIMIT.premium: firstLIMIT.free;
      if (user) {
        if (!("registered" in user)) user.registered = false
        if (!("name" in user)) user.name = false
        if (!isPremium) user.premium = false
        if (!("gender" in user)) user.name = false
        if (!isNumber(user.afkTime)) user.afkTime = -1
        if (!('afkReason' in user)) user.afkReason = ''
        if (!isNumber(user.age)) user.age = -1
        if (!isNumber(user.limit)) user.limit = firtsLimit
        if (!isNumber(user.regTime)) user.regTime = -1
        if (!("sn" in user)) user.sn = false
        if (!('story' in user)) user.story = [];
        if (!('pasangan' in user)) user.pasangan = "";
        if (!isNumber(user.lastngojek)) user.lastngojek = 0;
        if (!isNumber(user.lastlont)) user.lastlont = 0;
        if (!isNumber(user.lastbansos)) user.lastbansos = 0;
        if (!isNumber(user.ojekk)) user.ojekk = 0;
        if (!isNumber(user.exp)) user.exp = 0;
        if (!isNumber(user.money)) user.money = 0;
        if (!isNumber(user.bank)) user.bank = 100000;
        if (!isNumber(user.atm)) user.atm = 0;
        if (!isNumber(user.lastclaim)) user.lastclaim = 0;
        if (!isNumber(user.health)) user.health = 100;
        if (!isNumber(user.warn)) user.warn = 0;
        if (!isNumber(user.count)) user.count = 0;
        if (!isNumber(user.level)) user.level = 0;
        if (!('role' in user)) user.role = "Beginner";
        if (!("autolevelup" in user)) user.autolevelup = true;
        if (!isNumber(user.saldo)) user.saldo = 0;
        if (!isNumber(user.armormonster)) user.armormonster = 0;
        if (!isNumber(user.potion)) user.potion = 0;
        if (!isNumber(user.tiketcoin)) user.tiketcoin = 0;
        if (!isNumber(user.healtmonster)) user.healtmonster = 0;
        if (!isNumber(user.pc)) user.pc = 0;
        if (!isNumber(user.spammer)) user.spammer = 0;
        if (!isNumber(user.expg)) user.expg = 0;
        if (!isNumber(user.trash)) user.trash = 0;
        if (!isNumber(user.sampah)) user.sampah = 0;
        if (!isNumber(user.wood)) user.wood = 0;
        if (!isNumber(user.rock)) user.rock = 0;
        if (!isNumber(user.string)) user.string = 0;
        if (!isNumber(user.petFood)) user.petFood = 0;

        if (!isNumber(user.emerald)) user.emerald = 0;
        if (!isNumber(user.diamond)) user.diamond = 0;
        if (!isNumber(user.berlian)) user.berlian = 0;
        if (!isNumber(user.emas)) user.emas = 0;
        if (!isNumber(user.gold)) user.gold = 0;
        if (!isNumber(user.iron)) user.iron = 0;
        if (!isNumber(user.string)) user.string = 0;

        if (!isNumber(user.anggur)) user.anggur = 0;
        if (!isNumber(user.jeruk)) user.jeruk = 0;
        if (!isNumber(user.mangga)) user.mangga = 0;
        if (!isNumber(user.apel)) user.apel = 0;
        if (!isNumber(user.pisang)) user.pisang = 0;
        if (!isNumber(user.bibitanggur)) user.bibitanggur = 0;
        if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0;
        if (!isNumber(user.bibitmangga)) user.bibitmangga = 0;
        if (!isNumber(user.bibitapel)) user.bibitapel = 0;
        if (!isNumber(user.bibitpisang)) user.bibitpisang = 0;
        if (!isNumber(user.gardenboxs)) user.gardenboxs = 0;
        if (!isNumber(user.spagety)) user.spagety = 0;
        if (!isNumber(user.stamina)) user.stamina = 0;
        if (!isNumber(user.bensin)) user.bensin = 0;
        if (!isNumber(user.balance)) user.balance = 0;
        if (!isNumber(user.akinator)) user.akinator = 0;

        if (!isNumber(user.botol)) user.botol = 0;
        if (!isNumber(user.kardus)) user.kardus = 0;
        if (!isNumber(user.kaleng)) user.kaleng = 0;
        if (!isNumber(user.aqua)) user.aqua = 0;
        if (!isNumber(user.kayu)) user.kayu = 0;
        if (!isNumber(user.batu)) user.batu = 0;
        if (!isNumber(user.kapak)) user.kapak = 0;
        if (!isNumber(user.obat)) user.obat = 0;
        if (!isNumber(user.clan)) user.clan = 0;
        if (!isNumber(user.pickaxe)) user.pickaxe = 0;

        if (!isNumber(user.common)) user.common = 0;
        if (!isNumber(user.cupon)) user.cupon = 0;
        if (!isNumber(user.gems)) user.gems = 0;
        if (!isNumber(user.boxs)) user.boxs = 0;
        if (!isNumber(user.uncommon)) user.uncommon = 0;
        if (!isNumber(user.mythic)) user.mythic = 0;
        if (!isNumber(user.legendary)) user.legendary = 0;
        if (!isNumber(user.pet)) user.pet = 0;
        if (!isNumber(user.ramuan)) user.ramuan = 0;

        if (!isNumber(user.lastramuanclaim)) user.lastramuanclaim = 0;
        if (!isNumber(user.lastpotionclaim)) user.lastpotionclaim = 0;
        if (!isNumber(user.laststringclaim)) user.laststringclaim = 0;
        if (!isNumber(user.lastswordclaim)) user.lastswordclaim = 0;
        if (!isNumber(user.lastsironclaim)) user.lastsironclaim = 0;
        if (!isNumber(user.lastweaponclaim)) user.lastweaponclaim = 0;
        if (!isNumber(user.lastsmancingclaim)) user.lastsmancingclaim = 0;

        if (!isNumber(user.ramuannagalast)) user.ramuannagalast = 0;
        if (!isNumber(user.ramuanrubahlast)) user.ramuanrubahlast = 0;
        if (!isNumber(user.ramuankucinglast)) user.ramuankucinglast = 0;
        if (!isNumber(user.ramuanserigalalast)) user.ramuanserigalalast = 0;
        if (!isNumber(user.ramuangriffinlast)) user.ramuangriffinlast = 0;
        if (!isNumber(user.ramuanphonixlast)) user.ramuanphonixlast = 0;
        if (!isNumber(user.ramuancentaurlast)) user.ramuancentaurlast = 0;
        if (!isNumber(user.ramuankudalast)) user.ramuankudalast = 0;
        if (!isNumber(user.ramuankyubilast)) user.ramuankyubilast = 0;
        if (!isNumber(user.ramuanherolast)) user.ramuanherolast = 0;

        if (!isNumber(user.hero)) user.hero = 1;
        if (!isNumber(user.exphero)) user.exphero = 0;
        if (!isNumber(user.pillhero)) user.pillhero = 0;
        if (!isNumber(user.herolastclaim)) user.herolastclaim = 0;

        if (!isNumber(user.paus)) user.paus = 0;
        if (!isNumber(user.kepiting)) user.kepiting = 0;
        if (!isNumber(user.cumi)) user.cumi = 0;
        if (!isNumber(user.gurita)) user.gurita = 0;
        if (!isNumber(user.buntal)) user.buntal = 0;
        if (!isNumber(user.dory)) user.dory = 0;
        if (!isNumber(user.lobster)) user.lobster = 0;
        if (!isNumber(user.lumba)) user.lumba = 0;
        if (!isNumber(user.hiu)) user.hiu = 0;
        if (!isNumber(user.ikan)) user.ikan = 0;
        if (!isNumber(user.udang)) user.udang = 0;
        if (!isNumber(user.orca)) user.orca = 0;
        if (!isNumber(user.umpan)) user.umpan = 0;
        if (!isNumber(user.pancingan)) user.pancingan = 1;
        if (!isNumber(user.anakpancingan)) user.anakpancingan = 0;
        if (!isNumber(user.lastmancingeasy)) user.lastmancingeasy = 0;
        if (!isNumber(user.lastmancingnormal)) user.lastmancingnormal = 0;
        if (!isNumber(user.lastmancinghard)) user.lastmancinghard = 0;
        if (!isNumber(user.lastmancingextreme)) user.lastmancingextreme = 0;

        if (!isNumber(user.kucing)) user.kucing = 0;
        if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0;
        if (!isNumber(user.kuda)) user.kuda = 0;
        if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0;
        if (!isNumber(user.rubah)) user.rubah = 0;
        if (!isNumber(user.rubahlastclaim)) user.rubahlastclaim = 0;
        if (!isNumber(user.anjing)) user.anjing = 0;
        if (!isNumber(user.anjinglastclaim)) user.anjinglastclaim = 0;
        if (!isNumber(user.serigala)) user.serigala = 0;
        if (!isNumber(user.serigalalastclaim)) user.serigalalastclaim = 0;
        if (!isNumber(user.naga)) user.naga = 0;
        if (!isNumber(user.nagalastclaim)) user.nagalastclaim = 0;
        if (!isNumber(user.phonix)) user.phonix = 0;
        if (!isNumber(user.phonixlastclaim)) user.phonixlastclaim = 0;
        if (!isNumber(user.kyubi)) user.kyubi = 0;
        if (!isNumber(user.kyubilastclaim)) user.kyubilastclaim = 0;
        if (!isNumber(user.griffin)) user.griffin = 0;
        if (!isNumber(user.griffinlastclaim)) user.griffinlastclaim = 0;
        if (!isNumber(user.centaur)) user.centaur = 0;
        if (!isNumber(user.centaurlastclaim)) user.centaurlastclaim = 0;

        if (!isNumber(user.anakkucing)) user.anakkucing = 0;
        if (!isNumber(user.anakkuda)) user.anakkuda = 0;
        if (!isNumber(user.anakrubah)) user.anakrubah = 0;
        if (!isNumber(user.anakanjing)) user.anakanjing = 0;
        if (!isNumber(user.anakserigala)) user.anakserigala = 0;
        if (!isNumber(user.anaknaga)) user.anaknaga = 0;
        if (!isNumber(user.anakphonix)) user.anakphonix = 0;
        if (!isNumber(user.anakkyubi)) user.anakkyubi = 0;
        if (!isNumber(user.anakgriffin)) user.anakgriffin = 0;
        if (!isNumber(user.anakcentaur)) user.anakcentaur = 0;

        if (!isNumber(user.makananpet)) user.makananpet = 0;
        if (!isNumber(user.makanannaga)) user.makanannaga = 0;
        if (!isNumber(user.makananphonix)) user.makananphonix = 0;
        if (!isNumber(user.makanangriffin)) user.makanangriffin = 0;
        if (!isNumber(user.makanankyubi)) user.makanankyubi = 0;
        if (!isNumber(user.makanancentaur)) user.makanancentaur = 0;

        if (!isNumber(user.horse)) user.horse = 0;
        if (!isNumber(user.horseexp)) user.horseexp = 0;
        if (!isNumber(user.cat)) user.cat = 0;
        if (!isNumber(user.catexp)) user.catexp = 0;
        if (!isNumber(user.fox)) user.fox = 0;
        if (!isNumber(user.foxhexp)) user.foxexp = 0;
        if (!isNumber(user.dog)) user.dog = 0;
        if (!isNumber(user.dogexp)) user.dogexp = 0;

        if (!isNumber(user.horselastfeed)) user.horselastfeed = 0;
        if (!isNumber(user.catlastfeed)) user.catlastfeed = 0;
        if (!isNumber(user.foxlastfeed)) user.foxlastfeed = 0;
        if (!isNumber(user.doglastfeed)) user.doglastfeed = 0;

        if (!isNumber(user.armor)) user.armor = 0;
        if (!isNumber(user.armordurability)) user.armordurability = 0;
        if (!isNumber(user.weapon)) user.weapon = 0;
        if (!isNumber(user.weapondurability)) user.weapondurability = 0;
        if (!isNumber(user.sword)) user.sword = 0;
        if (!isNumber(user.sworddurability)) user.sworddurability = 0;
        if (!isNumber(user.pickaxe)) user.pickaxe = 0;
        if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0;
        if (!isNumber(user.fishingrod)) user.fishingrod = 0;
        if (!isNumber(user.fishingroddurability))
          user.fishingroddurability = 0;

        if (!isNumber(user.kerjasatu)) user.kerjasatu = 0;
        if (!isNumber(user.kerjadua)) user.kerjadua = 0;
        if (!isNumber(user.kerjatiga)) user.kerjatiga = 0;
        if (!isNumber(user.kerjaempat)) user.kerjaempat = 0;
        if (!isNumber(user.kerjalima)) user.kerjalima = 0;
        if (!isNumber(user.kerjaenam)) user.kerjaenam = 0;
        if (!isNumber(user.kerjatujuh)) user.kerjatujuh = 0;
        if (!isNumber(user.kerjadelapan)) user.kerjadelapan = 0;
        if (!isNumber(user.kerjasembilan)) user.kerjasembilan = 0;
        if (!isNumber(user.kerjasepuluh)) user.kerjasepuluh = 0;
        if (!isNumber(user.kerjasebelas)) user.kerjasebelas = 0;
        if (!isNumber(user.kerjaduabelas)) user.kerjaduabelas = 0;
        if (!isNumber(user.kerjatigabelas)) user.kerjatigabelas = 0;
        if (!isNumber(user.kerjaempatbelas)) user.kerjaempatbelas = 0;
        if (!isNumber(user.kerjalimabelas)) user.kerjalimabelas = 0;
        if (!isNumber(user.kerjaenambelas)) user.kerjaenambelas = 0;
        if (!isNumber(user.kerjatujuhbelas)) user.kerjatujuhbelas = 0;
        if (!isNumber(user.kerjadelapanbelas)) user.kerjadelapanbelas = 0;
        if (!isNumber(user.kerjasembilanbelas)) user.kerjasembilanbelas = 0;
        if (!isNumber(user.kerjaduapuluh)) user.kerjaduapuluh = 0;
        if (!isNumber(user.kerjaduasatu)) user.kerjaduasatu = 0;
        if (!isNumber(user.kerjaduadua)) user.kerjaduadua = 0;
        if (!isNumber(user.kerjaduatiga)) user.kerjaduatiga = 0;
        if (!isNumber(user.kerjaduaempat)) user.kerjaduaempat = 0;
        if (!isNumber(user.kerjadualima)) user.kerjadualima = 0;
        if (!isNumber(user.kerjaduaenam)) user.kerjaduaenam = 0;
        if (!isNumber(user.kerjaduatujuh)) user.kerjaduatujuh = 0;
        if (!isNumber(user.kerjaduadelapan)) user.kerjaduadelapan = 0;
        if (!isNumber(user.kerjaduasembilan)) user.kerjaduasembilan = 0;
        if (!isNumber(user.kerjatigapuluh)) user.kerjatigapuluh = 0;

        if (!isNumber(user.judilast)) user.judilast = 0;
        if (!isNumber(user.reglast)) user.reglast = 0;
        if (!isNumber(user.unreglast)) user.unreglast = 0;
        if (!isNumber(user.snlast)) user.snlast = 0;
        if (!isNumber(user.spinlast)) user.spinlast = 0;

        if (!isNumber(user.lastwarpet)) user.lastwarpet = 0;
        if (!isNumber(user.lastspam)) user.lastspam = 0;
        if (!isNumber(user.lastpekerjaan)) user.lastpekerjaan = 0;
        if (!isNumber(user.lastclaim)) user.lastclaim = 0;
        if (!isNumber(user.lastadventure)) user.lastadventure = 0;
        if (!isNumber(user.lastfishing)) user.lastfishing = 0;
        if (!isNumber(user.lastdungeon)) user.lastdungeon = 0;
        if (!isNumber(user.lastcrusade)) user.lastcrusade = 0;
        if (!isNumber(user.lastduel)) user.lastduel = 0;
        if (!isNumber(user.lastcode)) user.lastcode = 0;
        if (!isNumber(user.lastlink)) user.lastlink = 0;
        if (!isNumber(user.lastrob)) user.lastrob = 0;
        if (!isNumber(user.lastopen)) user.lastopen = 0;
        if (!isNumber(user.lasteasy)) user.lasteasy = 0;
        if (!isNumber(user.lastnambang)) user.lastnambang = 0;
        if (!isNumber(user.lastbunuhi)) user.lastbunuhi = 0;
        if (!isNumber(user.lastmining)) user.lastmining = 0;
        if (!isNumber(user.lasthunt)) user.lasthunt = 0;
        if (!isNumber(user.lastweekly)) user.lastweekly = 0;
        if (!isNumber(user.lastmonthly)) user.lastmonthly = 0;
        if (!isNumber(user.lastmulung)) user.lastmulung = 0;
        if (!isNumber(user.lastdagang)) user.lastdagang = 0;
        if (!isNumber(user.lastnebang)) user.lastnebang = 0;
        if (!isNumber(user.lastberkebon)) user.lastberkebon = 0;
        if (!isNumber(user.lastadventure)) user.lastadventure = 0;
        if (!isNumber(user.lastberburu)) user.lastberburu = 0;
      } else global.db.data.users[m?.sender] = {
        registered: false,
        name: false,
        premium: isPremium ? true: false,
        gender: false,
        afkTime: -1,
        afkReason: '',
        age: -1,
        limit: firtsLimit,
        regTime: -1,
        sn: false,
        story: [],
        pasangan: "",
        ojekk: 0,
        lastngojek: 0,
        lastlont: 0,
        lastbansos: 0,
        exp: 0,
        money: 0,
        bank: 0,
        atm: 0,
        lastclaim: 0,
        health: 100,
        warn: 0,
        count: 0,
        level: 0,
        role: "Beginner",
        autolevelup: true,
        saldo: 0,
        healtmonster: 100,
        armormonster: 0,
        potion: 10,
        trash: 0,
        sampah: 0,
        wood: 0,
        rock: 0,
        string: 0,

        emerald: 0,
        diamond: 0,
        berlian: 0,
        emas: 0,
        gold: 0,
        iron: 0,

        pisang: 0,
        anggur: 0,
        mangga: 0,
        jeruk: 0,
        apel: 0,
        bibitpisang: 0,
        bibitanggur: 0,
        bibitmangga: 0,
        bibitjeruk: 0,
        bibitapel: 0,
        gardenboxs: 0,
        spagety: 0,
        stamina: 0,
        bensin: 0,
        saldo: 0,
        botol: 0,
        kardus: 0,
        kaleng: 0,
        aqua: 0,
        kayu: 0,
        batu: 0,
        kapak: 0,
        obat: 0,
        clan: 0,
        pickaxe: 0,
        chat: 0,
        cupon: 0,
        gems: 0,
        boxs: 0,
        common: 0,
        uncommon: 0,
        mythic: 0,
        legendary: 0,
        pet: 0,
        ramuan: 0,

        ramuannagalast: 0,
        ramuankyubilast: 0,
        ramuanphonixlast: 0,
        ramuanserigalalast: 0,
        ramuancentaurlast: 0,
        ramuankudalast: 0,
        ramuankucinglast: 0,
        ramuanrubahlast: 0,
        ramuangriffinlast: 0,
        ramuanherolast: 0,

        horse: 0,
        horseexp: 0,
        cat: 0,
        catngexp: 0,
        fox: 0,
        foxexp: 0,
        dog: 0,
        dogexp: 0,

        hero: 1,
        exphero: 0,
        pillhero: 0,
        herolastclaim: 0,

        udang: 0,
        hiu: 0,
        lobster: 0,
        kumba: 0,
        ikan: 0,
        buntal: 0,
        gurita: 0,
        dory: 0,
        cumi: 0,
        kepiting: 0,
        paus: 0,
        orca: 0,
        umpan: 0,
        pancingan: 1,
        anakpancingan: 0,

        anakkucing: 0,
        anakkuda: 0,
        anakrubah: 0,
        anakanjing: 0,
        anakserigala: 0,
        anaknaga: 0,
        anakphonix: 0,
        anakkyubi: 0,
        anakgriffin: 0,
        anakcentaur: 0,

        kucing: 0,
        kucinglastclaim: 0,
        kuda: 0,
        kudalastclaim: 0,
        rubah: 0,
        rubahlastclaim: 0,
        serigala: 0,
        serigalalastclaim: 0,
        naga: 0,
        nagalastclaim: 0,
        phonix: 0,
        phonixlastclaim: 0,
        anjing: 0,
        anjinglastclaim: 0,
        kyubi: 0,
        kyubilastclaim: 0,
        griffin: 0,
        griffinlastclaim: 0,
        centaur: 0,
        centaurlastclaim: 0,

        makananpet: 0,
        makananphonix: 0,
        makanannaga: 0,
        makanangriffin: 0,
        makanankyubi: 0,
        makanancentaur: 0,

        horselastfeed: 0,
        catlastfeed: 0,
        foxlastfeed: 0,
        doglastfeed: 0,

        armor: 0,
        armordurability: 0,
        weapon: 0,
        weapondurability: 0,
        sword: 0,
        sworddurability: 0,
        pickaxe: 0,
        pickaxedurability: 0,
        fishingrod: 0,
        fishingroddurability: 0,

        judilast: 0,
        reglast: 0,
        unreglast: 0,
        snlast: 0,
        spinlast: 0,

        kerjasatu: 0,
        kerjadua: 0,
        kerjatiga: 0,
        kerjaempat: 0,
        kerjalima: 0,
        kerjaenam: 0,
        kerjatujuh: 0,
        kerjadelapan: 0,
        kerjasembilan: 0,
        kerjasepuluh: 0,
        kerjasebelas: 0,
        kerjaduabelas: 0,
        kerjatigabelas: 0,
        kerjaempatbelas: 0,
        kerjalimabelas: 0,
        kerjaenambelas: 0,
        kerjatujuhbelas: 0,
        kerjadelapanbelas: 0,
        kerjasembilanbelas: 0,
        kerjaduapuluh: 0,
        kerjaduasatu: 0,
        kerjaduadua: 0,
        kerjaduatiga: 0,
        kerjaduaempat: 0,
        kerjadualima: 0,
        kerjaduaenam: 0,
        kerjaduatujuh: 0,
        kerjaduadelapan: 0,
        kerjaduasembilan: 0,
        kerjatigapuluh: 0,

        lastramuanclaim: 0,
        lastpotionclaim: 0,
        laststringclaim: 0,
        lastswordclaim: 0,
        lastweaponclaim: 0,
        lastsironclaim: 0,
        lastsmancingclaim: 0,

        lastmancingeasy: 0,
        lastmancingnormal: 0,
        lastmancinghard: 0,
        lastmancingextreme: 0,
        lastwarpet: 0,
        lastspam: 0,
        lastpekerjaan: 0,
        lastclaim: 0,
        lastadventure: 0,
        lastfishing: 0,
        lastdungeon: 0,
        lastcrusade: 0,
        lastduel: 0,
        lastcode: 0,
        lastlink: 0,
        lastnambang: 0,
        lastmining: 0,
        lasthunt: 0,
        lastweekly: 0,
        lastmonthly: 0,
        lastrob: 0,
        lastbunuhi: 0,
        lastopen: 0,
        lasteasy: 0,
        lastmulung: 0,
        lastdagang: 0,
        lastnebang: 0,
        lastberkebon: 0,
        lastadventure: 0,
        lastberburu: 0,
      }

      let chats = global.db.data.chats[m?.chat]
      if (typeof chats !== 'object') global.db.data.chats[m?.chat] = {}
      if (chats) {
        if (!('stickerblocked' in chats)) chats.stickerblocked = false
        if (!('isBanned' in chats)) chats.isBanned = false
        if (!('antilink' in chats)) chats.antilink = false
        if (!('antilinkv2' in chats)) chats.antilinkv2 = false
        if (!('welcome' in chats)) chats.welcome = false
        if (!('goodbay' in chats)) chats.goodbay = false
        if (!('opengc' in chats)) chats.opengc = false
        if (!('closegc' in chats)) chats.closegc = false
        if (!('viewonce' in chats)) chats.viewonce = false
        if (!('autosholat' in chats)) chats.autosholat = null
        if (!('shut' in chats)) chats.shut = false
      } else global.db.data.chats[m?.chat] = {
        stickerblocked: false,
        isBanned: false,
        antilink: false,
        antilinkv2: false,
        welcome: false,
        goodbay: false,
        opengc: false,
        closegc: false,
        viewonce: false,
        autosholat: null,
        shut: false
      }

      let historys = global.db.data.historys[m?.sender]
      if (typeof historys !== 'object') global.db.data.historys[m?.sender] = {}
      if (historys) {
        if (!('historyGemini' in historys)) historys.historyGemini = AI_ME
      } else global.db.data.historys[m?.sender] = {
        historyGemini: AI_ME
      }

      let setting = global.db.data.settings[botNumber]
      if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}
      if (setting) {
        if (!('autoread' in setting)) setting.autoread = true
        if (!("public" in settings)) settings.public = true
        if (!("anticall" in settings)) settings.anticall = true
        if (!("autostory" in settings)) settings.autostory = true
      } else global.db.data.settings[botNumber] = {
        autoread: true,
        public: true,
        anticall: true,
        autostory: true
      }
      if (global.db.data) await global.db.write();
    } catch (err) {}

    let pp = await conn.profilePictureUrl(m?.sender, 'image').catch(_ => ppkosong)

    if (!db.data.settings[botNumber].public) {
      if (!isCreator) return
    }
    global.loading = async () => {
      var react = [
        "🕛",
        "🕒",
        "🕕",
        "🕘",
        "🕛",
        "✔️"
      ];
      for (let i = 0; i < react.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 10));
        await conn.sendMessage(m.chat, {
          react: {
            text: react[i],
            key: m.key
          }
        })
      }
    }

    if (m.message) {
      conn.readMessages([m.key])
      console.log(Chalk.black(Chalk.bgWhite('\n[ CMD ]')), Chalk.black(Chalk.bgGreen(new Date)), Chalk.black(Chalk.bgBlue(budy || m.mtype)) + '\n' + Chalk.magenta('=> From'), Chalk.green(pushname), Chalk.yellow(m.sender) + '\n' + Chalk.blueBright('=> In'), Chalk.green(m.isGroup ? groupName: 'Chat Pribadi', m.chat))
    }

    global.flocation = {
      key: {
        participant: '0@s.whatsapp.net'
      },
      message: {
        locationMessage: {
          name: 'Japan`s',
          jpegThumbnail: fs.readFileSync('./media/image/thumbnail.jpg')
        }
      }
    }
    global.fkontak = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? {
          remoteJid: `status@broadcast`
        }: {})
      },
      message: {
        'contactMessage': {
          'displayName': db.data.users[m.sender].name || pushname || wm,
          'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${db.data.users[m.sender].name || pushname || wm},;;;\nFN:${db.data.users[m.sender].name || pushname || wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
          'jpegThumbnail': fs.readFileSync('./media/image/thumbnail.jpg'),
          thumbnail: fs.readFileSync('./media/image/thumbnail.jpg'),
          sendEphemeral: true
        }
      }
    }
    //============= [ FUNC BANCHAT ] ==============//
    if ((m?.chat in global.db.data.chats || m?.sender in global.db.data.users)) {
      let chat = global.db.data.chats[m?.chat]
      if (chat && chat.isBanned && !isCreator) return
    }

    if (db.data.settings[botNumber].autoread) {
      conn.readMessages([m?.key])
    }

    cron.schedule('0 0 0 * * *', async () => {
      let userss = Object.keys(global.db.data.users)
      for (let user of userss) {
        let userDB = global.db.data.users[user]
        if (userDB.premium) {
          userDB.limit = firstLIMIT.premium || 9999
        } else {
          userDB.limit = firstLIMIT.free || 15
        }
        if (global.db.data) await global.db.write()
      }
    },
      {
        scheduled: true,
        timezone: "Asia/Makassar"
      });

    if (isPremium) {
      expiredPremiumCheck(conn, premium)
    }

    if (isSewa) {
      expiredSewaCheck(conn, sewa)
    }
    /*if (!isSewa) {
		  if (m.isGroup) {
		    await conn.sendMessage(m.chat, {text: 'Bot Otomatis Keluar di gc jika bot tidak di sewa ! *_mau sewa?_* *chat owner* !!'})
		    await delay(1000)
		    return conn.groupLeave(m?.chat).then((res) => console.log(jsonformat(res))).catch((err) => console.error(jsonformat(err)))
		  }
		}*/

    if (/webp/.test(mime) && m.isGroup && isBotAdmins) {
      if (global.db.data.chats[m.chat].stickerblocked) {
        const isBlock = await checkBlockedStickers(quoted, stickerBlocked)
        let bi = m.quoted ? m.message.extendedTextMessage.contextInfo.participant: false;
        let ba = m.quoted ? m.message.extendedTextMessage.contextInfo.stanzaId: false;
        const moh = m.quoted ? {
          remoteJid: m.chat,
          fromMe: false,
          id: ba,
          participant: bi
        }: m?.key || m?.key
        if (isBlock) {
          conn.sendMessage(m?.chat, {
            delete: moh
          })
        }
      }
    }

    if (db.data.chats[m?.chat].antilink) {
      if (budy.match(`chat.whatsapp.com`)) {
        conn.sendMessage(m?.chat, {
          react: {
            text: `❌️`, key: m?.key,
          }})
        if (!isBotAdmins) return
        let gclink = (`https://chat.whatsapp.com/` + await conn.groupInviteCode(m?.chat))
        let isLinkThisGc = new RegExp(gclink, 'i')
        let isgclink = isLinkThisGc.test(m?.text)
        if (isgclink && isCreator && isAdmins) return
        conn.groupParticipantsUpdate(m?.chat, [m?.sender], 'remove')
      }
    }

    if (db.data.chats[m?.chat].antilinkv2) {
      if (budy.match(`chat.whatsapp.com`)) {
        conn.sendMessage(m?.chat, {
          react: {
            text: `❌️`, key: m?.key,
          }})
        if (!isBotAdmins) return
        let gclink = (`https://chat.whatsapp.com/` + await conn.groupInviteCode(m?.chat))
        let isLinkThisGc = new RegExp(gclink, 'i')
        let isgclink = isLinkThisGc.test(m?.text)
        if (isgclink && isCreator && isAdmins) return
        conn.sendMessage(m?.chat, {
          delete: m?.key
        })
      }
    }

    /*let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender]: [])])]
    for (let jid of mentionUser) {
      let user = db.data.users[jid]
      if (!user) continue
      let afkTime = user.afkTime
      if (!afkTime || afkTime < 0) continue
      let reason = user.afkReason || ''
      m?.reply(`Please Don't Tag Him\nHe's AFK ${reason ? 'With reason ' + reason: 'no reason'}\nAfk Since ${clockString(new Date - afkTime)}`.trim())
    }
    if (db.data.users[m.sender].afkTime > -1) {
      let user = db.data.users[m.sender]
      m?.reply(`You Have Returned From AFK\nAFK Reason: ${user.afkReason ? user.afkReason: ''}\nAFK Duration: ${clockString(new Date - user.afkTime)}`.trim())
      user.afkTime = -1
      user.afkReason = ''
      if (global.db.data) await global.db.write();
    }*/

    if (global.db.data.settings[botNumber].autostory) {
      if (m.chat === "status@broadcast") {
        (async () => {
          let media = null;
          let caption = '';
          if (/image/.test(mime)) {
            let img = await conn.downloadAndSaveMediaMessage(m);
            media = await TelegraPH(img).catch(_ => 'https://telegra.ph/file/6880771a42bad09dd6087.jpg');
            caption = m.text ?? '';
          } else if (/video/.test(mime)) {
            const vid = await conn.downloadAndSaveMediaMessage(m)
            media = await TelegraPH(vid).catch(_ => 'https://telegra.ph/file/6880771a42bad09dd6087.jpg');
            caption = m.text ?? '';
          } else {
            caption = m.text ?? '';
          }

          if (media !== null || caption) {
            db.data.users[m.sender]?.story?.push({
              media, caption
            })
            if (global.db.data) await global.db.write();
          }
        })()
      }
    }

    for (let name in global.plugins) {
      let plugin = global.plugins[name];
      if (!plugin) continue;
      if (plugin.disabled) continue;
      if (typeof plugin.all === "function") {
        try {
          await plugin.all.call(conn, m, chatUpdate);
        } catch (e) {
          // if (typeof e === 'string') continue
          console.error(e);
        }
      }
      const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      let _prefix = plugin.customPrefix ? plugin.customPrefix: prefix
      let match = (_prefix instanceof RegExp ? // RegExp Mode?
      [[_prefix.exec(m.text), _prefix]]:
      Array.isArray(_prefix) ? // Array?
      _prefix.map(p => {
      let re = p instanceof RegExp ? // RegExp in Array?
      p:
      new RegExp(str2Regex(p))
      return [re.exec(m.text), re]
      }):
      typeof _prefix === 'string' ? // String?
      [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]]:
      [[[], new RegExp]]
      ).find(p => p[1])
      if (typeof plugin.before === "function")
        if (
        await plugin.before.call(conn, m, {
          match,
          conn,
          prefix,
          usedPrefix: prefix,
          participants,
          groupMetadata,
          userk,
          bot,
          isCmd,
          isCreator,
          isRAdmin,
          isAdmins,
          isBotAdmins,
          isPremium,
          chatUpdate,
        })
      ) continue;
      if (typeof plugin !== "function") continue;
      if (command && prefix) {
        console.error(m)
        let result =
        ((opts?.["multiprefix"] ?? true) && (match[0] || "")[0]) ||
        (opts?.["noprefix"] ?? false ? null: (match[0] || "")[0]);
        usedPrefix = result;
        let noPrefix = !result ? m.text: m.text.replace(result, "");
        let [command,
          ...args] = noPrefix.trim().split` `.filter((v) => v);
        args = args || [];
        let _args = noPrefix.trim().split` `.slice(1);
        let text = _args.join` `;
        command = (command || "").toLowerCase();
        let fail = plugin.fail || global.dfail;

        const prefixCommand = !result
        ? plugin.customPrefix || plugin.command: plugin.command;
        let isAccept =
        (prefixCommand instanceof RegExp && prefixCommand.test(command)) ||
        (Array.isArray(prefixCommand) &&
          prefixCommand.some((cmd) =>
            cmd instanceof RegExp ? cmd.test(command): cmd === command,
          )) ||
        (typeof prefixCommand === "string" && prefixCommand === command);
        m.prefix = !!result;
        usedPrefix = !result ? "": result;
        if (!isAccept) continue;
        m.plugin = name;
        if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
          let chat = global.db.data.chats[m.chat];
          let user = global.db.data.users[m.sender];
          if (name != "owner-unbanchat.js" && chat && chat.isBanned && !isCreator) return;
          if (name != "group-unmute.js" && chat && chat.mute && !isAdmins && !isCreator) return;
        }

        /*if (db.data.settings.blockcmd.includes(command)) {
            dfail("block", m, conn);
            continue;
          }*/
        if (plugin.rowner && plugin.owner && !(isCreator)) {
          fail("owner", m, conn);
          return;
        }
        if (plugin.rowner && !isCreator) {
          fail("rowner", m, conn);
          return;
        }
        if (plugin.restrict) {
          fail("restrict", m, conn);
          return;
        }
        if (plugin.owner && !isCreator) {
          fail("owner", m, conn);
          return;
        }
        if (plugin.premium && !isPremium) {
          fail("premium", m, conn);
          return;
        }
        if (m.isGroup && !isSewa) {
          fail("sewa", m, conn);
          return;
        }
        if (plugin.group && !m.isGroup) {
          fail("group", m, conn);
          return;
        } else if (plugin.botAdmin && !isBotAdmins) {
          fail("botAdmin", m, conn);
          return;
        } else if (plugin.admin && !isAdmins) {
          fail("admin", m, conn);
          return;
        }
        if (plugin.private && m.isGroup) {
          fail("private", m, conn);
          return;
        }
        if (plugin.register == true && !_user.registered) {
          fail("unreg", m, conn);
          return;
        }
        m.isCommand = true;
        let xp = "exp" in plugin ? parseInt(plugin.exp): 17; // XP Earning per command
        if (xp > 9999999999999999999999)
          m.reply("Ngecit -_-"); // Hehehe
        else m.exp += xp;
        if (!isPremium & plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
          let limit = `*[ YOUR LIMIT HAS EXPIRED ]*\n> • _Limit anda telah habis silahkan tunggu 24 jam untuk mereset limit anda, upgrade ke premium untuk mendapatkan unlimited limit_`;
          conn.sendMessage(m.chat, {
            text: limit
          }, {
            quoted: m
          });
          return;
        }
        if (m.isBaileys && !m.fromMe) {
          if (isBotAdmin && !isAdmin) {
            await conn.reply(m.chat, "*[ SERVER NOTIF ]* Detect Another bot");
            await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
          }
        }
        if (plugin.level > _user.level) {
          let level = `*[ THE LEVEL IS NOT ENOUGH ]*\n> • _Kamu Perlu level *[ ${plugin.level} ]*, untuk mengakses ini, silahkan main minigame atau RPG untuk meningkatkan level anda_`;
          conn.sendMessage(m.chat, {
            text: level
          }, {
            quoted: m
          });
          return;
        }
        extra = {
          match,
          prefix,
          usedPrefix: prefix,
          noPrefix,
          _args,
          args,
          command,
          text,
          conn,
          participants,
          groupMetadata,
          userk,
          bot,
          isCmd,
          isCreator,
          isRAdmin,
          isAdmins,
          isBotAdmins,
          isPremium,
          chatUpdate
        };
        try {
          await plugin.call(conn, m, extra);
          if (global.db.data) await global.db.write()
          if (!isPremium) m.limit = m.limit || plugin.limit || true;
        } catch (e) {
          // Error occured
          m.error = e;
          console.error(e);
          if (e) {
            let text = util.format(e);
            /*for (let key of Object.values(global.APIKeys))*/

            if (e.name)
              for (let jid of global.nomerowner) {
              let data = (await conn.onWhatsApp(jid))[0] || {};
              if (data.exists)
                conn.reply(
                data.jid,
                `*[ REPORT ERROR ]*\n*• Name Plugins :* ${m.plugin}\n*• From :* @${m.sender.split("@")[0]} *(wa.me/${m.sender.split("@")[0]})\n*• Jid Chat :* ${m.chat}\n*• Command  :* ${usedPrefix + command}\n\n*• Error Log :*\`\`\`${text}\`\`\``.trim(),
                fkontak,
              );
            }
            m.reply(e);
          }
        } finally {
          // m.reply(util.format(_user))
          if (typeof plugin.after === "function") {
            try {
              await plugin.after.call(conn, m, extra);
            } catch (e) {
              console.error(e);
            }
          }
          if (m.limit && plugin.limit && !isPremium) {
            let cap = `*[ ${m.limit + 1} USAGE ]*\n> • _Total Limit : *[ ${db.data.users[m.sender].limit} ]*`;
          }
        }
        break;
      }
    }
    let extras = {
      body,
      budy,
      prefix,
      isCmd,
      args,
      full_args,
      command,
      text,
      pushname,
      botNumber,
      isSewa,
      quoted,
      mime,
      conn,
      participants,
      groupMetadata,
      groupName,
      userk,
      bot,
      isCreator,
      isRAdmin,
      isAdmins,
      isBotAdmins,
      isPremium,
      chatUpdate
    };
    require('./case/case')(m, extras)
  } catch (err) {
    const errornya = `*👤 Sender:* ${m?.sender}\n*🌐 From:* ${m?.chat}\n*💬 Chat:* ${m?.text}\n*📄 Error Logs:* ${util.format(err)}`
    conn.sendMessage(owner+'@s.whatsapp.net', {
      text: errornya.trim()})
    let e = String(err)
    if (e.includes("this.isZero")) {
      return
    }
    if (e.includes("rate-overlimit")) {
      if (!db.data.settings[botNumber].public) return
      db.data.settings[botNumber].public = false
      await conn.sendMessage(owner+"@s.whatsapp.net", {
        text: `Terjadi rate-overlimit Bot telah mengganti dari mode Public ke mode Self Untuk menghindari spam yang berlebihan, Silakan tunggu 1 menit hingga semua pesan telah terbaca oleh bot`
      })
      await setTimeout(() => {
        db.data.settings[botNumber].public = true
        conn.sendMessage(owner+"@s.whatsapp.net", {
          text: `Berhasil mengubah mode self ke mode public`
        })
      }, 60000)
      return
    }
    if (e.includes('connection Closed')) {
      return
    }
    if (e.includes('Timed Out')) {
      return
    }
    if (e.includes('Value not found')) {
      return
    }
  }
},
  async participantsUpdate({ id, participants, action }) {
    console.log(JSON.stringify({id,participants,action}))
    if (opts["self"]) return;

    if (global.isInit) return;
    let chat = global.db.data.chats[id] || {};
    let text = "";
    switch (action) {
      case "add":
      case "remove":
        if (chat.welcome) {
          let groupMetadata =
            (await conn.groupMetadata(id)) || (conn.chats[id] || {}).metadata;
          for (let user of participants) {
            let pp = "https://i.ibb.co/sQTkHLD/ppkosong.png";
            let name = await conn.getName(user);
            let gpname = await conn.getName(id);
            let member = groupMetadata.participants.length;
            pp: pp;
            try {
              pp = await conn.profilePictureUrl(user, "image");
            } catch (e) {
            } finally {
              text = (
                action === "add"
                  ? (
                      chat.sWelcome ||
                      conn.welcome ||
                      conn.welcome ||
                      "Welcome, @user!"
                    )
                      .replace("@subject", await conn.getName(id))
                      .replace(
                        "@desc",
                        groupMetadata.desc
                          ? String.fromCharCode(8206).repeat(4001) +
                              groupMetadata.desc
                          : "",
                      )
                  : chat.sBye || conn.bye || conn.bye || "Bye, @user!"
              ).replace("@user", "@" + user.split("@")[0]);
              let wel = pp;
              let lea = pp;
              conn.sendMessage(
                id,
                {
                  document: fs.readFileSync("./package.json"),
                  fileName: wm,
                  mimetype: "application/pdf",
                  fileLength: 9999999,
                  pageCount: fpagedoc,
                  caption: text,
                  contextInfo: {
                    mentionedJid: [user],
                    externalAdReply: {
                      title:
                        action === "add"
                          ? "W E L C O M E  U S E R"
                          : "G O O D B Y E  U S E R",
                      body: "",
                      thumbnailUrl: pp,
                      sourceUrl: null,
                      mediaType: 1,
                      renderLargerThumbnail: true,
                    },
                  },
                },
                { quoted: null },
              );
            }
          }
        }
        break;
      case "promote":
        text =
          chat.sPromote ||
          conn.spromote ||
          conn.spromote ||
          "@user ```is now Admin```";
      case "demote":
        if (!text)
          text =
            chat.sDemote ||
            conn.sdemote ||
            conn.sdemote ||
            "@user ```is no longer Admin```";
        text = text.replace("@user", "@" + participants[0].split("@")[0]);
        if (chat.detect) conn.sendMessage(id, { text: text });
        break;
    }
  },
  async GroupUpdate({ jid, desc, descId, descTime, descOwner, announce, m }) {
    if (!db.data.chats[jid].desc) return;
    if (!desc) return;
    let caption = `
    @${descOwner.split`@`[0]} telah mengubah deskripsi grup.
    ${desc}
        `.trim();
    conn.sendMessage(jid, caption, { quoted: m });
  },
}
global.dfail = async (type, m, conn) => {
  let msg = {
    rowner: `*• Owner Mode:* This feature is only for owners`,
    owner: `*• Owner Mode:* This feature is only for owners`,
    mods: `*• Moderator Mode:* This feature is for moderators only`,
    group: `*• Group Mode:* This feature is only for groups`,
    banned: `*• Banned Mode:* This feature is only for Banned user`,
    private: `*• Private Chat Mode:* This feature is only for private chat`,
    admin: `*• Admin Mode:* This feature is only for admin`,
    botAdmin: `*• Bot Admin Mode:* bot must be an admin to use this feature`,
    restrict: `*• Restricted Mode:* This feature is disabled`,
    block: `*• Block Command :* This features has Blokir`,
    unreg: `*[ REGISTER FOR USE BOT ]*\n> • _.daftar *[name.age.gender]*_`,
    premium: `*• Premium mode:* This features only for premium user`,
    sewa: `*• Sewa mode:* This group has not rented bots`,
  }[type];
  if (msg)
    return conn.sendMessage(
    m.chat,
    {
      text: msg,
      contextInfo: {
        mentionedJid: conn.parseMention(msg),
        groupMentions: [],
        isForwarded: true,
        businessMessageForwardInfo: {
          businessOwnerJid: global.owner + "@s.whatsapp.net",
        },
        forwardingScore: 256,
        externalAdReply: {
          title: "[ ACCESS DANIED ]",
          body: wm,
          thumbnail: thumbfs,
          sourceUrl: null,
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    },
    {
      quoted: m
    },
  );
};

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(color(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})