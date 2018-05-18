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
      <button @click="sortSurvivors()">Yee Sort</button>
    </div>
    <div class="table-scroll">
      <table>
        <tr v-for="(surv, index) in survivorsInSettlement"><survivor-table-row :yeeScore="survivorsInSettlementGScores[index]" :survivor="surv" :key='surv._id' :collapsed="collapsedState"></survivor-table-row></tr>
      </table>
    </div>
  </div>
</template>

<script>
import SurvivorTableRow from './SurvivorTableRow'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'survivor-table',
  components: { SurvivorTableRow },
  data: function () {
    return {
      collapsedState: true
    }
  },
  computed: {
    ...mapState([
      'currentSmt'
    ]),
    ...mapGetters([
      'survivorsInSettlement',
      'survivorsInSettlementGScores'
    ])
  },
  methods: {
    ...mapActions([
      'dropAllSurvivors',
      'addNewSurvivor'
    ]),
    sortSurvivors: function () {
      // sorts this.survivors by measure
      // TODO: allow more than goodness
      console.log('TODO -- sort broken since vuex transition')
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
  height: 580px;
  overflow-y: scroll;
  padding-left: 8px;
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
