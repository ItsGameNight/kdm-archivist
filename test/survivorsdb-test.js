import * as survivors from '../src/db/survivors.js'

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

  describe('addBase()', () => {
    it('should insert new survivor with baseline stats into db', (done) => {
      survivors.addBase('testID', {}, (newDoc) => {
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
