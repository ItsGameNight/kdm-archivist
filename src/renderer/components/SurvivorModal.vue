<template>
  <div>
    <modal @close="$emit('close')" :modalWidth="600">
      <div slot="header" style="display: none;"></div>
      <div slot="body">
        <span>{{ survivor.name }}</span>
        <br />
        <hunt-xp-bar :survivorID="survivor._id" :level="survivor.xp" />
        <br />
        <courage-bar :survivorID="survivor._id" :level="survivor.courage" />
        <br />
        <understanding-bar :survivorID="survivor._id" :level="survivor.understanding" />
        <br />
        <weapon-proficiency-bar :survivorID="survivor._id" :level="survivor.weaponProficiencyLevel" />
        <hr />
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal'
import HuntXpBar from './SurvivorComponents/HuntXpBar'
import CourageBar from './SurvivorComponents/CourageBar'
import UnderstandingBar from './SurvivorComponents/UnderstandingBar'
import WeaponProficiencyBar from './SurvivorComponents/WeaponProficiencyBar'

export default {
  name: 'survivor-modal',
  components: { Modal, HuntXpBar, CourageBar, UnderstandingBar, WeaponProficiencyBar },
  props: {
    survivor: { required: true }
  }
}
</script>

<style>
  
</style>