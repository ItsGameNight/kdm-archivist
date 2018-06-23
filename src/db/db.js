/*
 * A parent class for the individual dbs
 */

import Datastore from 'nedb'
import path from 'path'

class Database {
  constructor (dbpath, name) {
    this.db = new Datastore({ filename: path.join(dbpath, name), autoload: true })
  }

  // Compact db into one row per object format
  loadDatabase () {
    this.db.loadDatabase((err) => {
      if (err) {
        throw (err)
      }
    })
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

  remove (id, cb) {
    this.db.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(numRemoved)
      }
    })
  }

  removeAllByCondition (condObj, cb) {
    this.db.remove(condObj, { multi: true }, (err, numRemoved) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(numRemoved)
      }
    })
  }

  createNew (obj, cb) {
    this.db.insert(obj, (err, newDoc) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(newDoc)
      }
    })
  }

  update (criteria, updates, options, cb) {
    this.db.update(criteria, { $set: updates }, options, (err, numUp) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(numUp)
      }
    })
  }

  updateOne (id, updates, cb) {
    this.update({ _id: id }, updates, {}, cb)
  }

  getAll (cb) {
    this.getMatching({}, cb)
  }

  getAllSortedBy (sortCriteria, cb) {
    this.getMatchingSortedBy({}, sortCriteria, cb)
  }

  getMatchingSortedBy (criteria, sortCriteria, cb) {
    this.db.find(criteria).sort(sortCriteria).exec((err, docs) => {
      if (err) {
        throw (err)
      }

      if (cb && typeof cb === 'function') {
        cb(docs)
      }
    })
  }

  // THIS IS ONLY FOR TEST PURPOSES
  // Delete entire this.db
  dropAll (cb) {
    this.db.remove({ }, { multi: true }, (err, numRem) => {
      if (err) {
        throw (err)
      }
      this.db.loadDatabase((err) => {
        if (err) {
          throw (err)
        }
        if (cb && typeof cb === 'function') {
          cb()
        }
      })
    })
  }
}

export default Database
