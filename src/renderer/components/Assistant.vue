<template>
  <div class="Assistant" :class="[tipTextVisible ? 'shiftLeft' : '']">
    <div
      class="Assistant__stepList"
      v-if="stepListVisible"
      :class="[tipTextVisible ? 'shiftLeft' : '', themeClass]">
      <ul>
        <li v-for="(step, index) in steps"
          :class="[themeClass, dropdownItem, (index === currentStepIndex) ? 'selected' : '']"
          @click="currentStepIndex=index; stepListVisible=false">
          {{ index + 1 }}. {{ step.title }}
        </li>
      </ul>
    </div>
    <div
      class="Assistant__floating"
      :class="[tipTextVisible ? 'shiftLeft' : '', themeClass, hoverHighlight]">
      <button
        class="Assistant__showTipButton"
        :class="[tipTextVisible ? 'shiftLeft' : '', themeClass]"
        @click="tipTextVisible = !tipTextVisible">
          <font-awesome-icon :icon="expandIcon" />
      </button>
      <button
        class="Assistant__currentStep"
        :class="[tipTextVisible ? 'shiftLeft' : '', themeClass]"
        @click="stepListVisible = !stepListVisible">
        {{ currentStepIndex + 1 }}. {{ currentStep.title }}
      </button>
      <transition name="slide">
        <div
          v-if="tipTextVisible"
          class="Assistant__tipText"
          :class="[themeClass]">
          <pre>{{ currentStep.tipText }}</pre>
        </div>
      </transition>
      <button
        class="Assistant__circleButton"
        :class="[themeClass]"
        @click="nextStep()">
          <font-awesome-icon :icon="nextIcon" />
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faArrowRight, faCaretLeft, faCaretRight } from '@fortawesome/fontawesome-free-solid'
import ThemeClass from '@/mixins/ThemeClass'
import SettlementPhase from '@/assets/StaticGameData/SettlementPhaseSteps'

export default {
  name: 'assistant',
  mixins: [ThemeClass],
  components: { FontAwesomeIcon },
  data: function () {
    return {
      stepListVisible: false,
      tipTextVisible: false,
      currentStepIndex: 0
    }
  },
  computed: {
    nextIcon: function () {
      return faArrowRight
    },
    expandIcon: function () {
      if (this.tipTextVisible) {
        return faCaretRight
      } else {
        return faCaretLeft
      }
    },
    steps: function () {
      return SettlementPhase.steps
    },
    currentStep: function () {
      return SettlementPhase.steps[this.currentStepIndex]
    }
  },
  methods: {
    nextStep: function () {
      this.currentStepIndex = (this.currentStepIndex + 1) % SettlementPhase.steps.length
      if (!this.tipTextVisible) {
        this.tipTextVisible = true
        setTimeout(() => {
          this.tipTextVisible = false
        }, 2500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Assistant {
  position: absolute;
  bottom: 20px;
  right: 40px;
  z-index: 1001;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover,
  &.shiftLeft {
    opacity: 1.0;
  }

  &__stepList {
    position: absolute;
    bottom: 45px;
    right: 23px;
    height: 205px;
    width: 175px;
    border-width: 1px;
    border-style: solid;
    box-sizing: border-box;
    transition: right 0.4s ease;

    &.shiftLeft {
      right: 423px;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      max-height: 200px;
      overflow: auto;

      li {
        padding: 8px 6px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        cursor: default;
      }
    }
  }

  &__floating {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 50px;
    width: 210px;
    border-radius: 4px 25px 25px 4px;
    transition: width 0.4s ease;
    overflow: hidden;

    &.shiftLeft {
      width: 610px;
    }
  }

  &__showTipButton {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 12px;
    padding-left: 2px;
    padding-right: 12px;
    border-width: 2px;
  }

  &__currentStep {
    position: absolute;
    bottom: 0;
    left: 12px;
    height: 50px;
    width: 175px;
    text-align: left;
    border-width: 2px;
    border-style: solid;
    border-radius: 0;
  }

  &__tipText {
    position: absolute;
    bottom: 0;
    right: 25px;
    height: 50px;
    width: 400px;
    padding: 4px;
    font-size: 10pt;
    border-width: 2px;
    border-style: solid;
    box-sizing: border-box;

    pre {
      margin: 0;
    }
  }

  &__circleButton {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 50px;
    width: 50px;
    font-size: 16pt;
    border-radius: 50%;
    border-width: 2px;
  }
}

// Transition styles
.slide-enter-active {
  transition: all .4s ease;
}
.slide-leave-active {
  transition: all .4s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(400px);
}
</style>