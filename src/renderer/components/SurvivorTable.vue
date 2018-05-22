<template>
  <div>
    <div class="collapse-toggle">
      <span>Collapsed:</span>
      <label class="switch">
        <input type="checkbox" v-model="collapsedState">
        <span class="slider"></span>
      </label>
    </div>
    <div>
      <button @click="addNewSurvivor(currentSmt)">Add Base Survivor</button>
      <button @click="dropAllSurvivors()">Drop All</button>
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
        Yee
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
        <tr v-for="(surv, index) in sortedSurvivors">
          <survivor-table-row
            :yeeScore="yeeScore(surv)"
            :survivor="surv"
            :key='surv._id'
            :collapsed="collapsedState" />
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import goodnessFunction from '../../db/goodness.js'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/fontawesome-free-solid'
import SurvivorTableRow from './SurvivorTableRow'

export default {
  name: 'survivor-table',
  components: { SurvivorTableRow, FontAwesomeIcon },
  data: function () {
    return {
      collapsedState: true,
      sort: 'yeeScore',
      sortAscending: false
    }
  },
  computed: {
    ...mapState([
      'currentSmt'
    ]),
    ...mapGetters([
      'survivorsInSettlement'
    ]),
    sortedSurvivors: function () {
      if (this.sort === null) {
        return this.survivorsInSettlement
      } else {
        var sorted = this.survivorsInSettlement.slice()
        return sorted.sort(this.compareSurvivors(this.sort, this.sortAscending))
      }
    },
    sortDirectionIcon: function () {
      if (this.sortAscending) {
        return faSortUp
      } else {
        return faSortDown
      }
    }
  },
  methods: {
    ...mapActions([
      'dropAllSurvivors',
      'addNewSurvivor'
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
    }
  }
}
</script>

<style>
table {
  width: 98%;
  border-spacing: 0em 0.15em;
}
.table-scroll {
  height: 560px;
  overflow-y: scroll;
  padding-left: 8px;
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
  font-family: system-ui;
  font-size: 10pt;
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
.switch {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 12px;
}
.switch input {
  display: none;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(8px);
  transform: translateX(8px);
}
</style>
