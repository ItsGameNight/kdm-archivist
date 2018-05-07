import SurvivorsDatabase from '../src/db/survivors.js'
import SettlementsDatabase from '../src/db/settlements.js'

describe('Survivors', () => {
  var settlements
  var survivors
  before(function() {
    // Instantiate db
    settlements = new SettlementsDatabase('test_data')
    settlements.dropAll()
    survivors = new SurvivorsDatabase('test_data', settlements)
    survivors.dropAll()
    // Create the test settlement
    settlements.createNew((smt) => {
      settlements.update(smt._id, { name: 'Test' })
    })
  })

  after(function() {
    // Compact db
    survivors.loadDatabase()
  })

  describe('getAll() on empty database', () => {
    it('should return [] since no survivors have been added', (done) => {
      settlements.getAll((smts) => {
        survivors.getAll(smts[0]._id, (docs) => {
          if (docs.length == 0) done()
          else done(new Error())
        })
      })
    })
  })

  describe('addBase()', () => {
    it('should insert new survivor with baseline stats into db', (done) => {
      settlements.getAll((smts) => {
        survivors.addBase(smts[0]._id, {}, (newDoc) => {
          if (newDoc.name == null && newDoc.xp == 0) done()
          else done(new Error())
        })
      })
    })
  })

  describe('count()', () => {
    it('should be equal to one', (done) => {
      settlements.getAll((smts) => {
        survivors.count(smts[0]._id, (count) => {
          if (count == 1) done()
          else done(new Error())
        })
      })
    })
  })

  describe('add()', function() {
    it('should add survivor object to db', function(done) {
      settlements.getAll((smts) => {
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
        survivors.add(smts[0]._id, testSurvivor, (newDoc) => {
          if (newDoc.name === 'Testy') done()
          else done(new Error())
        })
      })
    })
  })

  describe('countMatching()', function() {
    it('should return one matching test survivor', function(done) {
      settlements.getAll((smts) => {
        survivors.countMatching(smts[0]._id, { luck: 2 }, (count) => {
          if (count == 1) done()
          else done(new Error())
        })
      })
    })
  })

  describe('update()', function() {
    it('should update Testy to have 3 insanity', function(done) {
      settlements.getAll((smts) => {
        survivors.getMatching(smts[0]._id, { name: 'Testy' }, (docs) => {
          survivors.update(docs[0]._id, { insanity: 3 }, () => {
            survivors.getMatching(smts[0]._id, { name: 'Testy' }, (docs) => {
              if (docs[0].name === 'Testy' && docs[0].insanity === 3) done()
              else done(new Error())
            })
          })
        })
      })
    })
  })

  describe('countMatching() after update', function() {
    it('should equal one matching updated test survivor', function(done) {
      settlements.getAll((smts) => {
        survivors.countMatching(smts[0]._id, { luck: 2 }, (count) => {
          if (count == 1) done()
          else done(new Error())
        })
      })
    })
  })

  describe('updateSettlement()', function() {
    it('should update all surivors in settlment', function(done) {
      settlements.getAll((smts) => {
        survivors.updateSettlement(smts[0]._id, { strength: 1 }, function(numUp) {
          if (numUp == 2) done()
          else done(new Error('Expected: 2, Actual: ' + numUp))
        })
      })
    })
  })

  describe('remove()', function() {
    it('should remove one survivor', function (done) {
      settlements.getAll((smts) => {
        survivors.getMatching(smts[0]._id, { name: 'Testy' }, (docs) => {
          survivors.remove(docs[0]._id, (numRemoved) => {
            if (numRemoved == 1) done()
            else done(new Error('Expected: 1, Actual: ' + numRemoved))
          })
        })
      })
    })
  })
})
