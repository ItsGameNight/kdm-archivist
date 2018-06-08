<template>
  <div class="SurvivorTableRow">
    <div class="SurvivorTableRow__modals">
      <survivor-modal
        v-if="modalVisible"
        :survivor="survivor"
        :yeeScore="yeeScore"
        @close="modalVisible = false; $emit('modalClose')" />
      <modal
        v-if="deleteModalVisible"
        :modalWidth="300"
        @okay="deleteSurvivor({ id: survivor._id })"
        @close="deleteModalVisible = false">
        <h3 slot="header">Delete {{ survivor.name }}?</h3>
        <p slot="body">Are you sure you want to delete this survivor?</p>
      </modal>
    </div>
    <td class="SurvivorTableRow__tableData"
      :class="[mouseDownState ? 'mouse-down' : '']"
      @dblclick="collapsedState = !collapsedState"
      @mousedown="mouseDownState = true"
      @mouseup="mouseDownState = false"
      v-long-press="onLongPress">
      <div class="SurvivorTableRow__contentsWrapper" :class="[themeClass]">
        <div class="SurvivorTableRow__rightButtons" :class="[themeClass]">
          <div class="SurvivorTableRow__buttonWrapper buttonWrapper--right">
            <button class="SurvivorTableRow__button button--right"
              :class="[themeClass]"
              @click="displayModal()"
              @dblclick.stop
              @mousedown.stop>
                <font-awesome-icon :icon="modalButtonIcon" />
            </button>
          </div>
          <div class="SurvivorTableRow__buttonWrapper buttonWrapper--right">
            <button class="SurvivorTableRow__button button--right"
              :class="[themeClass]"
              @click="collapsedState = !collapsedState"
              @dblclick.stop
              @mousedown.stop>
                <font-awesome-icon :icon="collapseButtonIcon" />
            </button>
          </div>
          <div class="SurvivorTableRow__buttonWrapper buttonWrapper--right--bottom">
            <button
              class="SurvivorTableRow__button button--right"
              :class="[themeClass]"
              :disabled="inHistoryMode"
              @click="deleteModalVisible = true"
              @dblclick.stop
              @mousedown.stop>
                <font-awesome-icon :icon="deleteIcon" />
            </button>
          </div>
        </div>
        <div class="SurvivorTableRow__warnings">
            <span v-if="warning" :class="[themeClass]"><font-awesome-icon :icon="warningIcon" /></span>
            <span v-if="survivor.cannotSpendSurvival" :class="[themeClass]">Survivor cannot spend surival!</span>
            <span v-if="survivor.skipHunt" :class="[themeClass]">Survivor must skip next hunt!</span>
            <span v-if="survivor.cannotUseFighting" :class="[themeClass]">Survivor cannot use fighting arts!</span>
        </div>
        <div class="SurvivorTableRow__contents">
          <div class="SurvivorTableRow__rowSection--section1">
            <div class="SurvivorTableRow__sectionWrapper">
              <div class="SurvivorTableRow__leftIcons">
                <div class="SurvivorTableRow__buttonWrapper buttonWrapper--left">
                  <div class="SurvivorTableRow__yeeIcon">
                    <font-awesome-icon
                      :icon="yeeIcon"
                      :style="yeeColor" />
                  </div>
                </div>
                <div class="SurvivorTableRow__buttonWrapper buttonWrapper--left">
                  <button class="SurvivorTableRow__button button--left"
                    :disabled="inHistoryMode"
                    :class="[themeClass, survivor.alive ? 'red' : '']"
                    @click="update('alive', !survivor.alive)"
                    @dblclick.stop @mousedown.stop>
                    <font-awesome-icon :icon="aliveIcon" />
                  </button>
                </div>
                <div v-if="survivor.alive" class="SurvivorTableRow__buttonWrapper buttonWrapper--left">
                  <button class="SurvivorTableRow__button button--left"
                    :class="[themeClass, survivor.departing ? 'green' : '']"
                    :disabled="inHistoryMode"
                    @click="setDeparting(!survivor.departing)"
                    @dblclick.stop @mousedown.stop>
                    <font-awesome-icon :icon="departIcon" />
                  </button>
                </div>
              </div>
              <div class="SurvivorTableRow__generalInfo">
                <div class="SurvivorTableRow__nameInputWrapper" @dblclick.stop @mousedown.stop>
                  <editable-text-input
                    :textValue="survivor.name"
                    :textStyle="{fontSize:'12pt', textOverflow:'ellipsis'}"
                    :placeholder="'Unnamed'"
                    @update="update('name', $event)" />
                </div>
                <div class="SurvivorTableRow__sexToggleWrapper" @dblclick.stop @mousedown.stop>
                  <male-female-toggle
                    :survivorID="survivor._id"
                    :initSex="survivor.sex" />
                </div>
              </div>
            </div>
          </div>
          <div class="SurvivorTableRow__rowSection--section2">
            <div class="SurvivorTableRow__sectionWrapper">
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
          <div class="SurvivorTableRow__rowSection--section3">
            <div class="SurvivorTableRow__sectionWrapper">
              <div class="SurvivorTableRow__statRowPadding">
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
          <div class="SurvivorTableRow__rowSection--section4">
            <div class="SurvivorTableRow__sectionWrapper">
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
        </div>
        <transition name="expand">
          <div v-if="!collapsedState" class="SurvivorTableRow__expandContent" :class="[themeClass]">
            <div class="SurvivorTableRow__development">
              <div class="SurvivorTableRow__developmentSection">
                <span>Weapon Type:</span>
                <div class="SurvivorTableRow__developmentInputWrapper" :class="[themeClass]">
                  <editable-text-input
                    :textValue="survivor.weaponProficiency"
                    :textStyle="{fontSize:'9pt',fontStyle:'oblique'}"
                    :placeholder="'None declared'"
                    @update="update('weaponProficiency', $event)" />
                </div>
              </div>
              <div class="SurvivorTableRow__developmentSection">
                <span>Bold Skill:</span>
                <div class="SurvivorTableRow__developmentInputWrapper" :class="[themeClass]">
                  <editable-text-input
                    :textValue="survivor.boldSkill"
                    :textStyle="{fontSize:'9pt'}"
                    :placeholder="'None'"
                    @update="update('boldSkill', $event)" />
                </div>
              </div>
              <div class="SurvivorTableRow__developmentSection">
                <span>Insight Skill:</span>
                <div class="SurvivorTableRow__developmentInputWrapper" :class="[themeClass]">
                  <editable-text-input
                    :textValue="survivor.insightSkill"
                    :textStyle="{fontSize:'9pt'}"
                    :placeholder="'None'"
                    @update="update('insightSkill', $event)" />
                </div>
              </div>
            </div>
            <div class="SurvivorTableRow__otherInfo">
              <div class="SurvivorTableRow__otherWrapper">
                <span>Fighting Arts:</span>
                <ul><li v-for="(fa, index) in survivor.fightingArts">{{ fa }}<template v-if="index<2&&fa!=null&&survivor.fightingArts[index+1]!=null">,</template></li></ul>
              </div>
              <div class="SurvivorTableRow__otherWrapper">
                <span>Disorders:</span>
                <ul><li v-for="(dis, index) in survivor.disorders">{{ dis }}<template v-if="index<2&&dis!=null&&survivor.disorders[index+1]!=null">,</template></li></ul>
              </div>
            </div>
            <div class="SurvivorTableRow__otherInfo">
              <div class="SurvivorTableRow__otherWrapper">
                <span>Abilities:</span>
                <ul><li v-for="(ab, index) in survivor.abilities">{{ ab }}<template v-if="index<survivor.abilities.length-1&&ab!=null">,</template></li></ul>
              </div>
              <div class="SurvivorTableRow__otherWrapper">
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
import ThemeClass from '@/mixins/ThemeClass'

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
  mixins: [YeeScoreMixin, ThemeClass],
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
      'inHistoryMode',
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
      if (stat === 'alive') {
        if (!val) {
          // Unset departing if died
          update['departing'] = false
          // Set death year
          update['deathYear'] = this.currentSettlement.lanternYear
        } else {
          // Unset death year
          update['deathYear'] = null
        }
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
      this.displayModal()
    },
    displayModal: function () {
      this.modalVisible = true
      this.$emit('modalOpen')
    }
  }
}
</script>

<style lang="scss" scoped>
.SurvivorTableRow {
  user-select: none;
  cursor: default;
  display: table;
  margin: 0 auto;

  &__modals {
    display: table-caption;
  }

  &__tableData {
    min-width: 633px;
    width: 85%;

    &.mouse-down {
      transform: translateY(2px);
    }
  }

  &__contentsWrapper {
    position: relative;
    border-width: 2px;
    border-style: solid;
    border-radius: 3px;

    &.theme-light {
      border-color: $light-border;
      background-color: $light-bg;
    }

    &.theme-dark {
      border-color: $dark-border;
      background-color: $dark-bg;
    }
  }

  &__rightButtons {
    position: absolute;
    top: 6px;
    right: 6px;

    &.theme-light {
      color: $light-highlight;
    }

    &.theme-dark {
      color: $dark-highlight;
    }
  }

  &__buttonWrapper {
    &.buttonWrapper--right {
      margin-bottom: 4px;

      &--bottom {
        margin-bottom: 0;
      }
    }

    &.buttonWrapper--left {
      padding: 2px 2px 2px 0;
      text-align: center;
    }
  }

  &__button {
    border: none;
    padding: 0;
    margin: 0;
    text-align: center;

    &.button--right {
      font-size: 11pt;

      &.theme-light {
        color: $light-highlight;
        background-color: $light-bg;
      }

      &.theme-dark {
        color: $dark-highlight;
        background-color: $dark-bg;
      }

      &:hover {
        cursor: pointer;

        &.theme-light {
          color: $light-text;
          background-color: $light-bg;
        }

        &.theme-dark {
          color: $dark-text;
          background-color: $dark-bg;
        }
      }

      &:active {
        transform: translateY(2px);

        &.theme-light {
          color: $light-text;
          background-color: $light-bg;
        }

        &.theme-dark {
          color: $dark-text;
          background-color: $dark-bg;
        }
      }
    }

    &.button--left {
      font-size: 12pt;

      &.theme-light {
        color: $light-text;
        background-color: $light-bg;
      }

      &.theme-dark {
        color: $dark-text;
        background-color: $dark-bg;
      }

      &.red {
        color: $blood-red;
      }

      &.green {
        color: $departing;
      }

      &:hover {
        cursor: pointer;
      }

      &:active {
        transform: translateY(2px);
      }
    }
  }

  &__warnings {
    position: absolute;
    left: 35px;
    top: 0;

    span {
      font-size: 8pt;

      &.theme-light {
        color: $light-alert;
      }

      &.theme-dark {
        color: $dark-alert;
      }
    }
  }

  &__contents {
    display: flex;
    flex-direction: row;
  }

  &__rowSection {
    display: inline-block;
    vertical-align: top;

    &--section1 {
      min-width: 115px;
      flex: 1;
      padding-top: 6px;
    }

    &--section2, &--section3 {
      margin-right: 10px;
    }

    &--section4 {
      margin-right: 30px;
    }
  }

  &__sectionWrapper {
    display: flex;
    flex-direction: row;
    min-height: 75px;
  }

  &__leftIcons {
    margin: auto 5px;
  }

  &__yeeIcon {
    font-size: 12pt;
    padding-left: 0;
  }

  &__generalInfo {
    padding-left: 5px;
    margin: auto 0;
  }

  &__nameInputWrapper {
    width: 80%;
    margin-bottom: 6px;
  }

  &__sexToggleWrapper {
    margin-left: 3px;
    margin-bottom: 4px;
  }

  &__statRowPadding {
    display: flex;
    flex-direction: row;
    margin-bottom: 6px;
  }

  &__expandContent {
    padding: 4px;
    border-top-width: 1px;
    border-top-style: solid;

    &.theme-light {
      border-top-color: $light-border;
    }

    &.theme-dark {
      border-top-color: $dark-border;
    }
  }

  &__development {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;

    span {
      font-size: 10pt;
      padding-left: 12px;
      line-height: 15pt;
    }
  }

  &__developmentSection {
    display: flex;
    flex-direction: row;
  }

  &__developmentInputWrapper {
    width: 100px;
    margin-left: 4px;
    margin-bottom: 2px;
    padding-right: 14px;
    border-bottom-width: 1px;
    border-bottom-style: dotted;

    &.theme-light {
      border-bottom-color: $light-border;
    }

    &.theme-dark {
      border-bottom-color: $dark-border;
    }
  }

  &__otherInfo {
    display: flex;
    flex-direction: row;
  }

  &__otherWrapper {
    display: flex;
    flex-direction: row;
    width: 50%;
    margin-bottom: 5px;

    span {
      font-size: 10pt;
      padding-left: 12px;
      min-width: 80px;
    }

    ul {
      margin: 0;
      padding-left: 10px;
      font-size: 9pt;
      font-style: italic;
      line-height: 12pt;
      max-width: 300px;
    }

    li {
      display: inline-block;
      list-style-type: none;
      padding-right: 5px;
      text-overflow: ellipsis;
    }
  }
}

// Transition styles
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
