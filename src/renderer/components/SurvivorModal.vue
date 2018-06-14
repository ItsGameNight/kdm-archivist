<template>
  <modal @close="$emit('close', survivor)" :modalWidth="750" noFooter>
    <div slot="header" style="display: none;"></div>
    <div slot="body" class="SurvivorModal">
      <!----------------------------------------------------------------------------------->
      <!-------------------------------------- ROW 1 -------------------------------------->
      <!----------------------------------------------------------------------------------->
      <div class="SurvivorModal__row row--row1" :class="[themeClass]">
        <div class="SurvivorModal__generalInfo" :class="[themeClass]">
          <div class="SurvivorModal__yeeIcon">
            <font-awesome-icon
              :icon="yeeIcon"
              :style="yeeColor" />
          </div>
          <div class="SurvivorModal__survivorName">
            <editable-text-input
              :textValue="survivor.name"
              :textStyle="{fontWeight:'bold', fontSize: '14pt'}"
              :placeholder="'Unnamed'"
              @update="update('name', $event)" />
          </div>
          <div class="SurvivorModal__sexToggle">
            <male-female-toggle
              :initSex="survivor.sex"
              :survivorID="survivor._id" />
          </div>
        </div>
        <div class="SurvivorModal__huntXp" :class="[themeClass]">
          <hunt-xp-bar :survivorID="survivor._id" :level="survivor.xp" />
        </div>
      </div>
      <!----------------------------------------------------------------------------------->
      <!-------------------------------------- ROW 2 -------------------------------------->
      <!----------------------------------------------------------------------------------->
      <div class="SurvivorModal__row row--row2" :class="[themeClass]">
        <div class="SurvivorModal__extraNames">
          <div class="SurvivorModal__extraNameInput extraNameInput--nickname" :class="[themeClass]">
            <editable-text-input
              :placeholder="'Nickname'"
              :textValue="survivor.nickname"
              :textStyle="{fontSize: '10pt'}"
              @update="update('nickname', $event)" />
          </div>
          <div class="SurvivorModal__extraNameInput extraNameInput--surname" :class="[themeClass]">
            <editable-text-input
              :placeholder="'Surname'"
              :textValue="survivor.surname"
              :textStyle="{fontSize: '10pt'}"
              @update="update('surname', $event)" />
          </div>
        </div>
        <div class="SurvivorModal__aliveBox">
          <div class="SurvivorModal__aliveLabel aliveLabel--birth">Born LY:</div>
          <div class="SurvivorModal__aliveYearInput aliveYearInput--birth">
            <editable-text-input
              :inputType="'number'"
              :textValue="survivor.birthYear"
              :textStyle="{width:'2.6em', fontSize: '10pt', border: '1px solid', borderRadius: '2px', textAlign: 'center', backgroundPosition: 'left 2px center'}"
              :placeholder="''"
              @update="update('birthYear', $event)" />
          </div>
          <div class="SurvivorModal__deadOrAlive">
            <alive-toggle :initValue="survivor.alive" :survivorID="survivor._id" />
          </div>
          <div class="SurvivorModal__aliveLabel aliveLabel--death">Died LY:</div>
          <div class="SurvivorModal__aliveYearInput aliveYearInput--death">
            <editable-text-input
              :inputType="'number'"
              :textValue="survivor.deathYear"
              :textStyle="{width:'2.6em', fontSize: '10pt', border: '1px solid', borderRadius: '2px',  textAlign: 'center', backgroundPosition: 'left 2px center'}"
              :placeholder="''"
              @update="update('deathYear', $event); update('alive', false)" />
          </div>
          <div v-if="survivor.alive" class="SurvivorModal__departButtonWrapper">
            <button class="SurvivorModal__departButton"
              :disabled="inHistoryMode"
              :class="[themeClass, toggleColor, survivor.departing ? 'green' : '']"
              @click="setDeparting(!survivor.departing)"
              @dblclick.stop @mousedown.stop>
                <font-awesome-icon :icon="departIcon" />
                <span v-if="survivor.departing">Departing</span>
                <span v-else>Resting</span>
            </button>
          </div>
        </div>
      </div>
      <!----------------------------------------------------------------------------------->
      <!-------------------------------------- ROW 3 -------------------------------------->
      <!----------------------------------------------------------------------------------->
      <div class="SurvivorModal__row row--row3">
        <div class="SurvivorModal__rowBox rowBox--row3--survival" :class="[themeClass]">
          <div :class="[survivor.cannotSpendSurvival ? 'SurvivorModal__noSurvival' : '']">
            <div class="SurvivorModal__rowTitle rowTitle--row3" :class="[themeClass]">
              <span>Survival</span>
            </div>
            <div class="SurvivorModal__survivalBox">
              <div class="SurvivorModal__survivalInput">
                <editable-stat
                  :initValue="survivor.survival"
                  :maxValue="currentSettlement.survivalLimit"
                  :minValue="0"
                  limitBox
                  @update="update('survival', $event)" />
              </div>
              <div class="SurvivorModal__survivalAbilitiesList">
                <div class="SurvivorModal__survivalAbility">
                  <square-toggle
                    :statDisplayName="'Dodge'"
                    :initValue="survivor.dodge"
                    :squareSize="'8'"
                    @update="update('dodge', $event)"/>
                </div>
                <div class="SurvivorModal__survivalAbility">
                  <square-toggle
                    :statDisplayName="'Encourage'"
                    :initValue="survivor.encourage"
                    :squareSize="'8'"
                    @update="update('encourage', $event)" />
                </div>
                <div class="SurvivorModal__survivalAbility">
                  <square-toggle
                    :statDisplayName="'Dash'"
                    :initValue="survivor.dash"
                    :squareSize="'8'"
                    @update="update('dash', $event)" />
                </div>
                <div class="SurvivorModal__survivalAbility">
                  <square-toggle
                    :statDisplayName="'Surge'"
                    :initValue="survivor.surge"
                    :squareSize="'8'"
                    @update="update('surge', $event)" />
                </div>
                <div class="SurvivorModal__survivalAbility">
                  <square-toggle
                    :statDisplayName="'Endure'"
                    :initValue="survivor.endure"
                    :squareSize="'8'"
                    @update="update('endure', $event)" />
                </div>
              </div>
            </div>
          </div>
          <div class="SurvivorModal__cannotSpendSurvival">
            <lock-toggle
              :initValue="survivor.cannotSpendSurvival"
              :statDisplayName="'Cannot Spend Survival'"
              @update="update('cannotSpendSurvival', $event)" />
          </div>
        </div>
        <div class="SurvivorModal__rowBox rowBox--row3--stats" :class="[themeClass]">
          <div class="SurvivorModal__rowTitle rowTitle--row3" :class="[themeClass]">
            <span>Showdown Stats</span>
            <div class="SurvivorModal__skipHunt">
              <lock-toggle
                :statDisplayName="'Skip Next Hunt'"
                :initValue="survivor.skipHunt"
                @update="update('skipHunt', $event)"/>
            </div>
          </div>
          <div class="SurvivorModal__statsGroup">
            <editable-stat
              :statDisplayName="'MOV'"
              :initValue="survivor.movement"
              @update="update('movement', $event)" />
            <editable-stat
              :statDisplayName="'ACC'"
              :initValue="survivor.accuracy"
              @update="update('accuracy', $event)" />
            <editable-stat
              :statDisplayName="'STR'"
              :initValue="survivor.strength"
              @update="update('strength', $event)" />
            <editable-stat
              :statDisplayName="'EVA'"
              :initValue="survivor.evasion"
              @update="update('evasion', $event)" />
            <editable-stat
              :statDisplayName="'LCK'"
              :initValue="survivor.luck"
              @update="update('luck', $event)" />
            <editable-stat
              :statDisplayName="'SPD'"
              :initValue="survivor.speed"
              @update="update('speed', $event)" />
          </div>
        </div>
        <div class="SurvivorModal__rowBox rowBox--row3--progress" :class="[themeClass]">
          <div class="SurvivorModal__rowTitle rowTitle--row3" :class="[themeClass]">
            <span>Development Stats</span>
          </div>
          <div class="SurvivorModal__progressGroup">
            <div class="SurvivorModal__weaponProfGroup">
              <weapon-proficiency-bar :survivorID="survivor._id" :level="survivor.weaponProficiencyLevel" />
              <div class="SurvivorModal__weaponType" :class="[themeClass]">
                <div class="SurvivorModal__weaponTypeText">
                  Weapon Type:
                </div>
                <div class="SurvivorModal__weaponTypeInput">
                  <editable-text-input
                    :textValue="survivor.weaponProficiency"
                    :textStyle="{fontSize: '9pt', fontStyle: 'italic'}"
                    :placeholder="'None declared'"
                    @update="update('weaponProficiency', $event)" />
                </div>
              </div>
            </div>
            <div class="SurvivorModal__crgUndGroup">
              <div class="SurvivorModal__crgUndRow">
                <div class="SurvivorModal__courage">
                  <courage-bar :survivorID="survivor._id" :level="survivor.courage" />
                </div>
                <div class="SurvivorModal__understanding">
                  <understanding-bar :survivorID="survivor._id" :level="survivor.understanding" />
                </div>
              </div>
              <div class="SurvivorModal__crgUndRow">
                <div class="SurvivorModal__skillInputWrapper" :class="[themeClass]">
                  <div class="SurvivorModal__skillInput">
                    <editable-text-input
                      :textValue="survivor.boldSkill"
                      :placeholder="'Bold Skill'"
                      :textStyle="{fontSize: '9pt'}"
                      @update="update('boldSkill', $event)" />
                  </div>
                </div>
                <div class="SurvivorModal__skillInputWrapper skillInputWrapper--right" :class="[themeClass]">
                  <div class="SurvivorModal__skillInput">
                    <editable-text-input
                      :textValue="survivor.insightSkill"
                      :placeholder="'Insight Skill'"
                      :textStyle="{fontSize: '9pt'}"
                      @update="update('insightSkill', $event)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!----------------------------------------------------------------------------------->
      <!-------------------------------------- ROW 4 -------------------------------------->
      <!----------------------------------------------------------------------------------->
      <div class="SurvivorModal__row row--row4">
        <div class="SurvivorModal__rowBox rowBox--row4--armorPoints" :class="[themeClass]">
          <div class="SurvivorModal__rowTitle rowTitle--row4" :class="[themeClass]">
            <span>Hit Locations</span>
          </div>
          <div class="SurvivorModal__hitLocations">
            <div class="SurvivorModal__armorPointBox" :class="[themeClass]">
              <img v-if="themeClass==='theme-light'" class="SurvivorModal__armorImg" src="~@/assets/img/brain.png" />
              <img v-if="themeClass==='theme-dark'" class="SurvivorModal__armorImg" src="~@/assets/img/brain-white.png" />
              <editable-stat
                :minValue="0"
                :initValue="survivor.insanity"
                @update="update('insanity', $event)" />
              <div class="SurvivorModal__hpBar">
                <progress-bar
                  :title="''"
                  :initLevel="survivor.brainHP"
                  :maxLevel="1"
                  :boldLevels="[1]"
                  :paddingSquares="1"
                  :survivorID="survivor._id"
                  :stat="'brainHP'" />
              </div>
            </div>
            <div class="SurvivorModal__armorPointBox" :class="[themeClass]">
              <img v-if="themeClass==='theme-light'" class="SurvivorModal__armorImg" src="~@/assets/img/head.png" />
              <img v-if="themeClass==='theme-dark'" class="SurvivorModal__armorImg" src="~@/assets/img/head-white.png" />
              <editable-stat
                :initValue="survivor.headArmor"
                :minValue="0"
                @update="update('headArmor', $event)" />
              <div class="SurvivorModal__hpBar">
                <progress-bar
                  :title="''"
                  :initLevel="survivor.headHP"
                  :maxLevel="2"
                  :boldLevels="[2]"
                  :survivorID="survivor._id"
                  :stat="'headHP'" />
              </div>
            </div>
            <div class="SurvivorModal__armorPointBox" :class="[themeClass]">
              <img v-if="themeClass==='theme-light'" class="SurvivorModal__armorImg" src="~@/assets/img/arms.png" />
              <img v-if="themeClass==='theme-dark'" class="SurvivorModal__armorImg" src="~@/assets/img/arms-white.png" />
              <editable-stat
                :initValue="survivor.armsArmor"
                :minValue="0"
                @update="update('armsArmor', $event)" />
              <div class="SurvivorModal__hpBar">
                <progress-bar
                  :title="''"
                  :initLevel="survivor.armsHP"
                  :maxLevel="2"
                  :boldLevels="[2]"
                  :survivorID="survivor._id"
                  :stat="'armsHP'" />
              </div>
            </div>
            <div class="SurvivorModal__armorPointBox" :class="[themeClass]">
              <img v-if="themeClass==='theme-light'" class="SurvivorModal__armorImg" src="~@/assets/img/body.png" />
              <img v-if="themeClass==='theme-dark'" class="SurvivorModal__armorImg" src="~@/assets/img/body-white.png" />
              <editable-stat
                :initValue="survivor.bodyArmor"
                :minValue="0"
                @update="update('bodyArmor', $event)" />
              <div class="SurvivorModal__hpBar">
                <progress-bar
                  :title="''"
                  :initLevel="survivor.bodyHP"
                  :maxLevel="2"
                  :boldLevels="[2]"
                  :survivorID="survivor._id"
                  :stat="'bodyHP'" />
              </div>
            </div>
            <div class="SurvivorModal__armorPointBox" :class="[themeClass]">
              <img v-if="themeClass==='theme-light'" class="SurvivorModal__armorImg" src="~@/assets/img/waist.png" />
              <img v-if="themeClass==='theme-dark'" class="SurvivorModal__armorImg" src="~@/assets/img/waist-white.png" />
              <editable-stat
                :initValue="survivor.waistArmor"
                :minValue="0"
                @update="update('waistArmor', $event)" />
              <div class="SurvivorModal__hpBar">
                <progress-bar
                  :title="''"
                  :initLevel="survivor.waistHP"
                  :maxLevel="2"
                  :boldLevels="[2]"
                  :survivorID="survivor._id"
                  :stat="'waistHP'" />
              </div>
            </div>
            <div class="SurvivorModal__armorPointBox armorPointBox--last" :class="[themeClass]">
              <img v-if="themeClass==='theme-light'" class="SurvivorModal__armorImg" src="~@/assets/img/legs.png" />
              <img v-if="themeClass==='theme-dark'" class="SurvivorModal__armorImg" src="~@/assets/img/legs-white.png" />
              <editable-stat
                :initValue="survivor.legsArmor"
                :minValue="0"
                @update="update('legsArmor', $event)" />
              <div class="SurvivorModal__hpBar">
                <progress-bar
                  :title="''"
                  :initLevel="survivor.legsHP"
                  :maxLevel="2"
                  :boldLevels="[2]"
                  :survivorID="survivor._id"
                  :stat="'legsHP'" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!----------------------------------------------------------------------------------->
      <!-------------------------------------- ROW 5 -------------------------------------->
      <!----------------------------------------------------------------------------------->
      <div class="SurvivorModal__row row--row5">
        <div class="SurvivorModal__rowBox rowBox--row5--fightingArts">
          <div :class="{ 'SurvivorModal__noFighting' : survivor.cannotUseFighting }">
            <div class="SurvivorModal__rowTitle rowTitle--row5">
              <span class="SurvivorModal__rowTitle rowTitle--row5--title">
                Fighting Arts
              </span>
              <span class="SurvivorModal__rowTitle rowTitle--row5--subtitle">
                Max 3.
              </span>
            </div>
            <editable-list
              :listItems="survivor.fightingArts"
              :min="3"
              :max="3"
              :placeholder="'Fighting Art'"
              :autocompleteList="fightingArtNames"
              :fixedHeight="'74px'"
              @update="update('fightingArts', $event)" />
          </div>
          <div class="SurvivorModal__cannotFight">
            <lock-toggle
              :statDisplayName="'Cannot Use Fighting Arts'"
              :initValue="survivor.cannotUseFighting"
              @update="update('cannotUseFighting', $event)" />
          </div>
        </div>
        <div class="SurvivorModal__rowBox rowBox--row5--disorders">
          <div class="SurvivorModal__rowTitle rowTitle--row5">
            <span class="SurvivorModal__rowTitle rowTitle--row5--title">
              Disorders
            </span>
            <span class="SurvivorModal__rowTitle rowTitle--row5--subtitle">
              Max 3.
            </span>
          </div>
          <editable-list
            :listItems="survivor.disorders"
            :min="3"
            :max="3"
            :placeholder="'Disorder'"
            :autocompleteList="disorderNames"
            :fixedHeight="'74px'"
            @update="update('disorders', $event)" />
        </div>
        <div class="SurvivorModal__rowBox rowBox--row5--abilities">
          <div class="SurvivorModal__rowTitle rowTitle--row5">
            <span class="SurvivorModal__rowTitle rowTitle--row5--title">
              Abilities
            </span>
          </div>
          <div class="SurvivorModal__row5scrollbox">
            <div class="SurvivorModal__row5scrollWrapper">
              <editable-list
                :listItems="survivor.abilities"
                :placeholder="'Ability'"
                :fixedHeight="'74px'"
                @update="update('abilities', $event)" />
            </div>
          </div>
        </div>
        <div class="SurvivorModal__rowBox rowBox--row5--impairments">
          <div class="SurvivorModal__rowTitle rowTitle--row5">
            <span class="SurvivorModal__rowTitle rowTitle--row5--title">
              Impairments
            </span>
          </div>
          <div class="SurvivorModal__row5scrollbox">
            <div class="SurvivorModal__row5scrollWrapper">
              <editable-list
                :listItems="survivor.impairments"
                :placeholder="'Impairment'"
                :autocompleteList="impairmentsNames"
                :fixedHeight="'74px'"
                @update="update('impairments', $event)" />
            </div>
          </div>
        </div>
      </div>
      <!----------------------------------------------------------------------------------->
      <!-------------------------------------- ROW 6 -------------------------------------->
      <!----------------------------------------------------------------------------------->
      <div class="SurvivorModal__row row--row6" :class="[themeClass]">
        <div class="SurvivorModal__rowBox rowBox--row6--familyInfo" :class="[themeClass]">
          <div class="SurvivorModal__rowTitle rowTitle--row6 family" :class="[themeClass]">
            <span>Family information:</span>
          </div>
          <div class="SurvivorModal__familyInfoGroup" :class="[themeClass]">
            <div class="SurvivorModal__parents">
              <div class="SurvivorModal__parentsTitle">
                Parents:
              </div>
              <div class="SurvivorModal__parentInputWrapper">
                <editable-text-input
                  :textValue="survivor.mother"
                  placeholder="Mother"
                  :textStyle="{ fontSize:'10pt', textOverflow: 'ellipsis' }"
                  :autocompleteList="survivorsInSettlement.map((s) => { return s.name })"
                  @update="update('mother', $event)" />
              </div>
              <div class="SurvivorModal__parentInputWrapper">
                <editable-text-input
                  :textValue="survivor.father"
                  placeholder="Father"
                  :textStyle="{ fontSize:'10pt', textOverflow: 'ellipsis' }"
                  :autocompleteList="survivorsInSettlement.map((s) => { return s.name })"
                  @update="update('father', $event)" />
              </div>
            </div>
            <div class="SurvivorModal__children" :class="[themeClass]">
              <div class="SurvivorModal__childrenTitle">
                Children:
              </div>
              <ul class="SurvivorModal__childrenList">
                <li v-for="child in childrenOfSurvivor">{{ child.name }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="SurvivorModal__rowBox rowBox--row6--otherBox" :class="[themeClass]">
          <div class="SurvivorModal__rowTitle rowTitle--row6" :class="[themeClass]">
            <span>Other information:</span>
          </div>
          <textarea class="SurvivorModal__otherTextArea"
            :class="[inHistoryMode ? 'DISABLE-CLICKS-HISTORY-MODE' : '', themeClass]"
            :value="survivor.other"
            @input="update('other', $event.target.value)"></textarea>
        </div>
      </div>
    </div>
    <div slot="footer" style="display: none;"></div>
  </modal>
</template>

<script type="text/javascript">
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
  LockToggle,
  EditableList
} from './GUIComponents'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faCheckSquare, faHome } from '@fortawesome/fontawesome-free-solid'
import { Disorders, FightingArts, Impairments } from '../assets/StaticGameData'
import YeeScoreMixin from '../mixins/YeeScore'
import ThemeClass from '@/mixins/ThemeClass'

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
    ProgressBar,
    EditableList,
    FontAwesomeIcon
  },
  mixins: [YeeScoreMixin, ThemeClass],
  props: {
    survivor: { required: true },
    yeeScore: { required: true }
  },
  computed: {
    ...mapGetters([
      'inHistoryMode',
      'currentSettlement',
      'settlementDepartingCount',
      'survivorsInSettlement'
    ]),
    departIcon: function () {
      if (this.survivor.departing) {
        return faCheckSquare
      } else {
        return faHome
      }
    },
    fightingArtNames: function () {
      return Object.values(FightingArts).map((o) => { return o.name })
    },
    disorderNames: function () {
      return Object.values(Disorders).map((o) => { return o.name })
    },
    impairmentsNames: function () {
      return Object.values(Impairments).map((o) => { return o.name })
    },
    childrenOfSurvivor: function () {
      return this.survivorsInSettlement.filter((s) => {
        return (s.mother && s.mother === this.survivor.name) ||
          (s.father && s.father === this.survivor.name)
      })
    }
  },
  methods: {
    ...mapActions([
      'updateSurvivor'
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
    }
  }
}
</script>

<style lang="scss" scoped>
.SurvivorModal {

  &__row {
    display: flex;
    flex-direction: row;
    background-color: rgba(0, 0, 0, 0) !important;

    &.row {
      &--row1 {}

      &--row2 {
        margin-top: 5px;
      }

      &--row3 {
        margin-top: 10px;
      }

      &--row4 {
        margin-top: 10px;
      }

      &--row5 {
        margin-top: 10px;
      }

      &--row6 {
        margin-top: 10px;
        padding-bottom: 5px;
        border-bottom-width: 3px;
        border-bottom-style: solid;
      }
    }
  }

  &__generalInfo {
    display: flex;
    flex-direction: row;
    min-width: 47%;
    width: 47%;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    background-color: rgba(0, 0, 0, 0) !important;
  }

  &__yeeIcon {
    padding-top: 3px;
    padding-right: 6px;
  }

  &__survivorName {
    width: 100%;
    margin-right: 5px;
  }

  &__sexToggle {
    margin-left: auto;
    margin-top: auto;
    padding-bottom: 7px;
  }

  &__huntXp {
    min-width: 47%;
    width: 47%;
    margin-left: auto;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    background-color: rgba(0, 0, 0, 0) !important;
  }

  &__extraNames {
    display: flex;
    flex-direction: row;
    width: 50%;
    font-size: 10pt;
  }

  &__extraNameInput {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    background-color: rgba(0, 0, 0, 0) !important;

    &.extraNameInput {
      &--nickname {
        width: 60%;
        margin-right: 8px;
      }

      &--surname {
        width: 32%;
      }
    }
  }

  &__aliveBox {
    display: flex;
    flex-direction: row;
    width: 47%;
    margin-left: auto;
  }

  &__aliveLabel {
    padding: 2px 4px 0 0;
    font-size: 9pt;
    line-height: 16pt;

    &.aliveLabel {
      &--birth {
        padding-left: 2px;
      }

      &--death {
        padding-left: 8px;
      }
    }
  }

  &__aliveYearInput {
    width: 2.6em;
    margin-top: 1px;

    &.aliveYearInput {
      &--birth {
        //margin-right: 1px;
      }

      &--death {
        //margin-right: 2px;
      }
    }
  }

  &__deadOrAlive {
    width: 58px;
    margin-right: 2px;
  }

  &__departButtonWrapper {
    padding: 0 0;
  }

  &__departButton {
    margin: 0;
    text-align: center;
    border: none;

    &.green {
      color: $departing;
    }
  }

  &__rowBox {
    border-width: 2px;
    border-style: solid;
    background-color: rgba(0, 0, 0, 0) !important;

    &.rowBox {
      &--row3 {
        &--survival {
          width: 20%;
          min-width: 20%;
        }

        &--stats {
          width: 33%;
          min-width: 33%;
          margin-left: auto;
        }

        &--progress {
          width: 42%;
          min-width: 42%;
          margin-left: auto;
        }
      }

      &--row4 {
        &--armorPoints {
          width: 100%;
          margin: 0 auto;
        }
      }

      &--row5 {
        &--fightingArts {
          width: 25%;
          margin-right: 10px;
          border: none;
        }

        &--disorders {
          width: 20%;
          margin-right: 10px;
          border: none;
        }

        &--abilities {
          width: 30%;
          margin-right: 10px;
          border: none;
        }

        &--impairments {
          width: 22%;
          border: none;
        }
      }

      &--row6 {
        &--familyInfo {
          width: 40%;
          border: none;
        }

        &--otherBox {
          width: 60%;
          border: none;
        }
      }
    }
  }

  &__rowTitle {
    font-family: "PT Sans";
    border-bottom-width: 1px;
    border-bottom-style: solid;
    background-color: rgba(0, 0, 0, 0) !important;

    &.rowTitle {
      &--row3 {
        padding-left: 0.4em;
        padding-top: 1px;

        span {
          font-size: 12pt;
        }
      }

      &--row4 {
        padding-left: 0.2em;
        padding-right: 2px;

        span {
          font-size: 11pt;
          padding-right: 10px;
        }
      }

      &--row5 {
        position: relative;
        padding-left: 2px;
        padding-bottom: 2px;
        border: none;

        &--title {
          font-size: 11pt;
          border: none;
        }

        &--subtitle {
          position: absolute;
          bottom: 2px;
          right: 2px;
          font-size: 9pt;
          font-style: italic;
          border: none;
        }
      }

      &--row6 {
        padding-bottom: 2px;
        border-width: 2px;
        border-style: solid;

        &.family {
          width: 90%;
        }

        span {
          padding-left: 4px;
          font-size: 9pt;
          font-style: italic;
        }
      }
    }
  }

  &__survivalBox {
    display: flex;
    flex-direction: row;
  }

  &__survivalInput {
    padding-left: 4px;
  }

  &__noSurvival {
    text-decoration: line-through;
  }

  &__survivalAbilitiesList {
    margin-top: 8px;
    margin-left: 4px;
  }

  &__survivalAbility {
    padding-top: 2px;
  }

  &__cannotSpendSurvival {
    width: 90%;
    margin: 0 auto;
    padding-top: 4px;
  }

  &__statsGroup {
    display: flex;
    flex-direction: row;
    width: 93%;
    margin: 0 auto;
    padding-top: 12px;
  }

  &__skipHunt {
    float: right;
    padding-top: 2px;
    padding-right: 6px;
  }

  &__progressGroup {
    padding: 4px;
  }

  &__weaponProfGroup {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 6px;
  }

  &__weaponType {
    width: 100%;
    margin-left: 18px;
    border-bottom-width: 1px;
    border-bottom-style: dotted;
    background-color: rgba(0, 0, 0, 0) !important;
  }

  &__weaponTypeText {
    font-size: 9pt;
  }

  &__crgUndRow {
    display: flex;
    flex-direction: row;
  }

  &__understanding {
    margin-left: auto;
  }

  &__skillInputWrapper {
    width: 46%;
    border-bottom-width: 1px;
    border-bottom-style: dotted;
    background-color: rgba(0, 0, 0, 0) !important;

    &.skillInputWrapper {
      &--right {
        margin-left: auto;
      }
    }
  }

  &__hitLocations {
    display: flex;
    flex-direction: row;
  }

  &__armorPointBox {
    display: flex;
    flex-direction: row;
    width: 20%;
    padding-left: 12px;
    padding-right: 6px;
    border-right-width: 1px;
    border-right-style: solid;
    background-color: rgba(0, 0, 0, 0) !important;

    &.armorPointBox {
      &--last {
        border-right: none;
      }
    }
  }

  &__armorImg {
    width: 20px;
    height: 20px;
    margin: auto 6px auto 0;
  }

  &__hpBar {
    height: 18px;
    margin: auto 0;
  }

  &__row5scrollbox {
    min-height: 112px;
    max-height: 112px;
    height: 112px;
    //overflow-y: scroll;
  }

  &__row5scrollWrapper {
    width: 100%;
  }

  &__noFighting {
    text-decoration: line-through;
  }

  &__cannotFight {
    width: 80%;
    padding-top: 10px;
    margin: 0 auto;
  }

  &__familyInfoGroup {
    display: flex;
    flex-direction: row;
    width: 90%;
    height: 99px;
    border-width: 2px;
    border-style: solid;
    border-radius: 0 0 4px 4px;
    border-top: none;
    background-color: rgba(0, 0, 0, 0) !important;
  }

  &__parents,
  &__children {
    width: 50%;
  }

  &__children {
    border-left-width: 1px;
    border-left-style: dotted;
    background-color: rgba(0, 0, 0, 0) !important;
  }

  &__parentsTitle,
  &__childrenTitle {
    padding-top: 4px;
    font-size: 9pt;
    text-align: center;
  }

  &__parentInputWrapper {
    margin: 6px 8px 14px 8px;
    border-bottom-width: 1px;
    border-bottom-style: dotted;
  }

  &__childrenList {
    height: 80%;
    margin: 0;
    padding: 0;
    list-style-type: none;
    text-align: center;
    overflow: auto;

    li {
      font-size: 11pt;
    }
  }

  &__otherTextArea {
    width: 100%;
    height: 100px;
    padding: 6px 6px;
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-radius: 0 0 4px 4px;
    border-top: none;
    resize: none;
    outline: none;
    background-color: rgba(0, 0, 0, 0) !important;
  }
}
</style>
