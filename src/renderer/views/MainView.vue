<template>
  <div class="MainView" :class="[themeClass]">
    <settlement-inspector class="MainView__settlementInspector" :class="[themeClass]" ref="setInsp" />
    <div class="MainView__content" @click="notesOpen = false">
      <div class="MainView__tabBar" :class="[themeClass]">
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
        <button
          class="MainView__tabButton tabButton--right"
          :class="[themeClass]"
          @click="leaveHistoryMode(); $router.push({ name: 'welcome' })">
            <font-awesome-icon :icon="homeIcon" />
        </button>
        <button
          class="MainView__tabButton tabButton--right"
          :class="[themeClass]"
          @click="leaveHistoryMode(); $router.push({ name: 'settings' })">
            <font-awesome-icon :icon="settingsIcon" />
        </button>
      </div>
      <div v-if="currentTab === 'timeline'" class="MainView__tab tab--timeline">
        <settlement-timeline />
      </div>
      <div v-if="currentTab === 'survivors'" class="MainView__tab tab--survivors">
        <survivor-table class="MainView__survivorTable" ref="survivorTable" />
      </div>
      <div v-if="currentTab === 'storage'" class="MainView__tab tab--storage">
        <settlement-storage />
      </div>
    </div>
    <button
      class="MainView__notesButton"
      :class="[themeClass, notesOpen ? 'notesOpen' : '']"
      @click="notesOpen = !notesOpen">
      <font-awesome-icon v-if="!notesOpen" :icon="bookIcon" />
      <font-awesome-icon v-else :icon="closeIcon" />
    </button>
    <transition name="slide">
      <notes-tab v-if="notesOpen"/>
    </transition>
    <assistant
      :initStep="currentSettlement.currentStep"
      @stepChanged="setStep($event)" />
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
import Assistant from '@/components/Assistant'
import ThemeClass from '@/mixins/ThemeClass'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faPowerOff, faCog, faWindowClose, faBook } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'main-view',
  components: {
    SurvivorTable,
    SettlementInspector,
    FontAwesomeIcon,
    SettlementStorage,
    SettlementTimeline,
    NotesTab,
    Assistant
  },
  mixins: [ThemeClass],
  data: function () {
    return {
      currentTab: 'survivors',
      notesOpen: false
    }
  },
  mounted: function () {
    this.layoutForStep(-1, this.currentSettlement.currentStep)
  },
  computed: {
    ...mapState(['currentSmt']),
    ...mapGetters([
      'inHistoryMode',
      'currentSettlement']),
    homeIcon: function () {
      return faPowerOff
    },
    settingsIcon: function () {
      return faCog
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
      'leaveHistoryMode',
      'updateSettlement']),
    setStep: function (payload) {
      this.updateSettlement({ id: this.currentSettlement._id, update: { currentStep: payload.step } })
      this.layoutForStep(payload.prevStep, payload.step)
    },
    layoutForStep: function (prevStep, step) {
      // Undo prevStep setup
      switch (prevStep) {
        // Set up
        case 0:
          break
        // Survivors Return
        case 1:
          this.$refs.survivorTable.setDepartingCollapseState(true)
          break
        // Gain endeavors
        case 2:
          break
        // Update Timeline
        case 3:
          break
        // Check Milestones
        case 4:
          break
        // Develop
        case 5:
          break
        // Prepare Departing Survivors
        case 6:
          break
        // Special Showdown
        case 7:
          break
        // Record & Archive Resources
        case 8:
          break
        // End Settlement Phase/Depart!
        case 9:
          break
        default:
          break
      }
      // Set up for step
      switch (step) {
        // Set up
        case 0:
          this.currentTab = 'survivors'
          this.$refs.setInsp.setSectionToggleState(['stats', 'milestones', 'quarries', 'nemeses', 'research', 'lost'], true)
          this.$refs.setInsp.setSectionToggleState(['principles', 'innovations', 'locations'], false)
          break
        // Survivors Return
        case 1:
          this.currentTab = 'survivors'
          this.$refs.survivorTable.setDepartingCollapseState(false)
          break
        // Gain endeavors
        case 2:
          break
        // Update Timeline
        case 3:
          this.currentTab = 'timeline'
          break
        // Check Milestones
        case 4:
          this.$refs.setInsp.setSectionToggleState(['stats', 'milestones'], false)
          break
        // Develop
        case 5:
          this.currentTab = 'storage'
          break
        // Prepare Departing Survivors
        case 6:
          this.currentTab = 'survivors'
          this.$refs.setInsp.setSectionToggleState(['quarries', 'nemeses'], false)
          this.$refs.setInsp.setSectionToggleState(['milestones', 'principles', 'innovations', 'locations'], true)
          break
        // Special Showdown
        case 7:
          break
        // Record & Archive Resources
        case 8:
          this.currentTab = 'storage'
          break
        // End Settlement Phase/Depart!
        case 9:
          this.currentTab = 'survivors'
          break
        default:
          break
      }
    }
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
    width: 23%;
    height: 100%;
    padding: 10px 20px 10px 15px;
    margin-right: 15px;
    border-right: 4px solid;

    &.theme-light {
      border-right-color: $light-bg-alt;
      background-color: $light-bg-alt;
    }

    &.theme-dark {
      border-right-color: $dark-border;
      background-color: $dark-bg-alt;
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

    &.tabButton {
      &--right {
        float: right;
        margin-left: 4px;
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
    right: -70px;
    top: 0;
    bottom: 0;
    width: 100px;
    text-align: left;
    z-index: 97;
    border: none;
    border-radius: 0;
    border-left: 1px solid;
    transition: all .5s ease;

    &.theme-light {
      background-color: $light-highlight;
    }

    &.notesOpen {
      right: 200px;
    }
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
