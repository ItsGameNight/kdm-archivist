/*********
Static game data for use in autocompletion, calculating settlement stats, etc.
**********/

import BaseArmorSets from './ArmorSets/BaseArmorSets'
import BaseDisorders from './Disorders/BaseDisorders'
import BaseFightingArts from './FightingArts/BaseFightingArts'
import BaseSecretFightingArts from './FightingArts/BaseSecretFightingArts'
import PermanentSevereInjuries from './Impairments/PermanentSevereInjuries'
import BaseInnovations from './Innovations/BaseInnovations'
import Principles from './Innovations/Principles'
import BaseQuarries from './Quarries/BaseQuarries'
import BasicResources from './Resources/BasicResources'
import BaseStrangeResources from './Resources/BaseStrangeResources'
import BaseSettlementLocations from './SettlementLocations/BaseSettlementLocations'
import GormSettlementLocations from './SettlementLocations/GormSettlementLocations'
import SunstalkerSettlementLocations from './SettlementLocations/SunstalkerSettlementLocations'
import BaseTimeline from './Timelines/BaseTimeline'
import BaseWeaponProficiencies from './WeaponProficiencies/BaseWeaponProficiencies'
import BaseVermin from './Vermin/BaseVermin'

// Combine all armor sets
var ArmorSets = {
  ...BaseArmorSets
}

// Combine all disorders
var Disorders = {
  ...BaseDisorders
}

// Combine all fighting arts
var FightingArts = {
  ...BaseFightingArts,
  ...BaseSecretFightingArts
}

// Combine all impairments
var Impairments = {
  ...PermanentSevereInjuries
}

// Combine all innovations
var Innovations = {
  ...BaseInnovations
}

// Combine all quarries
var Quarries = {
  ...BaseQuarries
}

// Combine all resources
var Resources = {
  ...BasicResources,
  ...BaseStrangeResources
}

// Combine all settlement locations
var SettlementLocations = {
  ...BaseSettlementLocations,
  ...GormSettlementLocations,
  ...SunstalkerSettlementLocations
}

// Combine all weapon proficiencies
var WeaponProficiencies = {
  ...BaseWeaponProficiencies
}

// Combine all vermin
var Vermin = {
  ...BaseVermin
}

export {
  // Armor sets
  ArmorSets, BaseArmorSets,
  // Disorders
  Disorders, BaseDisorders,
  // Fighting Arts
  FightingArts, BaseFightingArts, BaseSecretFightingArts,
  // Impairments
  Impairments,
  // Innovations
  Innovations, BaseInnovations, Principles,
  // Quarries
  Quarries, BaseQuarries,
  // Resources
  Resources, BasicResources, BaseStrangeResources,
  // Settlement Locations
  SettlementLocations, BaseSettlementLocations,
  GormSettlementLocations, SunstalkerSettlementLocations,
  // Timelines
  BaseTimeline,
  // Weapon Proficiencies
  WeaponProficiencies, BaseWeaponProficiencies,
  // Vermin
  Vermin, BaseVermin
}
