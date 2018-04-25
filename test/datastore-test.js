var db = require(__dirname + '/../js/datastore')
survivors = db.survivors
settlements = db.settlements

describe('Survivors', () => {
    before(function() {
        // Clear db before all tests
        survivors.dropAll()
    })

    after(function() {
        // Compact db
        survivors.loadDatabase()
    })

    describe('getAll() on empty database', () => {
        it('should return [] since no survivors have been added', (done) => {
            survivors.getAll('testID', (docs) => {
                if (docs.length == 0) done()
                else done(new Error())
            })
        })
    })

    describe('addBaseSurvivor()', () => {
        it('should insert new survivor with baseline stats into db', (done) => {
            survivors.addBaseSurvivor('testID', (newDoc) => {
                if (newDoc.name == null && newDoc.xp == 0) done()
                else done(new Error())
            })
        })
    })

    describe('count()', () => {
        it('should be equal to one', (done) => {
            survivors.count('testID', (count) => {
                if (count == 1) done()
                else done(new Error())
            })
        })
    })

    describe('add()', function() {
        it('should add survivor object to db', function(done) {
            var testSurvivor = {
                name: 'Testy',
                sex: 'm',
                survival: 1,
                insanity: 0,
                movement: 5,
                accuracy: 0,
                strength: 0,
                evasion: 0,
                luck: 2,
                speed: 0
            }
            survivors.add('testID', testSurvivor, (newDoc) => {
                if (newDoc.name === 'Testy') done()
                else done(new Error())
            })
        })
    })

    describe('countMatching()', function() {
        it('should return one matching test survivor', function(done) {
            survivors.countMatching('testID', { luck: 2 }, (count) => {
                if (count == 1) done()
                else done(new Error())
            })
        })
    })

    describe('update()', function() {
        it('should update Testy to have 3 insanity', function(done) {
            survivors.getMatching('testID', { name: 'Testy' }, (docs) => {
                survivors.update(docs[0]._id, { insanity: 3 }, () => {
                    survivors.getMatching('testID', { name: 'Testy' }, (docs) => {
                        if (docs[0].name === 'Testy' && docs[0].insanity === 3) done()
                        else done(new Error())
                    })
                })
            })
        })
    })

    describe('countMatching() after update', function() {
        it('should equal one matching updated test survivor', function(done) {
            survivors.countMatching('testID', { luck: 2 }, (count) => {
                if (count == 1) done()
                else done(new Error())
            })
        })
    })

    describe('updateSettlement()', function() {
        it('should update all surivors in settlment', function(done) {
            survivors.updateSettlement('testID', { strength: 1 }, function(numUp) {
                if (numUp == 2) done()
                else done(new Error('Expected: 2, Actual: ' + numUp))
            })
        })
    })

    describe('remove()', function() {
        it('should remove one survivor', function (done) {
            survivors.getMatching('testID', { name: 'Testy' }, (docs) => {
                survivors.remove(docs[0]._id, (numRemoved) => {
                    if (numRemoved == 1) done()
                    else done(new Error('Expected: 1, Actual: ' + numRemoved))
                })
            })
        })
    })
})

describe('Settlements', () => {
    before(function() {
        // Clear db before all tests
        settlements.dropAll()
    })

    describe('getAll() on empty database', () => {
        it('should return [] since no settlements have been added', function(done) {
            settlements.getAll((docs) => {
                if (docs.length == 0) done()
                else done(new Error('settlements db is: ' + docs))
            })
        })
    })

    describe('createNew()', function() {
        it('should create new settlement object and add to database', function(done) {
            settlements.createNew(function() {
                settlements.getAll(function(docs) {
                    if (docs.length == 1) done()
                    else done(new Error(docs.length + ' settlements in db'))
                })
            })
        })
    })

    describe('update()', function() {
        it('should update settlement to have name Testtlement', function(done) {
            settlements.getAll(function(docs) {
                settlements.update(docs[0]._id, { name: 'Testtlement' }, function() {
                    settlements.getAll(function(newDocs) {
                        if (newDocs[0].name === 'Testtlement') done()
                        else done(new Error('name is ' + newDocs[0].name))
                    })
                })
            })
        })
    })

    describe('remove()', function() {
        it('should remove settlement', function(done) {
            settlements.getAll(function(docs) {
                settlements.remove(docs[0]._id, function() {
                    settlements.getAll(function(newDocs) {
                        if (newDocs.length == 0) done()
                        else done(new Error(newDocs.length + ' settlements in db'))
                    })
                })
            })
        })
    })
})
