<template>
  <div class="survivor-table-row-wrapper">
    <survivor-modal
      v-if="modalVisible"
      :survivor="survivor"
      :yeeScore="yeeScore"
      @close="modalVisible = false" />
    <modal
      v-if="deleteModalVisible"
      :modalWidth="300"
      @okay="deleteSurvivor({ id: survivor._id })"
      @close="deleteModalVisible = false">
      <h3 slot="header">Delete {{ survivor.name }}?</h3>
      <p slot="body">Are you sure you want to delete this survivor?</p>
    </modal>
    <td class="survivor-table-row"
      :class="[mouseDownState ? 'mouse-down' : '']"
      @dblclick="collapsedState = !collapsedState"
      @mousedown="mouseDownState = true"
      @mouseup="mouseDownState = false"
      v-long-press="onLongPress">
      <div class="row-contents-wrapper">
        <div class="right-hand-buttons">
          <div class="modal-button-wrapper">
            <button class="modal-button" @click="modalVisible = true" @dblclick.stop @mousedown.stop>
              <font-awesome-icon :icon="modalButtonIcon" />
            </button>
          </div>
          <div class="collapse-button-wrapper">
            <button class="collapse-button" @click="collapsedState = !collapsedState" @dblclick.stop @mousedown.stop>
              <font-awesome-icon :icon="collapseButtonIcon" />
            </button>
          </div>
          <div class="delete-button-wrapper">
            <button class="delete-button" @click="deleteModalVisible = true" @dblclick.stop @mousedown.stop>
              <font-awesome-icon :icon="deleteIcon" />
            </button>
          </div>
        </div>
        <div class="warning">
            <span v-if="warning"><font-awesome-icon :icon="warningIcon" /></span>
            <span v-if="survivor.cannotSpendSurvival">Survivor cannot spend surival!</span>
            <span v-if="survivor.skipHunt">Survivor must skip next hunt!</span>
            <span v-if="survivor.cannotUseFighting">Survivor cannot use fighting arts!</span>
        </div>
        <div class="content-section">
          <div class="row-section section1">
            <div class="section-contents-wrapper">
              <div class="left-icons">
                <div class="yee-icon">
                  <font-awesome-icon
                    :icon="yeeIcon"
                    :style="yeeColor" />
                </div>
                <div class="alive-button-wrapper">
                  <button class="alive-button"
                    :class="[survivor.alive ? 'red' : '']"
                    @click="update('alive', !survivor.alive)"
                    @dblclick.stop @mousedown.stop>
                    <font-awesome-icon :icon="aliveIcon" />
                  </button>
                </div>
                <div v-if="survivor.alive" class="depart-button-wrapper">
                  <button class="depart-button"
                    :class="[survivor.departing ? 'green' : '']"
                    @click="setDeparting(!survivor.departing)"
                    @dblclick.stop @mousedown.stop>
                    <font-awesome-icon :icon="departIcon" />
                  </button>
                </div>
              </div>
              <div class="general-info">
                <div class="name-input-wrapper" @dblclick.stop @mousedown.stop>
                  <editable-text-input
                    :textValue="survivor.name"
                    :textStyle="{fontSize:'12pt', textOverflow:'ellipsis'}"
                    :placeholder="'Unnamed'"
                    @update="update('name', $event)" />
                </div>
                <div class="mf-toggle-wrapper" @dblclick.stop @mousedown.stop>
                  <male-female-toggle
                    :survivorID="survivor._id"
                    :initSex="survivor.sex" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row-section section4">
          <div class="section-contents-wrapper">
            <div @dblclick.stop @mousedown.stop>
              <editable-stat
                :initValue="survivor.xp"
                :statDisplayName="'XP'"
                :minValue="0"
                :maxValue="16"
                noBorder
                @update="update('xp', $event)" />
            </div>
            <div @dblclick.stop @mousedown.stop>
              <editable-stat
                :initValue="survivor.survival"
                :statDisplayName="'SUR'"
                :minValue="0"
                :maxValue="currentSettlement.survivalLimit"
                noBorder
                @update="update('survival', $event)" />
            </div>
            <div @dblclick.stop @mousedown.stop>
              <editable-stat
                :initValue="survivor.insanity"
                :statDisplayName="'INS'"
                :minValue="0"
                noBorder
                @update="update('insanity', $event)" />
            </div>
          </div>
        </div>
        <div class="row-section section3">
          <div class="section-contents-wrapper">
            <div class="stat-row-padding">
              <div @dblclick.stop @mousedown.stop>
                <editable-stat
                  :initValue="survivor.movement"
                  :statDisplayName="'MOV'"
                  @update="update('movement', $event)" />
              </div>
              <div @dblclick.stop @mousedown.stop>
                <editable-stat
                  :initValue="survivor.accuracy"
                  :statDisplayName="'ACC'"
                  @update="update('accuracy', $event)" />
              </div>
              <div @dblclick.stop @mousedown.stop>
                <editable-stat
                  :initValue="survivor.strength"
                  :statDisplayName="'STR'"
                  @update="update('strength', $event)" />
              </div>
              <div @dblclick.stop @mousedown.stop>
                <editable-stat
                  :initValue="survivor.evasion"
                  :statDisplayName="'EVA'"
                  @update="update('evasion', $event)" />
              </div>
              <div @dblclick.stop @mousedown.stop>
                <editable-stat
                  :initValue="survivor.luck"
                  :statDisplayName="'LCK'"
                  @update="update('luck', $event)" />
              </div>
              <div @dblclick.stop @mousedown.stop>
                <editable-stat
                  :initValue="survivor.speed"
                  :statDisplayName="'SPD'"
                  @update="update('speed', $event)" />
              </div>
            </div>
          </div>
        </div>
        <div class="row-section section4">
          <div class="section-contents-wrapper">
            <div @dblclick.stop @mousedown.stop>
              <editable-stat
                :initValue="survivor.weaponProficiencyLevel"
                :statDisplayName="'WPN'"
                :minValue="0"
                :maxValue="8"
                noBorder
                @update="update('weaponProficiencyLevel', $event)" />
            </div>
            <div @dblclick.stop @mousedown.stop>
              <editable-stat
                :initValue="survivor.courage"
                :statDisplayName="'CRG'"
                :minValue="0"
                :maxValue="9"
                noBorder
                @update="update('courage', $event)" />
            </div>
            <div @dblclick.stop @mousedown.stop>
              <editable-stat
                :initValue="survivor.understanding"
                :statDisplayName="'UND'"
                :minValue="0"
                :maxValue="9"
                noBorder
                @update="update('understanding', $event)" />
            </div>
          </div>
        </div>
        <transition name="expand">
          <div v-if="!collapsedState" class="expand-content">
            <div class="development-inputs flex-wrapper">
              <div class="development-wrapper">
                <span>Weapon Type:</span>
                <div class="development-wrapper-input">
                  <editable-text-input
                    :textValue="survivor.weaponProficiency"
                    :textStyle="{fontSize:'9pt',fontStyle:'oblique'}"
                    :placeholder="'None declared'"
                    @update="update('weaponProficiency', $event)" />
                </div>
              </div>
              <div class="development-wrapper">
                <span>Bold Skill:</span>
                <div class="development-wrapper-input">
                  <editable-text-input
                    :textValue="survivor.boldSkill"
                    :textStyle="{fontSize:'9pt'}"
                    :placeholder="'None'"
                    @update="update('boldSkill', $event)" />
                </div>
              </div>
              <div class="development-wrapper">
                <span>Insight Skill:</span>
                <div class="development-wrapper-input">
                  <editable-text-input
                    :textValue="survivor.insightSkill"
                    :textStyle="{fontSize:'9pt'}"
                    :placeholder="'None'"
                    @update="update('insightSkill', $event)" />
                </div>
              </div>
            </div>
            <div class="other-info flex-wrapper">
              <div class="other-wrapper">
                <span>Fighting Arts:</span>
                <ul><li v-for="(fa, index) in survivor.fightingArts">{{ fa }}<template v-if="index<2&&fa!=null&&survivor.fightingArts[index+1]!=null">,</template></li></ul>
              </div>
              <div class="other-wrapper">
                <span>Disorders:</span>
                <ul><li v-for="(dis, index) in survivor.disorders">{{ dis }}<template v-if="index<2&&dis!=null&&survivor.disorders[index+1]!=null">,</template></li></ul>
              </div>
            </div>
            <div class="other-info flex-wrapper">
              <div class="other-wrapper">
                <span>Abilities:</span>
                <ul><li v-for="(ab, index) in survivor.abilities">{{ ab }}<template v-if="index<survivor.abilities.length-1&&ab!=null">,</template></li></ul>
              </div>
              <div class="other-wrapper">
                <span>Impairments:</span>
                <ul><li v-for="(imp, index) in survivor.impairments">{{ imp }}<template v-if="index<survivor.impairments.length-1&&imp!=null">,</template></li></ul>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </td>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import {
  faExpand,
  faCaretSquareUp,
  faCaretSquareDown,
  faSkull,
  faHeartbeat,
  faTrashAlt,
  faExclamationTriangle,
  faCheckSquare,
  faHome
} from '@fortawesome/fontawesome-free-solid'

import SurvivorModal from './SurvivorModal'
import Modal from './Modal'
import { EditableTextInput, EditableStat } from './GUIComponents'
import { MaleFemaleToggle } from './SurvivorComponents'
import YeeScoreMixin from '../mixins/YeeScore'

export default {
  name: 'survivor-table-row',
  components: {
    SurvivorModal,
    Modal,
    FontAwesomeIcon,
    EditableTextInput,
    EditableStat,
    MaleFemaleToggle
  },
  mixins: [YeeScoreMixin],
  props: {
    survivor: { required: true },
    collapsed: { default: false },
    yeeScore: { required: false, default: 0 }
  },
  data: function () {
    return {
      collapsedState: this.collapsed,
      modalVisible: false,
      deleteModalVisible: false,
      mouseDownState: false
    }
  },
  computed: {
    ...mapGetters([
      'currentSettlement',
      'settlementDepartingCount'
    ]),
    collapseButtonIcon: function () {
      if (this.collapsedState) {
        return faCaretSquareUp
      } else {
        return faCaretSquareDown
      }
    },
    modalButtonIcon: function () {
      return faExpand
    },
    aliveIcon: function () {
      if (this.survivor.alive) {
        return faHeartbeat
      } else {
        return faSkull
      }
    },
    deleteIcon: function () {
      return faTrashAlt
    },
    departIcon: function () {
      if (this.survivor.departing) {
        return faCheckSquare
      } else {
        return faHome
      }
    },
    warning: function () {
      return this.survivor.cannotSpendSurvival ||
        this.survivor.skipHunt || this.survivor.cannotUseFighting
    },
    warningIcon: function () {
      return faExclamationTriangle
    }
  },
  watch: {
    collapsed: function (newVal) {
      this.collapsedState = newVal
    }
  },
  methods: {
    ...mapActions([
      'updateSurvivor',
      'deleteSurvivor'
    ]),
    update: function (stat, val) {
      var update = {}
      update[stat] = val
      if (stat === 'alive' && val === false) {
        // Unset departing if died
        update['departing'] = false
      }
      this.updateSurvivor({ id: this.survivor._id, update: update })
    },
    setDeparting: function (val) {
      if (val && this.settlementDepartingCount >= 4) {
        alert('You can only have up to 4 departing survivors at a time!')
      } else {
        this.update('departing', val)
      }
    },
    onLongPress: function () {
      this.mouseDownState = false
      this.modalVisible = true
    },
    displayModal: function () {
      this.modalVisible = true
    }
  }
}
</script>

<style scoped>
div.survivor-table-row-wrapper {
  user-select: none;
  cursor: default;
  display: table;
  margin: 0 auto;
}
td.survivor-table-row {
  min-width: 633px;
}
.mouse-down {
  transform: translateY(2px);
}
div.row-contents-wrapper {
  position: relative;
  border: 2px solid black;
  border-radius: 3px;
  background-color: white;
}
div.right-hand-buttons {
  position: absolute;
  top: 12px;
  right: 6px;
  color: gray;
}
div.modal-button-wrapper,
div.collapse-button-wrapper {
  margin-bottom: 4px;
}
.modal-button,
.collapse-button,
.delete-button {
  outline: none;
  border: none;
  background-color: white;
  font-size: 11pt;
  color: gray;
  padding: 0;
  margin: 0;
  text-align: center;
}
.modal-button:hover,
.collapse-button:hover,
.delete-button:hover {
  color: black;
  cursor: pointer;
}
.modal-button:active,
.collapse-button:active,
.delete-button:active {
  transform: translateY(2px);
}
div.warning {
  position: absolute;
  left: 35px;
  top: 0;
}
div.warning span {
  font-size: 8pt;
  color: orange;
}
div.content-section {
  display: inline-block;
}
div.row-section {
  display: inline-block;
  vertical-align: top;
}
div.section1 {
  width: 115px;
  padding-top: 6px;
}
div.section2 {
}
div.section3 {
}
div.section4 {
}
div.section-contents-wrapper {
  display: flex;
  flex-direction: row;
  min-height: 75px;
}
div.left-icons {
  margin: auto 5px;
}
div.yee-icon,
div.alive-button-wrapper,
div.depart-button-wrapper {
  padding: 2px 2px 2px 0;
  text-align: center;
}
div.yee-icon {
  font-size: 12pt;
  padding-left: 0;
}
.alive-button,
.depart-button {
  outline: none;
  border: none;
  background-color: white;
  font-size: 12pt;
  color: black;
  padding: 0;
  margin: 0;
  text-align: center;
}
.alive-button:hover,
.depart-button:hover {
  cursor: pointer;
}
.alive-button:active,
.depart-button:active {
  transform: translateY(2px);
}
.red {
  color: #8a0707;
}
.green {
  color: #00ab66;
}
div.general-info {
  padding-left: 5px;
  margin: auto 0;
}
div.name-input-wrapper {
  width: 95%;
  margin-bottom: 6px;
}
div.mf-toggle-wrapper {
  margin-left: 3px;
  margin-bottom: 4px;
}
div.stat-row-padding {
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
}
div.expand-content {
  padding: 4px;
  border-top: 1px solid black;
}
div.development-wrapper {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
div.development-wrapper span {
  font-size: 10pt;
  padding-left: 12px;
  line-height: 15pt;
  font-variant-caps: small-caps;
}
div.development-wrapper-input {
  width: 100px;
  border-bottom: 1px dotted black;
  margin-bottom: 2px;
  margin-left: 4px;
  padding-right: 14px;
}
div.other-wrapper {
  display: flex;
  flex-direction: row;
  width: 50%;
  margin-bottom: 5px;
}
div.other-wrapper span {
  font-size: 10pt;
  padding-left: 12px;
  min-width: 80px;
  font-variant-caps: small-caps;
}
div.other-wrapper ul {
  margin: 0;
  padding-left: 10px;
  font-size: 9pt;
  font-style: oblique;
  line-height: 12pt;
  max-width: 300px;
}
div.other-wrapper li {
  display: inline-block;
  list-style-type: none;
  padding-right: 5px;
  text-overflow: ellipsis;
}
.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s ease-in-out;
  max-height: 120px;
}
.expand-enter,
.expand-leave-to {
  max-height: 0px;
  opacity: 0;
}
</style>
