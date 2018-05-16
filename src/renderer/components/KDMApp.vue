<template>
  <div>
    <div v-if="appState === 0" id="welcome">
      <welcome-screen @play="play"></welcome-screen>
    </div>
    <div id="kdm-app" v-if="appState === 1">
      <settlement-inspector id="inspector"></settlement-inspector>
      <div id="content">
        <span>|NAV| |BAR| |HERE|</span>
        <survivor-table id="survivor-table"></survivor-table>
        <button @click="createSnapshot(currentSmt)">Create Snapshot</button>
        <button @click="setCurrentSnap(null)">Leave Snapshot Mode</button>
        <br>
        <button v-for="snap in snapshotsForCurrentSettlement" @click="setCurrentSnap(snap._id)">
          {{ snap.settlement.name }} at LY {{ snap.settlement.lanternYear }}
        </button>
      </div>
      <div id="note-panel">
        <span style="font-weight: bold">Notes:</span>
        <note-panel></note-panel>
      </div>
    </div>
  </div>
</template>

<script>
import WelcomeScreen from './WelcomeScreen'
import SurvivorTable from './SurvivorTable'
import SettlementInspector from './SettlementInspector'
import NotePanel from './NotePanel'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'kdm-app',
  components: { WelcomeScreen, SurvivorTable, SettlementInspector, NotePanel },
  data: function () {
    return {
      appState: 0
    }
  },
  computed: {
    ...mapState(['currentSmt']),
    ...mapGetters(['snapshotsForCurrentSettlement'])
  },
  methods: {
    ...mapActions([
      'createSnapshot',
      'setCurrentSnap'
    ]),
    play: function () {
      if (this.currentSmt !== null) {
        this.appState = 1
      } else {
        alert('Please select a settlement.')
      }
    }
  },
  mounted: function () {
    // load all db's
    this.$store.dispatch('loadSettlements')
    this.$store.dispatch('loadSurvivors')
    this.$store.dispatch('loadSnapshots')
  }
}
</script>

<style>
#kdm-app {
  height: 600px;
  min-height: 600px;
  max-height: 600px;
  display: flex;
  flex-direction: row;
}
#welcome {
  width: 100%;
}
#inspector {
  width: 15%;
  height: auto;
  padding: 1.5%;
  margin-right: 2%;
  border: 1px solid black;
}
#content {
  width: 60%;
}
#note-panel {
  width: 15%;
  margin-left: 2%;
  border: 1px solid black;
}
</style>
