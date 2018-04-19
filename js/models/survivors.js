// This module serves as a data access layer
// to interact with the survivors database.
//
// To use, simply:
// survivors = require('./js/models/survivors')({ dataDir: /path/to/datastore/ })


// Module to access datastore
const datastore = require('nedb')

module.exports = function(params) {
    var exports = {}

    // Load datastore
    db = new datastore({ filename: params.dataDir + 'survivors', autoload: true })

    // Define base survivor (for initializing settlement base)
    exports.baseSurvivor = {
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
    exports.getAll = function (smtID, cb) {
        exports.getMatching(smtID, {}, cb)
    }

    // Get survivors that match criteria
    exports.getMatching = function (smtID, criteria, cb) {
        criteria.settlementID = smtID
        db.find(criteria, (err, docs) => {
            if (err) {
                throw (err)
            }

            if (cb && typeof cb === "function") {
                cb(docs)
            }
        })
    }

    // Get all survivors sorted by field(s)
    exports.getAllSortedBy = function (smtID, sortCriteria, cb) {
        exports.getMatchingSortedBy(smtID, {}, sortCriteria, cb)
    }

    // Get survivors that match criteria sorted by sort criteria
    exports.getMatchingSortedBy = function (smtID, criteria, sortCriteria, cb) {
        criteria.settlementID = smtID
        db.find(criteria).sort(sortCriteria).exec((err, docs) => {
            if (err) {
                throw (err)
            }

            if (cb && typeof cb === "function") {
                cb(docs)
            }
        })
    }

    // Get count of survivors matching criteria
    exports.countMatching = function (smtID, criteria, cb) {
        criteria.settlementID = smtID
        db.count(criteria, (err, count) => {
            if (err) {
                throw (err)
            }

            if (cb && typeof cb === "function") {
                cb(count)
            }
        })
    }

    // Get count of all survivors
    exports.count = function (smtID, cb) {
        exports.countMatching(smtID, {}, cb)
    }

    // Add a survivor
    exports.add = function (smtID, survivor, cb) {
        // Data validation
        // TODO

        survivor.settlementID = smtID
        db.insert(survivor, (err, newDoc) => {
            if (err) {
                throw (err)
            }

            if (cb && typeof cb === "function") {
                callback(newDoc)
            }
        })
    }

    // Add a base unnamed survivor
    exports.addBaseSurvivor = function (smtID, cb) {
        exports.add(smtID, exports.baseSurvivor, cb)
    }

    // Update a survivor based on id
    exports.update = function (survID, updates, cb) {
        db.update({ _id: survID }, { $set: updates }, {}, (err, numUp) => {
            if (err) {
                throw (err)
            }

            if (cb && typeof cb === "function") {
                cb(numUp)
            }
        })
    }

    // Update all survivors in a settlement
    exports.updateSettlement = function (smtID, updates, cb) {
        db.update({ settlementID: smtID }, { $set: updates }, { multi: true }, (err, numUp) => {
            if (err) {
                throw (err)
            }

            if (cb && typeof cb === "function") {
                cb(numUp)
            }
        })
    }

    // Remove survivor by ID
    exports.remove = function (survID, cb) {
        db.remove({ _id: survID }, {}, (err, numRemoved) => {
            if (err) {
                throw (err)
            }

            if (cb && typeof cb === "function") {
                cb(numRemoved)
            }
        })
    }

    // THIS IS ONLY FOR TEST PURPOSES
    // Delete entire db
    exports.dropAll = function() {
        db.remove({ }, { multi: true }, (err, numRem) => {
            db.loadDatabase((err) => {
                if (err) {
                    throw(err)
                }
            })
        })
    }

    // Compact db into one row per object format
    exports.loadDatabase = function() {
        db.loadDatabase((err) => {
            if (err) {
                throw (err)
            }
        })
    }

    return exports
}
