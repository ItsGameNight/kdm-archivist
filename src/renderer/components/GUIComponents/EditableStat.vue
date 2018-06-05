<template>
  <div class="editable-stat">
    <div class="increment-box" @mouseover="hover = true" @mouseleave="hover = false">
      <div class="chevron top"><font-awesome-icon :icon="chevronUp" :class="[topBounce ? 'animated bounce' : '']" :style="chevronStyle" @mousedown="updateStat(statValue + 1); bounceTop()" /></div>
      <div :class="{ maxbox : limitBox }">
        <input
        type="number"
        class="statbox"
        :class="{ borderless : limitBox, 'no-border': noBorder }"
        :disabled="inHistoryMode"
        :value="statValue"
        @input="updateStat($event.target.value)"
        @focus="$event.target.select(); focus = true"
        @blur="focus = false"
        @keydown.enter="$event.target.blur()" />
        <span v-if="limitBox" class="limitbox"><div class="limit-label">Limit</div>{{ maxValue }}</span>
      </div>
      <div v-if="statDisplayName" class="stat-display-name" :style="displayNameStyle">{{ statDisplayName }}</div>
      <div :class="[statDisplayName ? 'chevron bottom withDisplayName' : 'chevron bottom']"><font-awesome-icon :icon="chevronDown" :class="[bottomBounce ? 'animated bounceDown' : '']" :style="chevronStyle" @mousedown="updateStat(statValue - 1); bounceBottom()" /></div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/fontawesome-free-solid'
import { mapGetters } from 'vuex'

export default {
  name: 'editable-stat',
  components: { FontAwesomeIcon },
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

<style scoped>
.editable-stat {
  padding: 0 0.2em;
  display: block;
  /*border: 1px solid red;*/
}
.increment-box {
  text-align: center;
  font-size: 18pt;
  /*border: 1px solid blue;*/
}
.maxbox {
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 2px;
}
.statbox {
  width: 1.2em;
  min-width: 1.2em;
  text-align: center;
  font-size: 18pt;
  border: 1px solid black;
  border-radius: 2px;
  outline: none;
}
.limitbox {
  font-family: system-ui;
  font-weight: bold;
  font-size: 12pt;
  border-left: 1px solid black;
  width: 1.8em;
  min-width: 1.8em;
  margin-left: auto;
  padding-top: 0.1em;
  background-color: #d2d2d2;
}
.borderless {
  border: none;
}
.no-border {
  border: 1px solid white;
}
.stat-display-name {
  height: 0;
  font-size: 9pt;
  text-transform: uppercase;
  text-align: center;
  padding-top: 2px;
}
.limit-label {
  font-size: 7pt;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  border-bottom: 1px solid black;
}
.chevron {
  position: relative;
  text-align: left;
  padding-left: 6px;
  /*border: 1px solid green;*/
}
.top {
  height: 0.9em;
}
.bottom {
  height: 0.9em;
  top: -0.1em;
}
.withDisplayName {
  top: -0.2em;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
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
