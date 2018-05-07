import Datastore from 'nedb'
import path from 'path'
import remote from 'electron'

// Load datastores
var db = new Datastore({ filename: path.join(remote.app.getPath('userData'), 'survivors.db'), autoload: true })

// Get all survivors in database
export function getAll (smtID, cb) {
  getMatching(smtID, {}, cb)
}

// Get survivors that match criteria
export function getMatching (smtID, criteria, cb) {
  criteria.settlementID = smtID
  db.find(criteria, (err, docs) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(docs)
    }
  })
}

// Get all survivors sorted by field(s)
export function getAllSortedBy (smtID, sortCriteria, cb) {
  getMatchingSortedBy(smtID, {}, sortCriteria, cb)
}

// Get survivors that match criteria sorted by sort criteria
export function getMatchingSortedBy (smtID, criteria, sortCriteria, cb) {
  criteria.settlementID = smtID
  db.find(criteria).sort(sortCriteria).exec((err, docs) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(docs)
    }
  })
}

// Get count of survivors matching criteria
export function countMatching (smtID, criteria, cb) {
  criteria.settlementID = smtID
  db.count(criteria, (err, count) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(count)
    }
  })
}

// Get count of all survivors
export function count (smtID, cb) {
  countMatching(smtID, {}, cb)
}

// Add a survivor
export function add (smtID, survivor, cb) {
  // Data validation
  // TODO

  survivor.settlementID = smtID
  db.insert(survivor, (err, newDoc) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(newDoc)
    }
  })
}

/*
// Add a base unnamed survivor
export function addBase (smtID, cb) {
  // TODO FIX!
  add(smtID, module.exports.survivors.base, cb)
}
*/

// Update a survivor based on id
export function update (survID, updates, cb) {
  db.update({ _id: survID }, { $set: updates }, {}, (err, numUp) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(numUp)
    }
  })
}

/*
// Update all survivors in a settlement
module.exports.survivors.updateSettlement = function (smtID, updates, cb) {
  db.update({ settlementID: smtID }, { $set: updates }, { multi: true }, (err, numUp) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(numUp)
    }
  })
}
*/

// Remove survivor by ID
export function remove (survID, cb) {
  db.remove({ _id: survID }, {}, (err, numRemoved) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(numRemoved)
    }
  })
}

// THIS IS ONLY FOR TEST PURPOSES
// Delete entire db
export function dropAll () {
  db.remove({ }, { multi: true }, (err, numRem) => {
    if (err) {
      throw (err)
    }
    db.loadDatabase((err) => {
      if (err) {
        throw (err)
      }
    })
  })
}

// Compact db into one row per object format
export function loadDatabase () {
  db.loadDatabase((err) => {
    if (err) {
      throw (err)
    }
  })
}
