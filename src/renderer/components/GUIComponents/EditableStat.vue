<template>
  <div
    class="EditableStat"
    :class="[inHistoryMode ? 'DISABLE-CLICKS-HISTORY-MODE' : '', themeClass]">
    <div
      class="EditableStat__incrementBox"
      @mouseover="hover = true"
      @mouseleave="hover = false">
      <div class="EditableStat__chevron chevron--top" :class="[limitBox ? 'limit' : '']">
        <font-awesome-icon
          :icon="chevronUp"
          :class="[topBounce ? 'animated bounce' : '']"
          :style="chevronStyle"
          @mousedown="updateStat(statValue + 1); bounceTop()" />
      </div>
      <div :class="{ 'EditableStat__maxbox' : limitBox }">
        <input
          class="EditableStat__statbox"
          type="number"
          :class="[limitBox ? 'statbox--limit' : '', noBorder ? 'statbox--borderless' : '', themeClass]"
          :value="statValue"
          @input="updateStat($event.target.value)"
          @focus="$event.target.select(); focus = true"
          @blur="focus = false"
          @keydown.enter="$event.target.blur()" />
        <span v-if="limitBox" class="EditableStat__limitbox" :class="[themeClass]">
          <div class="EditableStat__limitLabel">Limit</div>
          {{ maxValue }}
        </span>
      </div>
      <div
        v-if="statDisplayName"
        class="EditableStat__displayName"
        :style="displayNameStyle">
          {{ statDisplayName }}
      </div>
      <div
        class="EditableStat__chevron chevron--bottom"
        :class="[statDisplayName ? 'withDisplayName' : '', limitBox ? 'limit' : '']">
        <font-awesome-icon
          :icon="chevronDown"
          :class="[bottomBounce ? 'animated bounceDown' : '']"
          :style="chevronStyle" 
          @mousedown="updateStat(statValue - 1); bounceBottom()" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/fontawesome-free-solid'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'editable-stat',
  components: { FontAwesomeIcon },
  mixins: [ThemeClass],
  props: {
    statDisplayName: { required: false },
    initValue: { required: true },
    maxValue: { required: false, default: null },
    minValue: { required: false, default: null },
    noBorder: { required: false, default: false, type: Boolean },
    limitBox: { required: false, default: false, type: Boolean }
  },
  data: function () {
    return {
      statValue: Number(this.initValue),
      hover: false,
      focus: false,
      topBounce: false,
      bottomBounce: false
    }
  },
  watch: {
    initValue: function (newVal) {
      this.statValue = Number(newVal)
    }
  },
  computed: {
    ...mapGetters(['inHistoryMode']),
    chevronUp: function () {
      return faChevronUp
    },
    chevronDown: function () {
      return faChevronDown
    },
    chevronStyle: function () {
      if (this.hover || this.focus) {
        return { visibility: 'visible' }
      } else {
        return { visibility: 'hidden' }
      }
    },
    displayNameStyle: function () {
      if (this.hover || this.focus) {
        return { visibility: 'hidden' }
      } else {
        return { visibility: 'visible' }
      }
    }
  },
  methods: {
    updateStat: function (val) {
      if ((this.maxValue === null || val <= this.maxValue) &&
        (this.minValue === null || val >= this.minValue)) {
        if (val === '' || val === null || isNaN(val)) {
          val = 0
        }
        this.statValue = Number(val)
        this.$emit('update', val)
      }
    },
    bounceTop: function () {
      this.topBounce = true
      setTimeout(() => {
        this.topBounce = false
      }, 120)
    },
    bounceBottom: function () {
      this.bottomBounce = true
      setTimeout(() => {
        this.bottomBounce = false
      }, 120)
    }
  }
}
</script>

<style lang="scss" scoped>
.EditableStat {
  display: block;
  padding: 0 0.2em;

  &__incrementBox {
  }

  &__maxbox {
    display: flex;
    flex-direction: row;
    border-width: 1px;
    border-style: solid;
    border-radius: 2px;
  }

  &__limitbox {
    width: 1.8em;
    min-width: 1.8em;
    margin-left: auto;
    padding-top: 0.1em;
    font-weight: bold;
    font-size: 11pt;
    text-align: center;
    border-left-width: 1px;
    border-left-style: solid;

    &.theme-light {
      background-color: $light-highlight;
    }

    &.theme-dark {
      background-color: $dark-highlight;
    }
  }

  &__limitLabel {
    font-size: 7pt;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }

  &__statbox {
    width: 30px;
    min-width: 30px;
    height: 30px;
    min-height: 30px;
    padding: 0;
    text-align: center;
    font-family: "Gloria Hallelujah";
    font-size: 20pt;
    border-radius: 2px;

    &.statbox {
      &--limit {
        border: none;
        padding-top: 3px;
      }

      &--borderless {
        &.theme-light {
          border-color: $light-bg;
        }

        &.theme-dark {
          border-color: $dark-bg;
        }
      }
    }
  }

  &__displayName {
    height: 0;
    padding-top: 2px;
    font-size: 9pt;
    text-transform: uppercase;
    text-align: center;
  }

  &__chevron {
    position: relative;
    text-align: center;
    height: 1.2em;

    &.withDisplayName {
      top: -0.25em;
    }

    &.limit {
      text-align: left;
      left: 0.6em;
    }
  }
}

// Animation styles
.animated {
  -webkit-animation-duration: 0.15s;
  animation-duration: 0.15s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1;
}
@-webkit-keyframes bounce {
  0%, 100% {-webkit-transform: translateY(0);}
  50% {-webkit-transform: translateY(-5px);}
}
@keyframes bounce {
  0%, 100% {transform: translateY(0);}
  50% {transform: translateY(-5px);}
}
.bounce {
  -webkit-animation-name: bounce;
  animation-name: bounce;
}
@-webkit-keyframes bounceDown {
  0%, 100% {-webkit-transform: translateY(0);}
  50% {-webkit-transform: translateY(5px);}
}
@keyframes bounceDown {
  0%, 100% {transform: translateY(0);}
  50% {transform: translateY(5px);}
}
.bounceDown {
  -webkit-animation-name: bounceDown;
  animation-name: bounceDown;
}
</style>
