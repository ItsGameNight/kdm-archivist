export default function goodnessFunction (survivor) {
  // compute props
  var s = survivor
  var movediff = s.movement - 5
  var sumstats = movediff + s.strength + s.evasion + s.speed + s.accuracy + s.luck

  // compute goodness -- TODO: allow user tuning
  var goodness = 0
  if (movediff < 0 || s.strength < 0 || s.evasion < 0 || s.speed < 0 || s.accuracy < 0 || s.luck < 0) {
    goodness = 0 // fuq
  } else if (sumstats < 2) {
    goodness = 1 // normie 0-1
  } else if (sumstats < 4) {
    goodness = 2 // yee 2-3
  } else if (sumstats < 6) {
    goodness = 3 // super yee 4 -5
  } else if (sumstats < 8) {
    goodness = 4 // yezus 6-7
  } else {
    goodness = 5 // god? 8+
  }
  return goodness
}
