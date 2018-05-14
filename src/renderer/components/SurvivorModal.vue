<template>
  <div>
    <modal @close="$emit('close')" :modalWidth="750">
      <div slot="header" style="display: none;"></div>
      <div slot="body">
        <div class="flex-wrapper">
          <div class="survivor-name"><editable-text-input :textValue="survivor.name" @update="updateName" :textStyle="{fontWeight:'bold', fontSize: '14pt'}" /></div>
          <div class="hunt-xp"><hunt-xp-bar :survivorID="survivor._id" :level="survivor.xp" /></div>
        </div>
        <courage-bar :survivorID="survivor._id" :level="survivor.courage" />
        <understanding-bar :survivorID="survivor._id" :level="survivor.understanding" />
        <weapon-proficiency-bar :survivorID="survivor._id" :level="survivor.weaponProficiencyLevel" />
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from './Modal'
import HuntXpBar from './SurvivorComponents/HuntXpBar'
import CourageBar from './SurvivorComponents/CourageBar'
import UnderstandingBar from './SurvivorComponents/UnderstandingBar'
import WeaponProficiencyBar from './SurvivorComponents/WeaponProficiencyBar'
import EditableTextInput from './EditableTextInput'

export default {
  name: 'survivor-modal',
  components: { Modal, HuntXpBar, CourageBar, UnderstandingBar, WeaponProficiencyBar, EditableTextInput },
  props: {
    survivor: { required: true }
  },
  methods: {
    ...mapActions([
      'updateSurvivor'
    ]),
    updateName: function (e) {
      var update = { name: e.target.value }
      this.updateSurvivor({ id: this.survivor._id, update: update })
    }
  }
}
</script>

<style>
.survivor-name {
  font-weight: bold;
  font-size: 14pt;
  min-width: 47%;
  width: 45%;
  border-bottom: 3px solid black;
}
.hunt-xp {
  margin-left: auto;
  min-width: 47%;
  width: 45%;
  border-bottom: 3px solid black;
}
</style>