<template>
  <div>
    <div class="buttons-wrapper">
      <button @click="collapsedState = !collapsedState" class="collapse-button">
        <font-awesome-icon :icon="collapseIcon" />
      </button>
      <dropdown
        :options="['Alive', 'Dead', 'All']"
        :initSelected="filter"
        title="Filter: "
        @selected="filter = $event" />
      <button @click="resetDeparting" class="reset-departing-button right-start">Reset Departing</button>
      <button @click="newSurvivor()" class="add-button">Add Survivor</button>
    </div>
    <div class="sort-controls flex-wrapper">
      <div class="sort-title">Sort:</div>
      <button
        class="sort-button first"
        :class="[sort === 'yeeScore' ? 'selected-sort' : '']"
        @click="sortBy('yeeScore', 'number')">
        <span v-if="sort === 'yeeScore'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        Rank
      </button>
      <button
        class="sort-button"
        :class="[sort === 'name' ? 'selected-sort' : '']"
        @click="sortBy('name', 'text')">
        <span v-if="sort === 'name'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        Name
      </button>
      <button
        class="sort-button"
        :class="[sort === 'sex' ? 'selected-sort' : '']"
        @click="sortBy('sex', 'text')">
        <span v-if="sort === 'sex'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        Sex
      </button>
      <button
        class="sort-button"
        :class="[sort === 'xp' ? 'selected-sort' : '']"
        @click="sortBy('xp', 'number')">
        <span v-if="sort === 'xp'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        XP
      </button>
      <button
        class="sort-button"
        :class="[sort === 'survival' ? 'selected-sort' : '']"
        @click="sortBy('survival', 'number')">
        <span v-if="sort === 'survival'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        Survival
      </button>
      <button
        class="sort-button"
        :class="[sort === 'insanity' ? 'selected-sort' : '']"
        @click="sortBy('insanity', 'number')">
        <span v-if="sort === 'insanity'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        Insanity
      </button>
      <button
        class="sort-button"
        :class="[sort === 'movement' ? 'selected-sort' : '']"
        @click="sortBy('movement', 'number')">
        <span v-if="sort === 'movement'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        MOV
      </button>
      <button
        class="sort-button"
        :class="[sort === 'accuracy' ? 'selected-sort' : '']"
        @click="sortBy('accuracy', 'number')">
        <span v-if="sort === 'accuracy'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        ACC
      </button>
      <button
        class="sort-button"
        :class="[sort === 'strength' ? 'selected-sort' : '']"
        @click="sortBy('strength', 'number')">
        <span v-if="sort === 'strength'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        STR
      </button>
      <button
        class="sort-button"
        :class="[sort === 'evasion' ? 'selected-sort' : '']"
        @click="sortBy('evasion', 'number')">
        <span v-if="sort === 'evasion'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        EVA
      </button>
      <button
        class="sort-button"
        :class="[sort === 'luck' ? 'selected-sort' : '']"
        @click="sortBy('luck', 'number')">
        <span v-if="sort === 'luck'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        LCK
      </button>
      <button
        class="sort-button"
        :class="[sort === 'speed' ? 'selected-sort' : '']"
        @click="sortBy('speed', 'number')">
        <span v-if="sort === 'speed'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        SPD
      </button>
      <button
        class="sort-button"
        :class="[sort === 'weaponProficiencyLevel' ? 'selected-sort' : '']"
        @click="sortBy('weaponProficiencyLevel', 'number')">
        <span v-if="sort === 'weaponProficiencyLevel'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        Weapon
      </button>
      <button
        class="sort-button"
        :class="[sort === 'courage' ? 'selected-sort' : '']"
        @click="sortBy('courage', 'number')">
        <span v-if="sort === 'courage'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        CRG
      </button>
      <button
        class="sort-button"
        :class="[sort === 'understanding' ? 'selected-sort' : '']"
        @click="sortBy('understanding', 'number')">
        <span v-if="sort === 'understanding'">
          <font-awesome-icon
            :icon="sortDirectionIcon"
            class="sort-direction-icon" />
        </span>
        UND
      </button>
    </div>
    <div class="table-scroll">
      <table>
        <transition-group :name="transitionName" tag="tbody" :class="[modalShowing ? 'no-transition' : '']">
          <tr :key="0" v-if="showDeparted"><th>Departing Survivors:</th></tr>
          <tr v-for="(surv, index) in sortedSurvivors.filter((s) => { return s.departing })"
            :key="surv._id"
            class="departing-survivors">
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
          <tr v-for="(surv, index) in sortedSurvivors.filter((s) => { return !s.departing })" :key="surv._id">
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

<script>
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

export default {
  name: 'survivor-table',
  components: { SurvivorTableRow, FontAwesomeIcon, Dropdown, SurvivorModal },
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

<style scoped>
table {
  width: 98%;
  border-spacing: 0em 0.15em;
}
th {
  padding-top: 6px;
}
.table-scroll {
  height: 560px;
  overflow-y: scroll;
  padding-left: 8px;
}
div.buttons-wrapper {
  display: flex;
  flex-direction: row;
}
div.buttons-wrapper button {
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  font-size: 10pt;
  font-weight: bold;
  outline: none;
}
div.buttons-wrapper button:hover {
  background-color: #ccc;
}
div.buttons-wrapper button:active {
  background-color: black;
  color: white;
}
div.buttons-wrapper .right-start {
  margin-left: auto;
}
div.buttons-wrapper .reset-departing-button,
div.buttons-wrapper .collapse-button {
  margin-right: 5px;
}
div.sort-controls {
  border: 1px solid black;
  border-radius: 3px;
  background-color: white;
  padding: 0 4px;
  margin-top: 6px;
  box-shadow: 2px 2px 2px rgba(47, 47, 47, 0.67);
  font-size: 11pt;
  height: 1.5em;
  overflow-x: scroll;
  z-index: 99;
  position: relative;
}
div.sort-title {
  margin: auto 0;
  padding-right: 6px;
  padding-bottom: 1px;
  font-family: system-ui;
  font-size: 9pt;
  font-style: oblique;
}
button.sort-button {
  display: flex;
  background-color: white;
  outline: none;
  border: none;
  border-right: 1px solid black;
}
button.sort-button.first {
  border-left: 1px solid black;
}
button.sort-button:hover {
  background-color: #ccc;
}
button.sort-button:active {
  background-color: black;
  color: white;
}
.selected-sort {
  font-weight: bold;
}
.sort-direction-icon {
  padding-right: 2px;
}
.survivors-rows-move {
  transition: transform 0.5s;
}
.survivors-rows-leave-active {
  display: none;
}
</style>
