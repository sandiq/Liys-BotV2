const process = require('process');
const os = require('os');
const fs = require('fs');
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
} = require("../lib/myfunc");
let {
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia,
} = require("@adiwajshing/baileys");

const timeStyle = {
  timeStyle: 'long'
}
const dateStyle = {
  dateStyle: 'long'
}
let date = new Date().toLocaleString('id-ID', dateStyle)
let time = new Date().toLocaleString('id-ID', timeStyle)

let menulist = async (m, {
  conn, prefix, command, args, isPremium
}) => {
  console.log(command);
  let botNumber = await conn.decodeJid(conn.user.id);
  let tagCount = {};
  let tagHelpMapping = {};
  let user = global.db.data.users[m.sender]
  Object.keys(global.plugins)
  .filter((plugin) => !plugin.disabled)
  .forEach((plugin) => {
    const tagsArray = Array.isArray(global.plugins[plugin].tags)
    ? global.plugins[plugin].tags: [];

    if (tagsArray.length > 0) {
      const helpArray = Array.isArray(global.plugins[plugin].help)
      ? global.plugins[plugin].help: [global.plugins[plugin].help];

      tagsArray.forEach((tag) => {
        if (tag) {
          if (tagCount[tag]) {
            tagCount[tag]++;
            tagHelpMapping[tag].push(...helpArray);
          } else {
            tagCount[tag] = 1;
            tagHelpMapping[tag] = [...helpArray];
          }
        }
      });
    }
  });
  
  //console.log(tagHelpMapping)
  
  // owner menu
  const ownerTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "owner") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // sticker menu
  const stickerTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "sticker") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // tools menu
  const toolsTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "tools") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // ai menu
  const aiTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "ai") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // main menu
  const mainTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "main") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // downloader menu
  const dlTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "downloader") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // internet menu
  const internetTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "internet") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // voice menu
  const voiceTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "voice") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // fun menu
  const funTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "fun") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // anime menu
  const animeTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "anime") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // nsfw menu
  const nsfwTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "nsfw") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // game menu
  const gameTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "game") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // rpg menu
  const rpgTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "rpg") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  // group menu
  const groupTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    if (tag === "group") {
      const daftarHelp = tagHelpMapping[tag]
      .map((helpItem, index) => {
        return `${usedPrefix + helpItem}`;
      })
      .join("\n      . . ┊⿻  ");
      return `${daftarHelp}`;
    }
  }).join("")
  
  /*const allTagsAndHelp = Object.keys(tagCount)
  .map((tag) => {
    const daftarHelp = tagHelpMapping[tag]
    .map((helpItem, index) => {
      return `${usedPrefix + helpItem}`;
    })
    .join("\n      . . ┊⿻  ");
    return `\n      乂 *${tag.toUpperCase()}*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${daftarHelp}
      . . ╰─────────╮`;
      }).join("\n");*/
  
  let tek = ` ${args.length > 0 ? "ʜᴀʟᴏ @"+ m?.sender.split('@')[0]+"!\n" : "\n"}
. . ╭── ︿︿︿︿︿ .   .   .   .   .   .
. . ┊ ‹‹ *ɴᴀᴍᴇ* :: ${user.name ? user.name: pushname}
. . ┊ ‹‹ *ᴀɢᴇ* :: ${user.age !== -1 ? user.age: 'Not Register'}
. . ┊ ‹‹ *ɢᴇɴᴅᴇʀ* :: ${user.gender ? myGender(user.gender): 'Not Register'}
. . ┊ ‹‹ *ᴘʀᴇᴍɪᴜᴍ* :: ${isPremium ? 'Yes': 'No'}
. . ┊ ‹‹ *ʟɪᴍɪᴛ* :: ${isPremium ? 'Unlimited': user.limit}
. . ┊ ‹‹ *ᴠᴇʀɪꜰʏ* :: ${user.regTime !== -1 ? new Date(user.regTime).toLocaleString(): 'Not Verify'}
. . ┊•*⁀➷ °... ℛᥱᥲᴅ ᴛʜι᥉ ...
. . ┊• ° *_Dilarang menelpon atau_*
. . ┊    *_video call bot_*
. . ┊• ° *_Dilarang kirim berbagai bug,_*
. . ┊    *_virtex, dll ke nomor bot_*
. . ┊• ° *_Dilarang keras melakukan_*
. . ┊    *_spam dalam penggunaan bot_*
. . ┊• ° *_Dilarang menculik bot_*
. . ┊    *_secara illegal_*
. . ┊• ° *_Tidak menyalah gunakan_*
. . ┊    *_fitur-fitur bot_*
. . ╰───╮‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
      . . ┊⿻ [ *ɴᴀᴍᴇ* :: ${global.nameBot} ] . .
      . . ┊⿻ [ *ʀᴜɴᴛɪᴍᴇ* :: ${runtime(process.uptime())} ] . .
      . . ┊⿻ [ *ᴘʀᴇғɪx* :: <${prefix}> ] . .
      . . ┊⿻ [ *ғᴇᴀᴛᴜʀᴇ* :: ${fiturName().length + Object.keys(global.plugins).length} ] . .
      . . ┊⿻ [ *ᴅᴀᴛᴇ* :: ${date} ] . .
      . . ┊⿻ [ *ᴛɪᴍᴇ* :: ${time} ] . .
      . . ┊⿻ [ *ᴘʟᴀᴛғᴏʀᴍ* :: ${os.platform()} ] . .
      . . ┊⿻ [ *ʟɪʙʀᴀʀʏ* :: ʙᴀɪʟᴇʏꜱ ] . .
      . . ┊⿻ [ *ᴄʀᴇᴀᴛᴏʀ* :: ${global.author} ] . .
      . . ╰───╮
            . . ┊⿻ (Ⓟ) = ᴘʀᴇᴍɪᴜᴍ
            . . ┊⿻ (Ⓕ) = ғʀᴇᴇ
            . . ┊⿻ (Ⓛ) = ʟɪᴍɪᴛ
            . . ┊⿻ (Ⓞ) = ᴏᴡɴᴇʀ
            . . ╰─────────╮
`

if (args[0] === "owner" || args[0] === "all") tek += `      乂  *ᴏ ᴡ ɴ ᴇ ʀ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  $ (Ⓞ)
      . . ┊⿻  => (Ⓞ)
      . . ┊⿻  v (Ⓞ)
      . . ┊⿻  ${prefix}bot (Ⓞ)
      . . ┊⿻  ${prefix}leave (Ⓞ)
      . . ┊⿻  ${prefix}join (Ⓞ)
      . . ┊⿻  ${prefix}restart (Ⓞ)
      . . ┊⿻  ${prefix}clearusers (Ⓞ)
      . . ┊⿻  ${prefix}clearses (Ⓞ)
      . . ┊⿻  ${prefix}addprem (Ⓞ)
      . . ┊⿻  ${prefix}delprem (Ⓞ)
      . . ┊⿻  ${ownerTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "stickers" || args[0] === "all") tek += `      乂  *ꜱ ᴛ ɪ ᴄ ᴋ ᴇ ʀ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}sticker (Ⓕ)
      . . ┊⿻  ${prefix}smeme (Ⓛ)
      . . ┊⿻  ${prefix}qc (Ⓛ)
      . . ┊⿻  ${prefix}wm (Ⓛ)
      . . ┊⿻  ${prefix}swm (Ⓛ)
      . . ┊⿻  ${stickerTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "tools" || args[0] === "all") tek += `      乂  *ᴛ ᴏ ᴏ ʟ ꜱ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}remini (Ⓛ)
      . . ┊⿻  ${prefix}coloring (Ⓛ)
      . . ┊⿻  ${prefix}igstalk (Ⓛ)
      . . ┊⿻  ${prefix}gitstalk (Ⓛ)
      . . ┊⿻  ${prefix}ppcouple (Ⓛ)
      . . ┊⿻  ${prefix}tourl (Ⓛ)
      . . ┊⿻  ${prefix}removebg (Ⓛ)
      . . ┊⿻  ${prefix}toanime (Ⓟ)
      . . ┊⿻  ${prefix}tozombie (Ⓟ)
      . . ┊⿻  ${prefix}tts (Ⓕ)
      . . ┊⿻  ${prefix}readvo (Ⓟ)
      . . ┊⿻  ${prefix}delchat (Ⓕ)
      . . ┊⿻  ${prefix}tr (Ⓕ)
      . . ┊⿻  ${prefix}jarak (Ⓛ)
      . . ┊⿻  ${prefix}kalkulator (Ⓕ)
      . . ┊⿻  ${prefix}ipwho (Ⓟ)
      . . ┊⿻  ${prefix}swtext (Ⓟ)
      . . ┊⿻  ${prefix}swimg (Ⓟ)
      . . ┊⿻  ${prefix}swvid (Ⓟ)
      . . ┊⿻  ${prefix}get (Ⓛ)
      . . ┊⿻  ${toolsTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "ai" || args[0] === "all") tek += `      乂  *ᴀ ɪ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}gemini (Ⓟ)
      . . ┊⿻  ${prefix}delgemini (Ⓟ)
      . . ┊⿻  ${prefix}gemini-img (Ⓟ)
      . . ┊⿻  ${prefix}ai (Ⓕ)
      . . ┊⿻  ${prefix}gpt (Ⓕ)
      . . ┊⿻  ${aiTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "main" || args[0] === "all") tek += `      乂  *ᴍ ᴀ ɪ ɴ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}menu (Ⓕ)
      . . ┊⿻  ${prefix}help (Ⓕ)
      . . ┊⿻  ${prefix}ping (Ⓕ)
      . . ┊⿻  ${prefix}disk (Ⓕ)
      . . ┊⿻  ${prefix}daftar (Ⓕ)
      . . ┊⿻  ${prefix}unreg (Ⓕ)
      . . ┊⿻  ${prefix}ceksn (Ⓕ)
      . . ┊⿻  ${prefix}totalfitur (Ⓕ)
      . . ┊⿻  ${prefix}listsewa (Ⓕ)
      . . ┊⿻  ${prefix}listpremium (Ⓕ)
      . . ┊⿻  ${prefix}owner (Ⓕ)
      . . ┊⿻  ${prefix}donate (Ⓕ)
      . . ┊⿻  ${mainTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "downloader" || args[0] === "all") tek += `      乂  *ᴅ ᴏ ᴡ ɴ ʟ ᴏ ᴀ ᴅ ᴇ ʀ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}tiktok (Ⓛ)
      . . ┊⿻  ${prefix}instagram (Ⓛ)
      . . ┊⿻  ${prefix}facebook (Ⓛ)
      . . ┊⿻  ${prefix}aiodl (Ⓛ)
      . . ┊⿻  ${prefix}ytv (Ⓛ)
      . . ┊⿻  ${prefix}yta (Ⓛ)
      . . ┊⿻  ${prefix}play (Ⓛ)
      . . ┊⿻  ${prefix}ttslide (Ⓛ)
      . . ┊⿻  ${prefix}mediafire (Ⓛ)
      . . ┊⿻  ${prefix}gitclone (Ⓛ)
      . . ┊⿻  ${dlTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "internet" || args[0] === "all") tek += `      乂  *ɪ ɴ ᴛ ᴇ ʀ ɴ ᴇ ᴛ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}tiktoksearch (Ⓛ)
      . . ┊⿻  ${prefix}ytsearch (Ⓛ)
      . . ┊⿻  ${prefix}pinterest (Ⓛ)
      . . ┊⿻  ${prefix}stickers (Ⓛ)
      . . ┊⿻  ${internetTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "voice" || args[0] === "all") tek += `      乂  *ᴠ ᴏ ɪ ᴄ ᴇ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}bass (Ⓕ)
      . . ┊⿻  ${prefix}blown (Ⓕ)
      . . ┊⿻  ${prefix}deep (Ⓕ)
      . . ┊⿻  ${prefix}earrape (Ⓕ)
      . . ┊⿻  ${prefix}fast (Ⓕ)
      . . ┊⿻  ${prefix}fat (Ⓕ)
      . . ┊⿻  ${prefix}nightcore (Ⓕ)
      . . ┊⿻  ${prefix}reverse (Ⓕ)
      . . ┊⿻  ${prefix}robot (Ⓕ)
      . . ┊⿻  ${prefix}slow (Ⓕ)
      . . ┊⿻  ${prefix}smooth (Ⓕ)
      . . ┊⿻  ${prefix}tupai (Ⓕ)
      . . ┊⿻  ${voiceTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "fun" || args[0] === "all") tek += `      乂  *F U N*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}checkhodam (Ⓕ)
      . . ┊⿻  ${funTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "anime" || args[0] === "all") tek += `      乂  *ᴀ ɴ ɪ ᴍ ᴇ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}waifurandom (Ⓛ)
      . . ┊⿻  ${animeTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "nsfw" || args[0] === "all") tek += `      乂  *N S F W*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}xhentairandom (Ⓟ)
      . . ┊⿻  ${nsfwTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "game" || args[0] === "all") tek += `      乂  *ɢ ᴀ ᴍ ᴇ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}family100 (Ⓕ)
      . . ┊⿻  ${prefix}tebakgambar (Ⓕ)
      . . ┊⿻  ${prefix}tebakkata (Ⓕ)
      . . ┊⿻  ${prefix}siapaaku (Ⓕ)
      . . ┊⿻  ${prefix}tebakkalimat (Ⓕ)
      . . ┊⿻  ${prefix}caklontong (Ⓕ)
      . . ┊⿻  ${prefix}susunkata (Ⓕ)
      . . ┊⿻  ${prefix}tekateki (Ⓕ)
      . . ┊⿻  ${prefix}tebakkimia (Ⓕ)
      . . ┊⿻  ${prefix}tebaklirik (Ⓕ)
      . . ┊⿻  ${prefix}tebaktebakan (Ⓕ)
      . . ┊⿻  ${gameTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "rpg" || args[0] === "all") tek += `      乂  *ʀ ᴘ ɢ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${rpgTagsAndHelp}
      . . ╰─────────╮
`
if (args[0] === "group" || args[0] === "all") tek += `      乂  *ɢ ʀ ᴏ ᴜ ᴘ*

      . . ╭── ︿︿︿︿︿ .   .   .   .   .   .
      . . ┊⿻  ${prefix}add (Ⓕ)
      . . ┊⿻  ${prefix}kick (Ⓕ)
      . . ┊⿻  ${prefix}hidetag (Ⓕ)
      . . ┊⿻  ${prefix}group (Ⓕ)
      . . ┊⿻  ${prefix}tagall (Ⓕ)
      . . ┊⿻  ${prefix}editsubjek (Ⓕ)
      . . ┊⿻  ${prefix}editdesk (Ⓕ)
      . . ┊⿻  ${prefix}editinfo (Ⓕ)
      . . ┊⿻  ${prefix}antilink (Ⓕ)
      . . ┊⿻  ${prefix}antilinkv2 (Ⓕ)
      . . ┊⿻  ${prefix}addblocksticker (Ⓕ)
      . . ┊⿻  ${prefix}stickerblocked (Ⓕ)
      . . ┊⿻  ${prefix}promte (Ⓕ)
      . . ┊⿻  ${prefix}demote (Ⓕ)
      . . ┊⿻  ${prefix}ceksewa (Ⓕ)
      . . ┊⿻  ${groupTagsAndHelp}
      . . ╰─────────╮
`
if (args.length > 0) tek += `\n\n> © ${new Date().getFullYear()} Created By ${wm}.`
/*tek += owners
tek += mains
tek += stickers
tek += ais
tek += downloaders
tek += internets
tek += games
tek += groups
tek += funs
tek += tools
tek += nsfws
tek += animes
tek += voices
tek += footer*/
  
  if (args.length > 0) {
    conn.sendMessage(m?.chat, {
    document: fs.readFileSync("./package.json"),
    jpegThumbnail: {
      url: global.thumb
    },
    fileName: ucapanWaktu,
    fileLength: 99999999999999,
    pageCount: "100",
    mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    caption: tek,
    contextInfo: {
      externalAdReply: {
        containsAutoReply: true,
        mediaType: 1,
        mediaUrl: '',
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: global.sosmed.ig,
        thumbnail: global.thumbfs,
        title: global.foter1,
        body: global.foter2,
      },
      forwardingScore: 10,
      isForwarded: true,
      mentionedJid: [m?.sender],
      businessMessageForwardInfo: {
        businessOwnerJid: botNumber
      },
      forwardedNewsletterMessageInfo: {
        newsletterJid: global.idcennel,
        serverMessageId: null,
        newsletterName: global.foter3
      }
    }
  }, {
    quoted: {
      key: {
        participant: '0@s.whatsapp.net', remoteJid: '0@s.whatsapp.net'
      }, message: {
        conversation: global.foter4
      }
    }});
  } else {
    let rows = [
      {
        title: 'All Menu',
        description: 'Displays All Menu ( List Menu )',
        id: `${prefix}menu all`
      },
      {
        title: 'Owner Menu',
        description: 'Displays Owner Menu ( List Menu )',
        id: `${prefix}menu owner`
      },
      {
        title: 'Sticker Menu',
        description: 'Displays Sticker Menu ( List Menu )',
        id: `${prefix}menu stickers`
      },
      {
        title: 'Tools Menu',
        description: 'Displays Tools Menu ( List Menu )',
        id: `${prefix}menu tools`
      },
      {
        title: 'Main Menu',
        description: 'Displays Main Menu ( List Menu )',
        id: `${prefix}menu main`
      },
      {
        title: 'Downloader Menu',
        description: 'Displays Downloader Menu ( List Menu )',
        id: `${prefix}menu downloader`
      },
      {
        title: 'Internet Menu',
        description: 'Displays Internet Menu ( List Menu )',
        id: `${prefix}menu internet`
      },
      {
        title: 'Voice Menu',
        description: 'Displays Voice Menu ( List Menu )',
        id: `${prefix}menu voice`
      },
      {
        title: 'Fun Menu',
        description: 'Displays Fun Menu ( List Menu )',
        id: `${prefix}menu fun`
      },
      {
        title: 'Anime Menu',
        description: 'Displays Anime Menu ( List Menu )',
        id: `${prefix}menu anime`
      },
      {
        title: 'NSFW Menu',
        description: 'Displays NSFW Menu ( List Menu )',
        id: `${prefix}menu nsfw`
      },
      {
        title: 'Game Menu',
        description: 'Displays Game Menu ( List Menu )',
        id: `${prefix}menu game`
      },
      {
        title: 'RPG Menu',
        description: 'Displays RPG Menu ( List Menu )',
        id: `${prefix}menu rpg`
      },
      {
        title: 'Group Menu',
        description: 'Displays Group Menu ( List Menu )',
        id: `${prefix}menu group`
      }
    ]
    let sections = [
      {
        title: "List Menu Liys",
        highlight_label: 'Populer Menu',
        rows,
      },
    ];
    let listMessage = {
      title: "List Menu",
      sections,
    };
    let msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: tek,
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: `© ${new Date().getFullYear()} Created By ${wm}.`,
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                title: `*Hello, @${m.sender.replace(/@.+/g, "")}!*`,
                subtitle: "NdyZz",
                hasMediaAttachment: true,
                ...(await prepareWAMessageMedia(
                  {
                    image: thumbfs,
                  },
                  { upload: conn.waUploadToServer }
                )),
              }),
              nativeFlowMessage:
                proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [
                    {
                      name: "single_select",
                      buttonParamsJson: JSON.stringify(listMessage),
                    },
                    {
                      name: "cta_url",
                      buttonParamsJson:
                        `{"display_text":"Lihat saluran","url":"https://whatsapp.com/channel/0029VaBO3TX6LwHefPWXst2E","merchant_ur":"1"}`,
                    },
                  ],
                }),
                contextInfo: {
                mentionedJid: [m.sender],
                ...({
                  stanzaId: m.key.id,
                  remoteJid: '0@s.whatsapp.net',
                  participant: '0@s.whatsapp.net',
                  fromMe: m.key.fromMe,
                  quotedMessage: {
                    conversation: global.foter4
                  }
                }),
              },
            }),
          },
        },
      },
      {}
    );
  
    await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
    });
  }
}

menulist.help = ["help","menu"].map((a) => a + " (Ⓕ)");
menulist.tags = ["main"];
menulist.command = ["help","menu"];

module.exports = menulist;

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

/*function clockString(ms) {
  let h = isNaN(ms) ? "--": Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--": Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--": Math.floor(ms / 1000) % 60;
  return [h,
    m,
    s].map((v) => v.toString().padStart(2,
      0)).join(":");
}*/