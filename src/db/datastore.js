const datastore = require('nedb')

// Load datastores
db = {}
db.survivors = new datastore({ filename: __dirname + '/../test_data/survivors.db', autoload: true })
db.settlements = new datastore({ filename: __dirname + '/../test_data/settlements.db', autoload: true })

module.exports.survivors = {}
module.exports.settlements = {}

// Survivors
module.exports.survivors.baseSurvivor = {
  name: null,
  sex: null,
  survival: 0,
  movement: 5,
  accuracy: 0,
  strength: 0,
  evasion: 0,
  luck: 0,
  speed: 0,
  insanity: 0,
  xp: 0,
  courage: 0,
  boldSkill: null,
  understanding: 0,
  insightSkill: null,
  fightingArt1: null,
  fightingArt2: null,
  fightingArt3: null,
  disorder1: null,
  disorder2: null,
  disorder3: null,
  abilities: null,
  impairments: null,
  parent1: null,
  parent2: null,
  nickname: null,
  surname: null,
  other: null
}

// Get all survivors in database
module.exports.survivors.getAll = function (smtID, cb) {
  module.exports.survivors.getMatching(smtID, {}, cb)
}

// Get survivors that match criteria
module.exports.survivors.getMatching = function (smtID, criteria, cb) {
  criteria.settlementID = smtID
  db.survivors.find(criteria, (err, docs) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === "function") {
      cb(docs)
    }
  })
}

// Get all survivors sorted by field(s)
module.exports.survivors.getAllSortedBy = function (smtID, sortCriteria, cb) {
  module.exports.survivors.getMatchingSortedBy(smtID, {}, sortCriteria, cb)
}

// Get survivors that match criteria sorted by sort criteria
module.exports.survivors.getMatchingSortedBy = function (smtID, criteria, sortCriteria, cb) {
  criteria.settlementID = smtID
  db.survivors.find(criteria).sort(sortCriteria).exec((err, docs) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === "function") {
      cb(docs)
    }
  })
}

// Get count of survivors matching criteria
module.exports.survivors.countMatching = function (smtID, criteria, cb) {
  criteria.settlementID = smtID
  db.survivors.count(criteria, (err, count) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === "function") {
      cb(count)
    }
  })
}

// Get count of all survivors
module.exports.survivors.count = function (smtID, cb) {
  module.exports.survivors.countMatching(smtID, {}, cb)
}

// Add a survivor
module.exports.survivors.add = function (smtID, survivor, cb) {
  // Data validation
  // TODO

  survivor.settlementID = smtID
  db.survivors.insert(survivor, (err, newDoc) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === "function") {
      cb(newDoc)
    }
  })
}

// Add a base unnamed survivor
module.exports.survivors.addBaseSurvivor = function (smtID, cb) {
  module.exports.survivors.add(smtID, module.exports.survivors.baseSurvivor, cb)
}

// Update a survivor based on id
module.exports.survivors.update = function (survID, updates, cb) {
  db.survivors.update({ _id: survID }, { $set: updates }, {}, (err, numUp) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === "function") {
      cb(numUp)
    }
  })
}

// Update all survivors in a settlement
module.exports.survivors.updateSettlement = function (smtID, updates, cb) {
  db.survivors.update({ settlementID: smtID }, { $set: updates }, { multi: true }, (err, numUp) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === "function") {
      cb(numUp)
    }
  })
}

// Remove survivor by ID
module.exports.survivors.remove = function (survID, cb) {
  db.survivors.remove({ _id: survID }, {}, (err, numRemoved) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === "function") {
      cb(numRemoved)
    }
  })
}

// THIS IS ONLY FOR TEST PURPOSES
// Delete entire db.survivors
module.exports.survivors.dropAll = function() {
  db.survivors.remove({ }, { multi: true }, (err, numRem) => {
    db.survivors.loadDatabase((err) => {
      if (err) {
        throw(err)
      }
    })
  })
}

// Compact db.survivors into one row per object format
module.exports.survivors.loadDatabase = function() {
  db.survivors.loadDatabase((err) => {
    if (err) {
      throw (err)
    }
  })
}

var baseSettlement = {
  name: null,
  maxSurvival: 0,
  surivalOnDepart: 0,
  lanternYear: 0
}

// Get all settlements
module.exports.settlements.getAll = function (cb) {
  db.settlements.find({}, (err, docs) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === "function") {
      cb(docs)
    }
  })
}

// Get all settlements sorted by field(s)
module.exports.settlements.getAllSortedBy = function (sortCriteria, cb) {
  db.settlements.find({}).sort(sortCriteria).exec((err, docs) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === "function") {
      cb(docs)
    }
  })
}

// Create a new settlement
module.exports.settlements.createNew = function (cb) {
  db.settlements.insert(baseSettlement, (err, newDoc) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === "function") {
      cb(newDoc)
    }
  })
}

// Update a settlement
module.exports.settlements.update = function (smtID, updates, cb) {
  db.settlements.update({ _id: smtID }, { $set: updates }, {}, (err, numUp) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb === "function") {
      cb(numUp)
    }
  })
}

// Remove settlement
module.exports.settlements.remove = function (smtID, cb) {
  db.settlements.remove({ _id: smtID }, {}, (err, numRemoved) => {
    if (err) {
      throw (err)
    }

    if (cb && typeof cb == "function") {
      cb(numRemoved)
    }
  })
}

// THIS IS ONLY FOR TEST PURPOSES
// Delete entire db.settlements
module.exports.settlements.dropAll = function() {
  db.settlements.remove({ }, { multi: true }, (err, numRem) => {
    db.settlements.loadDatabase((err) => {
      if (err) {
        throw (err)
      }
    })
  })
}
