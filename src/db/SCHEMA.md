# Database Schema
Or something like that...

## Survivors
TODO

## Settlements
TODO

## Snapshots

Base Settlement Object:
1. Tied to exactly one settlement (and only of the survs in smt)
1. Tied to a lantern year created (should be only one per lantern year, but not enforced) -- note that this is the lanternYear property of the settlement it is tied to
1. Holds the settlement object at time of snapshot
1. Holds the survivor objects in settlement at time of snapshot

IDEA:
- Every lantern year, on `depart`, a new snapshot is created for the current state of things
- NeDB gives it a unique .\_id
- Vuex stores a `snapshotID` property in the store
  * if `null`, then NOT in history mode -- everything is editable, etc, carry on
  * else, in history mode! All getters related to displaying content (i.e. `currentSettlement`, `survivorsInSettlement`, etc.) all return the objects from the snapshot
