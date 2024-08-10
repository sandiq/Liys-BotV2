/**
* Growth rate
* `2.576652002695681`
*/
let growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * 0.75
/**
* get XP range at specified level
* @param {Number} level
* @param {Number} multiplier
*/
let xpRange = (level, multiplier = global.multiplier || 1) => {
  if (level < 0) throw new TypeError("level cannot be negative value");
  level = Math.floor(level);
  let min =
  level === 0
  ? 0: Math.round(Math.pow(level, growth) * multiplier) + 1;
  let max = Math.round(Math.pow(++level, growth) * multiplier);
  return {
    min,
    max,
    xp: max - min,
  };
}
/**
* get level by xp
* @param {Number} xp
* @param {Number} multiplier
*/
let findLevel = (xp, multiplier = global.multiplier || 1) => {
  if (xp === Infinity) return Infinity;
  if (isNaN(xp)) return NaN;
  if (xp <= 0) return -1;
  let level = 0;
  do level++;
  while (xpRange(level, multiplier).min <= xp);
  return --level;
}
/**
* is able to level up?
* @param {Number} level
* @param {Number} xp
* @param {Number} multiplier
*/
let canLevelUp = (level, xp, multiplier = global.multiplier || 1) => {
  if (level < 0) return false;
  if (xp === Infinity) return true;
  if (isNaN(xp)) return false;
  if (xp <= 0) return false;
  return level < findLevel(xp, multiplier);
}

module.exports = {
  growth,
  xpRange,
  findLevel,
  canLevelUp
}