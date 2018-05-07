import SettlementsDatabase from '../src/db/settlements.js'

describe('Settlements', () => {
  var settlements
  before(function() {
    settlements = new SettlementsDatabase('test_data')
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

  describe('updateOne()', function() {
    it('should update settlement to have name Testtlement', function(done) {
      settlements.getAll(function(docs) {
        settlements.updateOne(docs[0]._id, { name: 'Testtlement' }, function() {
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
