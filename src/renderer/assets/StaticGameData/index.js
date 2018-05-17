/*********
Static game data for use in autocompletion, calculating settlement stats, etc.
**********/

import BaseArmorSets from './ArmorSets/BaseArmorSets'
import BaseDisorders from './Disorders/BaseDisorders'
import BaseFightingArts from './FightingArts/BaseFightingArts'
import BaseSecretFightingArts from './FightingArts/BaseSecretFightingArts'
import BaseInnovations from './Innovations/BaseInnovations'
import Principles from './Innovations/Principles'
import BasicResources from './Resources/BasicResources'
import BaseStrangeResources from './Resources/BaseStrangeResources'
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

// Combine all innovations
var Innovations = {
  ...BaseInnovations
}

// Combine all resources
var Resources = {
  ...BasicResources,
  ...BaseStrangeResources
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
  // Innovations
  Innovations, BaseInnovations, Principles,
  // Resources
  Resources, BasicResources, BaseStrangeResources,
  // Weapon Proficiencies
  WeaponProficiencies, BaseWeaponProficiencies,
  // Vermin
  Vermin, BaseVermin
}
