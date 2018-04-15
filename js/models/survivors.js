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

    // Get all survivors in database
    exports.getAll = function (cb) {
        exports.getMatching({}, cb)
    }

    // Get survivors that match criteria
    exports.getMatching = function (criteria, cb) {
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
    exports.getAllSortedBy = function (sortCriteria, cb) {
        exports.getMatchingSortedBy({}, sortCriteria, cb)
    }

   // Get survivors that match criteria sorted by sort criteria
    exports.getMatchingSortedBy = function (criteria, sortCriteria, cb) {
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
    exports.countMatching = function (criteria, cb) {
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
    exports.count = function (cb) {
        exports.countMatching({}, cb)
    }

    // Add a survivor
    exports.add = function (survivor, cb) {
        // Data validation
        // TODO

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
    exports.addBaseSurvivor = function (cb) {
        var baseSurvivor = {
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
        exports.add(baseSurvivor, cb)
    }

    return exports
}
