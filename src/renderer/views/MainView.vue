<template>
  <div>
    <div id="kdm-app">
      <settlement-inspector id="inspector" />
      <div id="content" @click="notesOpen = false">
        <div class="tabbar">
          <button
            class="tab-button"
            @click="leaveHistoryMode(); $router.push({ name: 'welcome' })">
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
        </div>
        <div v-if="currentTab === 'storage'" class="tab-storage">
          <settlement-storage />
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
      <div
        v-if="inHistoryMode"
        class="history-bar"
        @click="leaveHistoryMode" >
        You are in <strong>History Mode</strong>! Click this banner to exit, otherwise, look around!
      </div>
      <div v-if="inHistoryMode" class="history-dimmer"></div>
    </div>
  </div>
</template>

<script>
import SurvivorTable from '@/components/SurvivorTable'
import SettlementInspector from '@/components/SettlementInspector'
import SettlementStorage from '@/components/Storage'
import SettlementTimeline from '@/components/Timeline'
import NotesTab from '@/components/NotesTab'
import { mapState, mapActions, mapGetters } from 'vuex'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faHome, faWindowClose, faBook } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'main-view',
  components: {
    SurvivorTable,
    SettlementInspector,
    FontAwesomeIcon,
    SettlementStorage,
    SettlementTimeline,
    NotesTab
  },
  data: function () {
    return {
      currentTab: 'survivors',
      notesOpen: false
    }
  },
  computed: {
    ...mapState(['currentSmt']),
    ...mapGetters(['inHistoryMode']),
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
    ...mapActions(['leaveHistoryMode'])
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
div.history-bar {
  background-color: gray;
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 36px;
  text-align: center;
  color: white;
  line-height: 36px;
  user-select: none;
  cursor: default;
  z-index: 1000;
}
div.history-dimmer {
  background-color: #A9A9A9;
  opacity: .4;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;  /* send clicks thru */
}
</style>
