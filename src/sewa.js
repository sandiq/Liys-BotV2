const fs = require('fs')
const toMs = require('ms')
const {
  color
} = require('../lib/myfunc')

const pathName = './src/db/sewa.json';

/**
* Add Sewa group.
* @param {String} gid
* @param {String} expired
* @param {Object} _dir
*/
const addSewaGroup = (gid, expired, _dir) => {
  const obj = {
    id: gid,
    expired: Date.now() + toMs(expired),
    status: true
  }
  _dir.push(obj)
  fs.writeFileSync(pathName, JSON.stringify(_dir, null, 2))
}

/**
* Get sewa group position.
* @param {String} gid
* @param {Object} _dir
* @returns {Number}
*/
const getSewaPosition = (gid, _dir) => {
  let position = null
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === gid) {
      position = i
    }
  })
  if (position !== null) {
    return position
  }
}

/**
* Get sewa group expire.
* @param {String} gid
* @param {Object} _dir
* @returns {Number}
*/
const getSewaExpired = (gid, _dir) => {
  let position = null
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === gid) {
      position = i
    }
  })
  if (position !== null) {
    return _dir[position].expired
  }
}

/**
* Check group is sewa.
* @param {String} gid
* @param {Object} _dir
* @returns {Boolean}
*/
const checkSewaGroup = (gid, _dir) => {
  let status = false
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === gid) {
      status = true
    }
  })
  return status
}

/**
* Constantly checking sewa.
* @param {object} WAConnection
* @param {Object} _dir
*/
const expiredSewaCheck = (WAConnection, _dir) => {
  setInterval(async() => {
    let position = null
    Object.keys(_dir).forEach((i) => {
      if (Date.now() >= _dir[i].expired) {
        position = i
      }
    })
    if (position !== null) {
      console.log(`Sewa expired: ${_dir[position].id}`)
      await WAConnection.sendMessage(_dir[position].id, {
        text: `Masa sewa di grup ini telah habis, hubungi owner untuk sewa lagi!`
      })
      //await WAConnection.groupLeave(_dir[position].id)
      _dir.splice(position, 1)
      fs.writeFileSync(pathName, JSON.stringify(_dir, null, 2))
    }
  },
    5000)
}

const delSewaGroup = (gid, _dir) => {
  let position = null
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === gid) {
      position = i
    }
  })
  if (position !== null) {
    _dir.splice(position, 1)
    fs.writeFileSync(pathName, JSON.stringify(_dir, null, 2))
    return true
  } else {
    return false
  }
};

const getAllSewaGroup = (_dir) => {
  const array = [];
  Object.keys(_dir).forEach((i) => {
    array.push(_dir[i].id);
  });
  return array;
};

module.exports = {
  addSewaGroup,
  delSewaGroup,
  getSewaExpired,
  getSewaPosition,
  expiredSewaCheck,
  checkSewaGroup,
  getAllSewaGroup
}

//—————「 Batas Akhir 」—————//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(color(`Update'${__filename}'`))
  delete require.cache[file]
  require(file)
})