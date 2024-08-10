const fs = require('fs')
const {
  color
} = require('../lib/myfunc')
const pathName = './src/db/sticker-blocked.json';

const addBlockedStickers = (filename, _dir) => {
  _dir.push(filename)
  fs.writeFileSync(pathName, JSON.stringify(_dir, null, 2))
}

const checkBlockedStickers = async (buffer, _dir) => {
  let status = false;
  buffer = await buffer.download();
  buffer = String(buffer)
  for (let i of _dir) {
    let pathSaved = `${i}`;
    let sticker = fs.readFileSync(pathSaved);
    sticker = String(sticker)
    if (buffer === sticker) {
      status = true;
    }
  }
  return status;
}

module.exports = {
  addBlockedStickers,
  checkBlockedStickers
}

//—————「 Batas Akhir 」—————//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(color(`Update'${__filename}'`))
  delete require.cache[file]
  require(file)
})