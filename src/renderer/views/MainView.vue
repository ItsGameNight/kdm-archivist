<template>
  <div class="MainView">
    <settlement-inspector class="MainView__settlementInspector" :class="[themeClass]" />
    <div class="MainView__content" @click="notesOpen = false">
      <div class="MainView__tabBar" :class="[themeClass]">
        <button
          class="MainView__tabButton"
          :class="[themeClass]"
          @click="leaveHistoryMode(); $router.push({ name: 'welcome' })">
          <font-awesome-icon :icon="homeIcon" />
        </button>
        <button
          class="MainView__tabButton"
          :class="[{'tabSelected' : currentTab === 'timeline'}, themeClass]"
          @click="currentTab = 'timeline'">
            Timeline
        </button>
        <button
          class="MainView__tabButton"
          :class="[{'tabSelected' : currentTab === 'survivors'}, themeClass]"
          @click="currentTab = 'survivors'">
            Survivors
        </button>
        <button
          class="MainView__tabButton"
          :class="[{'tabSelected' : currentTab === 'storage'}, themeClass]"
          @click="currentTab = 'storage'">
            Storage
        </button>
      </div>
      <div v-if="currentTab === 'timeline'" class="MainView__tab tab--timeline">
        <settlement-timeline />
      </div>
      <div v-if="currentTab === 'survivors'" class="MainView__tab tab--survivors">
        <survivor-table class="MainView__survivorTable" />
      </div>
      <div v-if="currentTab === 'storage'" class="MainView__tab tab--storage">
        <settlement-storage />
      </div>
    </div>
    <button
      class="MainView__notesButton"
      :class="[themeClass]"
      @click="notesOpen = !notesOpen">
      <font-awesome-icon v-if="!notesOpen" :icon="bookIcon" />
      <font-awesome-icon v-else :icon="closeIcon" />
    </button>
    <transition name="slide">
      <notes-tab v-if="notesOpen"/>
    </transition>
    <div
      v-if="inHistoryMode"
      class="MainView__historyBar"
      @click="leaveHistoryMode" >
      You are in <strong>History Mode</strong>! Click this banner to exit, otherwise, look around!
    </div>
    <div v-if="inHistoryMode" class="MainView__historyDimmer"></div>
  </div>
</template>

<script type="text/javascript">
import { mapState, mapActions, mapGetters } from 'vuex'
import SurvivorTable from '@/components/SurvivorTable'
import SettlementInspector from '@/components/SettlementInspector'
import SettlementStorage from '@/components/Storage'
import SettlementTimeline from '@/components/Timeline'
import NotesTab from '@/components/NotesTab'
import ThemeClass from '@/mixins/ThemeClass'

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
  mixins: [ThemeClass],
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

<style lang="scss" scoped>
.MainView {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  min-height: 600px;
  height: 100%;
  overflow: hidden;

  &__settlementInspector {
    box-sizing: border-box;
    width: 22%;
    height: 100%;
    padding: 10px;
    margin-right: 15px;

    &.theme-light {
      border-right: 1px solid $light-border;
      background-color: $light-bg;
    }

    &.theme-dark {
      border-right: 1px solid $dark-border;
      background-color: $dark-bg;
    }
  }

  &__content {
    box-sizing: border-box;
    width: 70%;
    height: 100%;
  }

  &__tabBar {
    margin: 8px 0 10px 0;

    &.theme-light {
      border-bottom: 2px solid $light-border;
    }

    &.theme-dark {
      border-bottom: 2px solid $dark-border;
    }
  }

  &__tabButton {
    font-size: 12pt;
    border-width: 2px;
    border-radius: 4px 4px 0 0;
    border-bottom: none;

    &.theme-light {
      &.tabSelected {
        background-color: $light-text;
        color: $light-bg;
      }
    }

    &.theme-dark {
      &.tabSelected {
        background-color: $dark-text;
        color: $dark-bg;
      }
    }
  }

  &__tab {
    position: absolute;
    bottom: 5px;
    top: 45px;
    width: 70%;
  }

  &__notesButton {
    position: absolute;
    right: 1.5%;
    top: 4px;
    width: 30px;
    height: 30px;
    z-index: 99;
    border-width: 2px;
    border-radius: 4px;
  }

  &__historyBar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 36px;
    text-align: center;
    line-height: 36px;
    z-index: 1000;
    color: white;
    background-color: gray;
  }

  &__historyDimmer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: #a9a9a9;
    opacity: 0.4;
    pointer-events: none;
  }
}

// Transition styles
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
