// Module to access datastore
const datastore = require('nedb')

// Load datastores
db = {}
db.survivors = new datastore({ filename: 'test_data/survivors', autoload: true })
db.survivors.find({ name: 'Olympia' }, (err, docs) => {
    if (docs.length == 0) {
        // Test add a survivor
        var testSurvivor = {
            name: 'Olympia',
            sex: 'f',
            survival: 4,
            movement: 5,
            accuracy: 1,
            strength: 5,
            evasion: 3,
            luck: 0,
            speed: 0,
            insansity: 7,
            xp: 7,
            courage: 6,
            understanding: 8
        }
        db.survivors.insert(testSurvivor, (err, newDoc) => {})
        console.log(testSurvivor)
    }
    else {
        console.log(docs)
    }
})

exports.db = db
