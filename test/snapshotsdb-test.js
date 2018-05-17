import SurvivorsDatabase from '../src/db/survivors.js'
import SettlementsDatabase from '../src/db/settlements.js'
import SnapshotsDatabase from '../src/db/snapshots.js'

describe('Snapshots', () => {
  var settlements
  var survivors
  var snapshots
  before(function() {
    // Instantiate dbs
    settlements = new SettlementsDatabase('test_data')
    settlements.dropAll()
    survivors = new SurvivorsDatabase('test_data', settlements)
    survivors.dropAll()
    snapshots = new SnapshotsDatabase('test_data', settlements, survivors)
    snapshots.dropAll()

    // Create the test settlement
    settlements.createNew((smt) => {
      settlements.updateOne(smt._id, { name: 'Test' })
    })
  })

  after(function() {
    // NOT Compacting dbs -- it seems to be causing async errors when run w other tests
    // survivors.loadDatabase()
    // settlements.loadDatabase()
    // snapshots.loadDatabase()
  })

  describe('Snapshot Not Altered 1', () => {
    it('Empty survivors snapshot still empty after add survivor', (done) => {
      settlements.getAll((docs) => {
        var smtID = docs[0]._id
        // Create snapshot
        snapshots.createNew(smtID, (doc) => {
          // Add survivor
          survivors.addBase(smtID, {}, () => {
            // Check snapshot is empty
            snapshots.getMatching({ _id: doc._id }, (docs) => {
              if (docs[0].survivors.length === 0) done()
              else done(new Error())
            })
          })
        })
      })
    })
  })


  describe('Snapshot Not Altered 2', () => {
    it('Editing survivor obj in snapshot doesnt change snapshot', (done) => {
      settlements.getAll((docs) => {
        var smtID = docs[0]._id
        // Create snapshot
        snapshots.createNew(smtID, (doc) => {
          var snapID = doc._id
          // Get survivor
          survivors.getAll((docs) => {
            // Update
            survivors.updateOne(docs[0]._id, { name: 'Alex' }, () => {
              // Check snapshot is unchaged
              snapshots.getMatching({ _id: snapID }, (docs) => {
                if (docs[0].survivors[0].name == null) done()
                else done(new Error())
              })
            })
          })
        })
      })
    })
  })
})
