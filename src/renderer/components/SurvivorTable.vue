<template>
  <div class="SurvivorTable">
    <div class="SurvivorTable__header">
      <div class="SurvivorTable__topButtons">
        <button
          class="SurvivorTable__topButtons__collapse"
          :class="[themeClass]"
          @click="collapsedState = !collapsedState">
            <font-awesome-icon :icon="collapseIcon" />
        </button>
        <dropdown
          :options="['Alive', 'Dead', 'All']"
          :initSelected="filter"
          title="Filter: "
          @selected="filter = $event" />
        <button
          class="SurvivorTable__topButtons__resetDeparting"
          :class="[themeClass]"
          :disabled="inHistoryMode"
          @click="resetDeparting">
            Reset Departing
        </button>
        <button
          class="SurvivorTable__topButtons__add"
          :class="[themeClass]"
          :disabled="inHistoryMode"
          @click="newSurvivor()">
            Add Survivor
        </button>
      </div>
      <div class="SurvivorTable__sortControls" :class="[themeClass]">
        <div class="SurvivorTable__sortControls__title">Sort:</div>
        <button
          class="SurvivorTable__sortControls__sortButton first"
          :class="[sort === 'yeeScore' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('yeeScore', 'number')">
          <span v-if="sort === 'yeeScore'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          Rank
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'name' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('name', 'text')">
          <span v-if="sort === 'name'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          Name
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'sex' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('sex', 'text')">
          <span v-if="sort === 'sex'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          Sex
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'xp' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('xp', 'number')">
          <span v-if="sort === 'xp'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          XP
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'survival' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('survival', 'number')">
          <span v-if="sort === 'survival'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          Survival
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'insanity' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('insanity', 'number')">
          <span v-if="sort === 'insanity'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          Insanity
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'movement' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('movement', 'number')">
          <span v-if="sort === 'movement'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          MOV
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'accuracy' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('accuracy', 'number')">
          <span v-if="sort === 'accuracy'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          ACC
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'strength' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('strength', 'number')">
          <span v-if="sort === 'strength'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          STR
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'evasion' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('evasion', 'number')">
          <span v-if="sort === 'evasion'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          EVA
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'luck' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('luck', 'number')">
          <span v-if="sort === 'luck'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          LCK
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'speed' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('speed', 'number')">
          <span v-if="sort === 'speed'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          SPD
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'weaponProficiencyLevel' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('weaponProficiencyLevel', 'number')">
          <span v-if="sort === 'weaponProficiencyLevel'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          Weapon
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'courage' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('courage', 'number')">
          <span v-if="sort === 'courage'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          CRG
        </button>
        <button
          class="SurvivorTable__sortControls__sortButton"
          :class="[sort === 'understanding' ? 'selectedSort' : '', themeClass]"
          @click="sortBy('understanding', 'number')">
          <span v-if="sort === 'understanding'">
            <font-awesome-icon
              :icon="sortDirectionIcon"
              class="SurvivorTable__sortControls__sortButton__sortDirectionIcon" />
          </span>
          UND
        </button>
      </div>
    </div>
    <div class="SurvivorTable__tableScroll">
      <table>
        <transition-group :name="transitionName" tag="tbody" :class="[modalShowing ? 'no-transition' : '']">
          <tr :key="0" v-if="showDeparted"><th>Departing Survivors:</th></tr>
          <tr v-for="(surv, index) in sortedSurvivors.filter((s) => { return s.departing })"
            :key="surv._id"
            class="SurvivorTable__tableScroll__departingSurvivor">
            <survivor-table-row
              :yeeScore="yeeScore(surv)"
              :survivor="surv"
              :key="surv._id"
              :collapsed="collapsedState"
              :ref="'surv-' + surv._id"
              @modalOpen="modalShowing = true"
              @modalClose="modalShowing = false" />
          </tr>
          <tr :key="1" v-if="showDeparted"><th>Survivors in Settlement:</th></tr>
          <tr v-for="(surv, index) in sortedSurvivors.filter((s) => { return !s.departing })"
            :key="surv._id"
            class="SurvivorTable__tableScroll__survivor">
            <survivor-table-row
              :yeeScore="yeeScore(surv)"
              :survivor="surv"
              :key="surv._id"
              :collapsed="collapsedState"
              :ref="'surv-' + surv._id"
              @modalOpen="modalShowing = true"
              @modalClose="modalShowing = false" />
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState, mapGetters, mapActions } from 'vuex'
import goodnessFunction from '../../db/goodness.js'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import {
  faSortUp,
  faSortDown,
  faCaretSquareUp,
  faCaretSquareDown
} from '@fortawesome/fontawesome-free-solid'
import SurvivorTableRow from './SurvivorTableRow'
import SurvivorModal from './SurvivorModal'
import { Dropdown } from './GUIComponents'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'survivor-table',
  components: { SurvivorTableRow, FontAwesomeIcon, Dropdown, SurvivorModal },
  mixins: [ThemeClass],
  data: function () {
    return {
      collapsedState: true,
      sort: 'yeeScore',
      sortAscending: false,
      filter: 0,
      modalShowing: false
    }
  },
  computed: {
    ...mapState([
      'currentSmt'
    ]),
    ...mapGetters([
      'inHistoryMode',
      'survivorsInSettlement',
      'settlementDepartingCount',
      'currentSettlement'
    ]),
    sortedSurvivors: function () {
      if (this.sort === null) {
        return this.filteredSurvivors
      } else {
        var sorted = this.filteredSurvivors.slice()
        return sorted.sort(this.compareSurvivors(this.sort, this.sortAscending))
      }
    },
    filteredSurvivors: function () {
      if (this.filter === 0) {
        // Living survivors
        return this.survivorsInSettlement.filter((s) => {
          return s.alive
        })
      } else if (this.filter === 1) {
        // Dead
        return this.survivorsInSettlement.filter((s) => {
          return !s.alive
        })
      } else {
        // All
        return this.survivorsInSettlement
      }
    },
    sortDirectionIcon: function () {
      if (this.sortAscending) {
        return faSortUp
      } else {
        return faSortDown
      }
    },
    collapseIcon: function () {
      if (this.collapsedState) {
        return faCaretSquareUp
      } else {
        return faCaretSquareDown
      }
    },
    showDeparted: function () {
      return this.settlementDepartingCount > 0 && this.filter === 0
    },
    transitionName: function () {
      if (this.modalShowing) {
        return 'none'
      } else {
        return 'survivors-rows'
      }
    }
  },
  methods: {
    ...mapActions([
      'addNewSurvivor',
      'updateAllSurvivorsInSettlement'
    ]),
    compareSurvivors: function (sortProp, asc = true) {
      return function (a, b) {
        var varA
        var varB

        if (sortProp === 'yeeScore') {
          varA = goodnessFunction(a)
          varB = goodnessFunction(b)
        } else {
          varA = (typeof a[sortProp] === 'string')
            ? a[sortProp].toUpperCase() : a[sortProp]
          varB = (typeof b[sortProp] === 'string')
            ? b[sortProp].toUpperCase() : b[sortProp]
        }

        let comp = 0
        if (varA === null || varA > varB) {
          comp = 1
        } else if (varB === null || varA < varB) {
          comp = -1
        }

        return (asc ? comp : comp * -1)
      }
    },
    yeeScore: function (surv) {
      return goodnessFunction(surv)
    },
    sortBy: function (val, type) {
      if (this.sort === val) {
        this.sortAscending = !this.sortAscending
      } else {
        this.sort = val
        if (type === 'number') {
          this.sortAscending = false
        } else {
          this.sortAscending = true
        }
      }
    },
    resetDeparting: function () {
      this.updateAllSurvivorsInSettlement({ update: { departing: false } })
    },
    newSurvivor: function () {
      this.filter = 0
      var payload = { smtID: this.currentSmt, birthYear: this.currentSettlement.lanternYear }
      this.addNewSurvivor(payload).then((s) => {
        var newSurv = this.survivorsInSettlement.find((o) => {
          return o._id === s
        })
        var survRef = 'surv-' + newSurv._id
        this.$refs[survRef][0].displayModal()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.SurvivorTable {
  //box-sizing: border-box;
  height: 100%;
  position: relative;

  &__topButtons {
    display: flex;
    flex-direction: row;

    &__collapse, &__resetDeparting {
      margin-right: 5px;
    }

    &__resetDeparting {
      margin-left: auto;
    }
  }

  &__sortControls {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 1.5em;
    font-size: 11pt;
    margin-top: 6px;
    padding: 0 4px;
    overflow-x: scroll;
    z-index: 97;
    border: 1px solid;
    border-radius: 3px;
    box-shadow: 2px 2px 2px rgba(47, 47, 47, 0.67);
    &::-webkit-scrollbar { 
      display: none; 
    }

    &.theme-light {
      border-color: $light-border;
    }

    &.theme-dark {
      border-color: $dark-border;
    }

    &__title {
      margin: auto 0;
      padding-right: 6px;
      padding-bottom: 1px;
      font-size: 9pt;
      font-style: italic;
    }

    &__sortButton {
      display: flex;
      font-weight: normal;
      border: none;
      border-right: 1px solid;
      border-radius: 0;

      &.first {
        border-left: 1px solid;
      }

      &.selectedSort {
        font-weight: bold;
      }

      &__sortDirectionIcon {
        padding-right: 2px;
      }
    }
  }

  &__tableScroll {
    position: absolute;
    bottom: 0;
    top: 55px;
    width: 100%;
    overflow-y: scroll;
    padding-left: 8px;

    table {
      width: 98%;
      border-spacing: 0 0.15em;

      th {
        padding-top: 6px;
      }
    }
  }
}

// Transition styles
.survivors-rows-move {
  transition: transform 0.5s;
}
.survivors-rows-leave-active {
  display: none;
}
</style>
