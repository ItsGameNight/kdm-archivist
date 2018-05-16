<template>
  <div>
    <modal @close="$emit('close')" :modalWidth="750">
      <div slot="header" style="display: none;"></div>
      <div slot="body">
        <!-- ROW 1 -->
        <div class="flex-wrapper row1">
          <div class="flex-wrapper general-info">
            <div class="survivor-name">
              <editable-text-input :textValue="survivor.name" @update="update($event, 'name')" :textStyle="{fontWeight:'bold', fontSize: '14pt'}" />
            </div>
            <div class="sex-toggle">
              <male-female-toggle :initSex="survivor.sex" :survivorID="survivor._id" />
            </div>
          </div>
          <div class="hunt-xp"><hunt-xp-bar :survivorID="survivor._id" :level="survivor.xp" /></div>
        </div>
        <!-- ROW 2 -->
        <div class="flex-wrapper row2">
          <div class="flex-wrapper extra-names">
            <div class="nickname">
              <editable-text-input :placeholder="'Nickname'" :textValue="survivor.nickname" @update="update($event, 'nickname')" :textStyle="{fontSize: '10pt'}" />
            </div>
            <div class="surname">
              <editable-text-input :placeholder="'Surname'" :textValue="survivor.surname" @update="update($event, 'surname')" :textStyle="{fontSize: '10pt'}" />
            </div>
          </div>
          <div class="flex-wrapper alive-box">
            <div class="birth-label">Born LY:</div><div class="birth-year"><editable-text-input :inputType="'number'" :textValue="survivor.birthYear" :textStyle="{width:'1.4em', fontSize: '10pt', border: '1px solid black', borderRadius: '2px', textAlign: 'center', backgroundPosition: 'left 2px center'}" :placeholder="''" @update="update($event, 'birthYear')" /></div>
            <div class="dead-or-alive"><alive-toggle :initValue="survivor.alive" :survivorID="survivor._id" /></div>
            <div class="death-label">Died LY:</div><div class="death-year"><editable-text-input :inputType="'number'" :textValue="survivor.deathYear" :textStyle="{width:'1.4em', fontSize: '10pt', border: '1px solid black', borderRadius: '2px',  textAlign: 'center', backgroundPosition: 'left 2px center'}" :placeholder="''" @update="update($event, 'deathYear'); update(false, 'alive')" /></div>
          </div>
        </div>
        <!-- ROW 3 -->
        <div class="flex-wrapper row3">
          <div class="survival-box">
            <div :class="[survivor.cannotSpendSurvival ? 'no-survival' : '']">
              <div class="row3-title"><span>Survival</span></div>
              <div class="flex-wrapper">
                <editable-stat :initValue="survivor.survival" :maxValue="currentSettlement.survivalLimit" @update="update($event, 'survival')" />
                <div class="survival-abilities">
                 <div class="ability"><square-toggle :statDisplayName="'Dodge'" :initValue="survivor.dodge" :squareSize="'8'" @update="update($event, 'dodge')"/></div>
                 <div class="ability"><square-toggle :statDisplayName="'Encourage'" :initValue="survivor.encourage" :squareSize="'8'" @update="update($event, 'encourage')" /></div>
                 <div class="ability"><square-toggle :statDisplayName="'Dash'" :initValue="survivor.dash" :squareSize="'8'" @update="update($event, 'dash')" /></div>
                 <div class="ability"><square-toggle :statDisplayName="'Surge'" :initValue="survivor.surge" :squareSize="'8'" @update="update($event, 'surge')" /></div>
                 <div class="ability"><square-toggle :statDisplayName="'Endure'" :initValue="survivor.endure" :squareSize="'8'" @update="update($event, 'endure')" /></div>
               </div>
             </div>
           </div>
           <div class="cannot-spend-survival">
            <lock-toggle :initValue="survivor.cannotSpendSurvival" :statDisplayName="'Cannot Spend Survival'" @update="update($event, 'cannotSpendSurvival')" />
          </div>
          </div>
          <div class="stats-box">
            <div class="row3-title"><span>Showdown Stats</span><div class="skip-hunt"><lock-toggle :statDisplayName="'Skip Next Hunt'" :initValue="survivor.skipHunt" @update="update($event, 'skipHunt')"/></div></div>
            <div class="flex-wrapper stats-group">
              <editable-stat :statDisplayName="'MOV'" :initValue="survivor.movement" @update="update($event, 'movement')" />
              <editable-stat :statDisplayName="'ACC'" :initValue="survivor.accuracy" @update="update($event, 'accuracy')" />
              <editable-stat :statDisplayName="'STR'" :initValue="survivor.strength" @update="update($event, 'strength')" />
              <editable-stat :statDisplayName="'EVA'" :initValue="survivor.evasion" @update="update($event, 'evasion')" />
              <editable-stat :statDisplayName="'LCK'" :initValue="survivor.luck" @update="update($event, 'luck')" />
              <editable-stat :statDisplayName="'SPD'" :initValue="survivor.speed" @update="update($event, 'speed')" />
            </div>
          </div>
          <div class="progress-box">
            <div class="row3-title"><span>Development Stats</span></div>
            <div class="progress-group">
              <weapon-proficiency-bar :survivorID="survivor._id" :level="survivor.weaponProficiencyLevel" />
              <courage-bar :survivorID="survivor._id" :level="survivor.courage" />
              <understanding-bar :survivorID="survivor._id" :level="survivor.understanding" />
            </div>
          </div>
        </div>
        <!-- ROW 4 -->
        <div class="flex-wrapper row4">
          <div class="row4-box armor-points">
            <div class="row4-title"><span>Hit Locations</span></div>
            <div class="flex-wrapper armor-point-box">
              <img class="armor-img" :src="brainImg" />
              <editable-stat :minValue="0" :initValue="survivor.insanity" @update="" />
              <div class="hp-bar"><progress-bar :title="''" :initLevel="0" :maxLevel="1" :boldLevels="[]" :paddingSquares="1" :survivorID="survivor._id" :stat="'brainHP'" /></div>
            </div>
            <div class="flex-wrapper armor-point-box">
              <img class="armor-img" :src="headImg" />
              <editable-stat :initValue="survivor.insanity" :minValue="0" @update="" />
              <div class="hp-bar"><progress-bar :title="''" :initLevel="0" :maxLevel="2" :boldLevels="[2]" :survivorID="survivor._id" :stat="'headHP'" /></div>
            </div>
            <div class="flex-wrapper armor-point-box">
              <img class="armor-img" :src="armsImg" />
              <editable-stat :initValue="survivor.insanity" :minValue="0" @update="" />
              <div class="hp-bar"><progress-bar :title="''" :initLevel="0" :maxLevel="2" :boldLevels="[2]" :survivorID="survivor._id" :stat="'armHP'" /></div>
            </div>
            <div class="flex-wrapper armor-point-box">
              <img class="armor-img" :src="bodyImg" />
              <editable-stat :initValue="survivor.insanity" :minValue="0" @update="" />
              <div class="hp-bar"><progress-bar :title="''" :initLevel="0" :maxLevel="2" :boldLevels="[2]" :survivorID="survivor._id" :stat="'bodyHP'" /></div>
            </div>
            <div class="flex-wrapper armor-point-box last">
              <img class="armor-img" :src="legsImg" />
              <editable-stat :initValue="survivor.insanity" :minValue="0" @update="" />
              <div class="hp-bar"><progress-bar :title="''" :initLevel="0" :maxLevel="2" :boldLevels="[2]" :survivorID="survivor._id" :stat="'legHP'" /></div>
            </div>
          </div>
        </div>
        <!-- <div class="cannot-fight"><square-toggle :statDisplayName="'Cannot Use Fighting Arts'" :initValue="survivor.cannotUseFighting" @update="update($event, 'cannotUseFighting')" /></div> -->
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Modal from './Modal'
import {
  HuntXpBar,
  CourageBar,
  UnderstandingBar,
  WeaponProficiencyBar,
  MaleFemaleToggle,
  AliveToggle,
  ProgressBar
} from './SurvivorComponents'
import {
  EditableTextInput,
  EditableStat,
  SquareToggle,
  LockToggle
} from './GUIComponents'

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
    EditableStat,
    SquareToggle,
    LockToggle,
    AliveToggle,
    ProgressBar
  },
  props: {
    survivor: { required: true }
  },
  data: function () {
    return {
      brainImg: 'static/brain.png',
      headImg: 'static/head.png',
      bodyImg: 'static/body.png',
      armsImg: 'static/arms.png',
      waistImg: 'static/waist.png',
      legsImg: 'static/legs.png'
    }
  },
  computed: {
    ...mapGetters([
      'currentSettlement'
    ])
  },
  methods: {
    ...mapActions([
      'updateSurvivor'
    ]),
    update: function (val, stat) {
      var update = {}
      update[stat] = val
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
  width: 50%;
}
.extra-name-title {
  padding-right: 4px;
}
.nickname {
  width: 60%;
  border-bottom: 1px solid black;
  margin-right: 8px;
}
.surname {
  width: 32%;
  border-bottom: 1px solid black;
}
.alive-box {
  width: 47%;
  margin-left: auto;
}
.birth-label {
  font-size: 10pt;
  padding-right: 4px;
  padding-left: 2px;
  padding-top: 2px;
  line-height: 15pt;
}
.death-label {
  font-size: 10pt;
  padding-right: 4px;
  padding-left: 12px;
  padding-top: 2px;
  line-height: 15pt;
}
.birth-year {
  width: 1.8em;
  margin-right: 14px;
  margin-top: 1px;
}
.death-year {
  width: 1.8em;
  margin-top: 1px;
  margin-right: 6px;
}
.dead-or-alive {
  width: 58px;
  padding-top: 1px;
}
.cannot-fight {
  padding-left: 15px;
}
.row3 {
  margin-top: 10px;
}
.survival-box {
  width: 20%;
  min-width: 20%;
  border: 2px solid black;
}
.no-survival {
  text-decoration: line-through;
}
.row3-title {
  padding-left: 0.4em;
  padding-bottom: 1px;
  border-bottom: 1px solid black;
}
.row3-title span {
  font-size: 12pt;
  font-variant-caps: small-caps;
}
.survival-abilities {
  margin-top: 8px;
  margin-left: 10px;
}
.ability {
  padding-top: 2px;
}
.cannot-spend-survival {
  width: 96%;
  margin: auto;
}
.stats-box {
  width: 35%;
  min-width: 35%;
  margin-left: auto;
  border: 2px solid black;
}
.stats-group {
  width: 97%;
  margin: 0 auto;
}
.skip-hunt {
  float: right;
  padding-top: 1px;
  padding-right: 4px;
}
.progress-box {
  width: 40%;
  min-width: 35%;
  margin-left: auto;
  border: 2px solid black;
}
.progress-group {
  padding: 4px;
}
.row4 {
  margin-top: 10px;
}
.row4-box {
  border: 2px solid black;
}
.row4-title {
  padding-left: 0.2em;
  border-bottom: 1px solid black;
}
.row4-title span {
  font-size: 10pt;
  font-variant-caps: small-caps;
}
.armor-point-box {
  margin: 0 6px 0 6px;
  border-bottom: 1px solid black;
}
.armor-point-box.last {
  border-bottom: none;
}
.armor-img {
  width: 20px;
  height: 20px;
  margin: auto 4px auto 0;
}
.hp-bar {
  height: 18px;
  margin: auto 0;
}
</style>