import Database from './db'

class SurvivorsDatabase extends Database {
  constructor (dbpath, smtsdb) {
    super(dbpath, 'survivors.db')
    this.smtsdb = smtsdb
  }

  // Get all survivors in database
  getAllInSettlement (smtID, cb) {
    this.getMatching(smtID, {}, cb)
  }

  // Get survivors that match criteria
  getMatching (smtID, criteria, cb) {
    criteria.settlementID = smtID
    super.getMatching(criteria, cb)
  }

  computeGoodness (survID, cb) {
    super.getMatching({ _id: survID }, (s) => {
      // compute props
      s = s[0]
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
      cb(goodness) // must call variable, not literal (thanks eslint)
    })
  }

  // Get all survivors sorted by field(s)
  getAllSortedBy (smtID, sortCriteria, cb) {
    this.getMatchingSortedBy(smtID, {}, sortCriteria, cb)
  }

  // Get survivors that match criteria sorted by sort criteria
  getMatchingSortedBy (smtID, criteria, sortCriteria, cb) {
    criteria.settlementID = smtID
    super.getMatchingSortedBy(criteria, sortCriteria, cb)
  }

  // Get count of survivors matching criteria
  countMatching (smtID, criteria, cb) {
    criteria.settlementID = smtID
    this.db.count(criteria, (err, count) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(count)
      }
    })
  }

  // Get count of all survivors
  count (smtID, cb) {
    this.countMatching(smtID, {}, cb)
  }

  add (smtID, survivor, cb) {
    // Data validation
    // TODO

    survivor.settlementID = smtID
    super.createNew(survivor, cb)
  }

  // Add a base unnamed survivor
  addBase (smtID, updates, cb) {
    this.smtsdb.getMatching({ _id: smtID }, (smts) => {
      if (smts.length === 0) {
        throw new Error('Tried to add base survivor for non-existant settlement!')
      }
      // get base survivor
      var surv = smts[0].baseSurvivor
      // update it
      for (var key in updates) {
        if (key in surv) {
          surv[key] = updates[key]
        }
      }
      // add to population
      this.add(smtID, surv, cb)
    })
  }

  // Update all survivors in a settlement
  updateSettlement (smtID, updates, cb) {
    // note the multi: true to update all that match
    this.update({ settlementID: smtID }, updates, { multi: true }, cb)
  }
}

export default SurvivorsDatabase
