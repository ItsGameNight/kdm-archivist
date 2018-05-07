import Datastore from 'nedb'
import path from 'path'
import remote from 'electron'
// import fs from 'fs'

// Load datastores
var dbloc
// var smtloc
if (process.env.BABEL_ENV === 'test') {
  console.log('WARNING: NOT USING LOCAL STORAGE FOR SMTS')
  dbloc = 'test_data/settlements.db'
  // smtloc = 'static/baseSettlement.json'
} else if (remote && typeof remote.app !== 'undefined') {
  dbloc = path.join(remote.app.getPath('userData'), '/settlements.db')
  // smtloc = path.join(__static, '/baseSettlement.json')
} else if (remote && typeof remote.remote.app !== 'undefined') {
  console.log(remote.remote)
  dbloc = path.join(remote.remote.app.getPath('userData'), '/settlements.db')
  // smtloc = path.join(__static, '/baseSettlement.json')
} else {
  throw new Error('Unknown user db location')
}

var db = new Datastore({ filename: dbloc, autoload: true })
var baseSmt = {
  'name': null,
  'principles': [],
  'locations': [],
  'innovations': [],
  'resources': [],
  'storedGear': [],
  'quaries': [],
  'storyNotes': [],
  'departedSurvivors': [0, 2],
  'lanternYear': 0,
  'baseSurvivor': {
    'settlementID': null,
    'name': null,
    'sex': null,
    'survival': 0,
    'movement': 5,
    'accuracy': 0,
    'strength': 0,
    'evasion': 0,
    'luck': 0,
    'speed': 0,
    'insanity': 0,
    'xp': 0,
    'courage': 0,
    'boldSkill': null,
    'understanding': 0,
    'insightSkill': null,
    'fightingArts': [],
    'disorders': [],
    'abilities': [],
    'impairments': [],
    'parent1': null,
    'parent2': null,
    'nickname': null,
    'surname': null,
    'other': null
  }
}

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
