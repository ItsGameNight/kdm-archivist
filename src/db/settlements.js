import Datastore from 'nedb'
import path from 'path'
import remote from 'electron'
import fs from 'fs'

// Load datastores
var db = new Datastore({ filename: path.join(remote.app.getPath('userData'), 'settlements.db'), autoload: true })

// Get the base settlement from static
var baseSmt = JSON.parse(fs.readFileSync(path.join(__static, '/baseSettlement.json'), 'utf8'))

export function getMatching (criteria, cb) {
  db.find(criteria, (err, docs) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(docs)
    }
  })
}

// Get all settlements
export function getAll (cb) {
  db.find({}, (err, docs) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(docs)
    }
  })
}

// Get all settlements sorted by field(s)
export function getAllSortedBy (sortCriteria, cb) {
  db.find({}).sort(sortCriteria).exec((err, docs) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(docs)
    }
  })
}

// Create a new settlement
export function createNew (cb) {
  db.insert(baseSmt, (err, newDoc) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(newDoc)
    }
  })
}

// Update a settlement
export function update (smtID, updates, cb) {
  db.update({ _id: smtID }, { $set: updates }, {}, (err, numUp) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === 'function') {
      cb(numUp)
    }
  })
}

// Remove settlement
export function remove (smtID, cb) {
  db.remove({ _id: smtID }, {}, (err, numRemoved) => {
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
