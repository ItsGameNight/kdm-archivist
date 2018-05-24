<template>
  <div>
    <div v-if="appState === 0" id="welcome">
      <welcome-screen @play="play" />
    </div>
    <div id="kdm-app" v-if="appState === 1">
      <settlement-inspector id="inspector" />
      <div id="content" @click="notesOpen = false">
        <div class="tabbar">
          <button
            class="tab-button"
            @click="appState = 0">
            <font-awesome-icon :icon="homeIcon" />
          </button>
          <button
            class="tab-button"
            :class="{'tab-selected' : currentTab === 'timeline'}"
            @click="currentTab = 'timeline'">
              Timeline
          </button>
          <button
            class="tab-button"
            :class="{'tab-selected' : currentTab === 'survivors'}"
            @click="currentTab = 'survivors'">
              Survivors
          </button>
          <button
            class="tab-button"
            :class="{'tab-selected' : currentTab === 'storage'}"
            @click="currentTab = 'storage'">
              Storage
          </button>
        </div>
        <div v-if="currentTab === 'timeline'" class="tab-timeline">
          <settlement-timeline />
        </div>
        <div v-if="currentTab === 'survivors'" class="tab-survivors">
          <survivor-table id="survivor-table" />
          <button @click="createSnapshot(currentSmt)">Create Snapshot</button>
          <button @click="setCurrentSnap(null)">Leave Snapshot Mode</button>
          <br>
          <button
            v-for="snap in snapshotsForCurrentSettlement"
            @click="setCurrentSnap(snap._id)">
            {{ snap.settlement.name }} at LY {{ snap.settlement.lanternYear }}
          </button>
        </div>
        <div v-if="currentTab === 'storage'" class="tab-storage">
          <settlement-storage />
        </div>
        <div v-if="currentTab === 'notes'" class="notes-tab">
          <notes-tab/>
        </div>
      </div>
      <button
        class="notes-button"
        @click="notesOpen = !notesOpen">
        <font-awesome-icon v-if="!notesOpen" :icon="bookIcon" />
        <font-awesome-icon v-else :icon="closeIcon" />
      </button>
      <transition name="slide">
        <notes-tab v-if="notesOpen"/>
      </transition>
    </div>
  </div>
</template>

<script>
import WelcomeScreen from './WelcomeScreen'
import SurvivorTable from './SurvivorTable'
import SettlementInspector from './SettlementInspector'
import SettlementStorage from './Storage'
import SettlementTimeline from './Timeline'
import NotesTab from './NotesTab'
import { mapState, mapGetters, mapActions } from 'vuex'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faHome, faWindowClose, faBook } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'kdm-app',
  components: {
    WelcomeScreen,
    SurvivorTable,
    SettlementInspector,
    FontAwesomeIcon,
    SettlementStorage,
    SettlementTimeline,
    NotesTab
  },
  data: function () {
    return {
      appState: 0,
      currentTab: 'survivors',
      notesOpen: false
    }
  },
  computed: {
    ...mapState(['currentSmt']),
    ...mapGetters(['snapshotsForCurrentSettlement']),
    homeIcon: function () {
      return faHome
    },
    bookIcon: function () {
      return faBook
    },
    closeIcon: function () {
      return faWindowClose
    }
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
.flex-wrapper {
  display: flex;
  flex-direction: row;
}
#kdm-app {
  height: 600px;
  min-height: 600px;
  max-height: 600px;
  display: flex;
  flex-direction: row;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(214,214,214,1) 44%, rgba(255,255,255,1) 100%);
}
#welcome {
  width: 100%;
}
#inspector {
  width: 20%;
  height: auto;
  padding: 1.5%;
  margin-right: 2%;
  border-right: 1px solid black;
  background-color: white;
}
#content {
  width: 70%;
}
#note-panel {
  width: 5%;
  margin-left: 2%;
  border-left: 1px solid black;
  background-color: white;
}
div.tabbar {
  border-bottom: 2px solid black;
  margin: 4px 0 10px 0;
}
button.tab-button {
  outline: none;
  background-color: white;
  border: 2px solid black;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  font-size: 12pt;
}
button.tab-button:hover {
  background-color: #ccc;
}
button.tab-button:active {
  background-color: black;
  color: white;
}
button.tab-button.tab-selected {
  background-color: black;
  color: white;
}
button.notes-button {
  background-color: white;
  border: 2px solid black;
  width: 30px;
  height: 30px;
  float: right;
  position: absolute;
  right: 1.5%;
  z-index: 99;
  border-radius: 4px;
  outline: none;
}
.slide-enter-active {
  transition: all .5s ease;
}
.slide-leave-active {
  transition: all .5s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(300px);
}
</style>
