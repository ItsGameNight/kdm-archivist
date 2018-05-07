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
}

export default Database
