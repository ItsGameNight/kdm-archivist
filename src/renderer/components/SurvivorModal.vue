<template>
  <div>
    <modal @close="$emit('close')" :modalWidth="750">
      <div slot="header" style="display: none;"></div>
      <div slot="body">
        <div class="flex-wrapper row1">
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
        <div class="flex-wrapper row2">
          <div class="flex-wrapper extra-names">
            <div class="nickname">
              <editable-text-input :placeholder="'Nickname'" :textValue="survivor.nickname" @update="" :textStyle="{fontSize: '10pt'}" />
            </div>
            <div class="surname">
              <editable-text-input :placeholder="'Surname'" :textValue="survivor.nickname" @update="" :textStyle="{fontSize: '10pt'}" />
            </div>
          </div>
        </div>
        <div class="flex-wrapper row3">
          <div class="survival-box">
            <div class="row3-title">Survival</div>
            <editable-stat :survivorID="survivor._id" :statName="'survival'" :initValue="survivor.survival" :maxValue="4" />
          </div>
          <div class="stats-box">
            <div class="row3-title">Showdown Stats</div>
            <div class="stats-group">
              <editable-stat :survivorID="survivor._id" :statName="'movement'" :statDisplayName="'MOV'" :initValue="survivor.movement" />
              <editable-stat :survivorID="survivor._id" :statName="'accuracy'" :statDisplayName="'ACC'" :initValue="survivor.accuracy" />
              <editable-stat :survivorID="survivor._id" :statName="'strength'" :statDisplayName="'STR'" :initValue="survivor.strength" />
              <editable-stat :survivorID="survivor._id" :statName="'evasion'" :statDisplayName="'EVA'" :initValue="survivor.evasion" />
              <editable-stat :survivorID="survivor._id" :statName="'luck'" :statDisplayName="'LCK'" :initValue="survivor.luck" />
              <editable-stat :survivorID="survivor._id" :statName="'speed'" :statDisplayName="'SPD'" :initValue="survivor.speed" />
            </div>
          </div>
          <div class="progress-box">
            <div class="row3-title">Development Stats</div>
            <div class="progress-group">
              <weapon-proficiency-bar :survivorID="survivor._id" :level="survivor.weaponProficiencyLevel" />
              <courage-bar :survivorID="survivor._id" :level="survivor.courage" />
              <understanding-bar :survivorID="survivor._id" :level="survivor.understanding" />
            </div>
          </div>
        </div>
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
.row2 {
  margin-top: 5px;
}
.extra-names {
  font-size: 10pt;
  width: 100%;
}
.extra-name-title {
  padding-right: 4px;
}
.nickname {
  width: 30%;
  border-bottom: 1px solid black;
  margin-right: 8px;
}
.surname {
  width: 16%;
  border-bottom: 1px solid black;
}
.row3 {
  margin-top: 10px;
}
.survival-box {
  width: 20%;
  min-width: 20%;
  border: 2px solid black;
}
.row3-title {
  padding-left: 0.4em;
  font-size: 12pt;
  border-bottom: 1px solid black;
}
.stats-box {
  width: 40%;
  min-width: 40%;
  margin-left: auto;
  border: 2px solid black;
}
.stats-group {
  width: 91%;
  margin: auto;
}
.progress-box {
  width: 35%;
  min-width: 35%;
  margin-left: auto;
  border: 2px solid black;
}
.progress-group {
  padding: 4px;
}
</style>