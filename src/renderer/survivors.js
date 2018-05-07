import Datastore from 'nedb'
import path from 'path'

class SurvivorsDatabase {
  constructor (dbpath, smtsdb) {
    this.db = new Datastore({ filename: path.join(dbpath, 'survivors.db'), autoload: true })
    this.smtsdb = smtsdb
  }

  // Get all survivors in database
  getAll (smtID, cb) {
    this.getMatching(smtID, {}, cb)
  }

  // Get survivors that match criteria
  getMatching (smtID, criteria, cb) {
    criteria.settlementID = smtID
    this.db.find(criteria, (err, docs) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(docs)
      }
    })
  }

  // Get all survivors sorted by field(s)
  getAllSortedBy (smtID, sortCriteria, cb) {
    this.getMatchingSortedBy(smtID, {}, sortCriteria, cb)
  }

  // Get survivors that match criteria sorted by sort criteria
  getMatchingSortedBy (smtID, criteria, sortCriteria, cb) {
    criteria.settlementID = smtID
    this.db.find(criteria).sort(sortCriteria).exec((err, docs) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(docs)
      }
    })
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

  // Add a survivor
  add (smtID, survivor, cb) {
    // Data validation
    // TODO

    survivor.settlementID = smtID
    this.db.insert(survivor, (err, newDoc) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(newDoc)
      }
    })
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

  // Update a survivor based on id
  update (survID, updates, cb) {
    this.db.update({ _id: survID }, { $set: updates }, {}, (err, numUp) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(numUp)
      }
    })
  }

  // Update all survivors in a settlement
  updateSettlement (smtID, updates, cb) {
    this.db.update({ settlementID: smtID }, { $set: updates }, { multi: true }, (err, numUp) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(numUp)
      }
    })
  }

  // Remove survivor by ID
  remove (survID, cb) {
    this.db.remove({ _id: survID }, {}, (err, numRemoved) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(numRemoved)
      }
    })
  }

  // THIS IS ONLY FOR TEST PURPOSES
  // Delete entire this.db
  dropAll () {
    this.db.remove({ }, { multi: true }, (err, numRem) => {
      if (err) {
        throw (err)
      }
      this.db.loadDatabase((err) => {
        if (err) {
          throw (err)
        }
      })
    })
  }

  // Compact db into one row per object format
  loadDatabase () {
    this.db.loadDatabase((err) => {
      if (err) {
        throw (err)
      }
    })
  }
}

export default SurvivorsDatabase
