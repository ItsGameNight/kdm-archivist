import Database from './db'

class SettlementsDatabase extends Database {
  constructor (dbpath) {
    super(dbpath, 'settlements.db')
    this.baseSmt = {
      name: null,
      principles: [],
      locations: [],
      innovations: [],
      resources: [],
      storedGear: [],
      quarries: [],
      storyNotes: [],
      lanternYear: 0,
      survivalLimit: 0,
      survivalOnDepart: 0,
      baseSurvivor: {
        settlementID: null,
        name: null,
        sex: null,
        alive: true,
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
        weaponProficiency: null,
        weaponProficiencyLevel: 0,
        fightingArts: [],
        disorders: [],
        abilities: [],
        impairments: [],
        departing: false,
        parent1: null,
        parent2: null,
        nickname: null,
        surname: null,
        other: null
      }
    }
  }

  // Create a new settlement
  createNew (cb) {
    super.createNew(this.baseSmt, cb)
  }
}

export default SettlementsDatabase
