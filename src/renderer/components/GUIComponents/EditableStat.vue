<template>
  <div class="editable-stat">
    <div class="increment-box" @mouseover="hover = true" @mouseleave="hover = false">
      <div class="chevron" :class="[topBounce ? 'animated bounce' : '']" :style="chevronStyle" @mousedown="updateStat(statValue + 1); bounceTop()"></div>
      <div :class="{ maxbox : maxValue }">
        <input type="number" class="statbox" :class="{ borderless : maxValue }" :value="statValue" @input="updateStat($event.target.value)" @focus="$event.target.select(); focus = true" @blur="focus = false" @keydown.enter="$event.target.blur()" />
        <span v-if="maxValue" class="limitbox"><div class="limit-label">Limit</div>{{ maxValue }}</span>
      </div>
      <div v-if="statDisplayName" class="stat-display-name" :style="displayNameStyle">{{ statDisplayName }}</div>
      <div :class="[statDisplayName ? 'chevron bottom withDisplayName' : 'chevron bottom', bottomBounce ? 'animated bounceDown' : '']" :style="chevronStyle" @mousedown="updateStat(statValue - 1); bounceBottom()"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editable-stat',
  props: {
    statDisplayName: { required: false },
    initValue: { required: true },
    maxValue: { required: false, default: null }
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
  computed: {
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
      if (this.maxValue === null || val <= this.maxValue) {
        this.statValue = val
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

<style>
.editable-stat {
  padding: 0 0.2em 0 0.5em;
  display: inline-block;
}
.increment-box {
  width: 1.2em;
  min-width: 1.2em;
  height: 3.15em;
  min-height: 3.15em;
  text-align: center;
  font-size: 18pt;
  overflow: visible;
}
.maxbox {
  display: flex;
  flex-direction: row;
  width: 2.6em;
  border: 1px solid black;
  border-radius: 2px;
}
.statbox {
  width: 1.2em;
  min-width: 1.2em;
  height: 1.2em;
  min-height: 1.2em;
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
.stat-display-name {
  font-size: 9pt;
  text-transform: uppercase;
  text-align: center;
  padding-top: 2px;
  padding-left: 3px;
}
.limit-label {
  font-size: 7pt;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  border-bottom: 1px solid black;
}
.chevron::before {
  border-style: solid;
  border-width: 0.2em 0.2em 0 0;
  content: '';
  display: inline-block;
  height: 0.45em;
  left: 0.1em;
  position: relative;
  top: 0.5em;
  transform: rotate(-45deg);
  vertical-align: top;
  width: 0.45em;
}
.chevron.bottom:before {
  top: 0;
  transform: rotate(135deg);
}
.chevron.bottom.withDisplayName:before {
  top: -0.72em;
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