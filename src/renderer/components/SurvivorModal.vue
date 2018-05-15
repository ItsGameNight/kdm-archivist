<template>
  <div>
    <modal @close="$emit('close')" :modalWidth="750">
      <div slot="header" style="display: none;"></div>
      <div slot="body">
        <div class="flex-wrapper">
          <div class="flex-wrapper general-info">
            <div class="survivor-name">
              <editable-text-input :textValue="survivor.name" @update="updateName" :textStyle="{fontWeight:'bold', fontSize: '14pt'}" />
            </div>
            <div class="sex-toggle">
              <male-female-toggle :initSex="survivor.sex" :survivorID="survivor._id" />
            </div>
          </div>
          <div class="hunt-xp"><hunt-xp-bar :survivorID="survivor._id" :level="survivor.xp" /></div>
        </div>
        <div>
          <editable-stat :survivorID="survivor._id" :statName="'survival'" :initValue="survivor.survival" :maxValue="4" />
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
import MaleFemaleToggle from './SurvivorComponents/MaleFemaleToggle'
import EditableTextInput from './EditableTextInput'
import EditableStat from './EditableStat'

export default {
  name: 'survivor-modal',
  components: {
    Modal,
    HuntXpBar,
    CourageBar,
    UnderstandingBar,
    WeaponProficiencyBar,
    EditableTextInput,
    MaleFemaleToggle,
    EditableStat
  },
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
.general-info {
  min-width: 47%;
  width: 47%;
  border-bottom: 3px solid black;
}
.survivor-name {
  width: 80%;
}
.sex-toggle {
  margin-left: auto;
  margin-top: auto;
  padding-bottom: 7px;
}
.hunt-xp {
  margin-left: auto;
  min-width: 47%;
  width: 47%;
  border-bottom: 3px solid black;
}
</style>