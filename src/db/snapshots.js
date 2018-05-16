import Database from './db'

class SnapshotsDatabase extends Database {
  constructor (dbpath, smtsdb, survsdb) {
    // NOTE: takes in both the settlements and survivors db
    super(dbpath, 'snapshots.db')
    this.smtsdb = smtsdb
    this.survsdb = survsdb
  }

  createNew (smtID, cb) {
    // Get the settlement object
    this.smtsdb.getMatching({ _id: smtID }, (smts) => {
      if (smts.length === 0) {
        throw new Error('Tried to add base survivor for non-existant settlement!')
      }

      // create a new snapshot with settlement
      var snapshot = { settlement: smts[0] }

      // Get all of the survivors...
      this.survsdb.getMatching({ settlementID: smtID }, (survs) => {
        // save survivors
        snapshot.survivors = survs

        // add snapshot to db
        super.createNew(snapshot, cb)
      })
    })
  }
}
export default SnapshotsDatabase
