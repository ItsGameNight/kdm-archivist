import Datastore from 'nedb'
import path from 'path'

class SettlementsDatabase {
  constructor (dbpath) {
    this.db = new Datastore({ filename: path.join(dbpath, 'settlements.db'), autoload: true })
    this.baseSmt = {
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
  }

  getMatching (criteria, cb) {
    this.db.find(criteria, (err, docs) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(docs)
      }
    })
  }

  // Get all settlements
  getAll (cb) {
    this.db.find({}, (err, docs) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(docs)
      }
    })
  }

  // Get all settlements sorted by field(s)
  getAllSortedBy (sortCriteria, cb) {
    this.db.find({}).sort(sortCriteria).exec((err, docs) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(docs)
      }
    })
  }

  // Create a new settlement
  createNew (cb) {
    this.db.insert(this.baseSmt, (err, newDoc) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(newDoc)
      }
    })
  }

  // Update a settlement
  update (smtID, updates, cb) {
    this.db.update({ _id: smtID }, { $set: updates }, {}, (err, numUp) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(numUp)
      }
    })
  }

  // Remove settlement
  remove (smtID, cb) {
    this.db.remove({ _id: smtID }, {}, (err, numRemoved) => {
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

export default SettlementsDatabase
