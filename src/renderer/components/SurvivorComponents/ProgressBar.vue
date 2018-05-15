<template>
  <div class="progress-bar">
    <span v-if="!inline" class="title above">{{ title }} ({{ level }}): </span>
    <div class="flex-wrapper">
      <span v-if="inline" class="title" :style="{minWidth: String(4 + maxLevel / 8) + 'em'}">{{ title }} ({{ level }}): </span>
      <div v-for="n in maxLevel" :class="squareClass(n)" @click="setLevel(n)" @dblclick.stop></div>
      <div v-for="n in paddingSquares" class="invisible-square"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'progress-bar',
  props: {
    title: { required: true },
    initLevel: { required: true },
    maxLevel: { required: true },
    boldLevels: { default: [] },
    extraBoldLevels: { default: null },
    paddingSquares: { default: 0 },
    survivorID: { required: false, default: null },
    stat: { required: false, default: null },
    inline: { default: true }
  },
  data: function () {
    return {
      level: this.initLevel
    }
  },
  methods: {
    ...mapActions([
      'updateSurvivor'
    ]),
    squareClass: function (n) {
      // Returns the CSS class for each square in the
      // progress bar corresponding to current level and
      // stat specifications
      if (n <= this.level) {
        return 'square'
      } else if (this.boldLevels.includes(n)) {
        return 'empty-square-bold'
      } else if (this.extraBoldLevels && this.extraBoldLevels.includes(n)) {
        return 'empty-square-extra-bold'
      } else {
        return 'empty-square'
      }
    },
    setLevel: function (n) {
      // Set level to box clicked on
      // except if level is already equal to box clicked on,
      // then decrement by one
      if (this.level === n) {
        this.level = n - 1
      } else {
        this.level = n
      }
      // Update datastore
      if (this.survivorID !== null && this.stat !== null) {
        var update = {}
        update[this.stat] = this.level
        this.updateSurvivor({ id: this.survivorID, update: update })
      }
      // Emit event in case parent wants to take further action
      this.$emit('onChange', n)
    }
  }
}
</script>

<style>
.progress-bar {
  height: 16px;
  line-height: 8px;
  text-align: right;
  margin-top: 2px;
  display: inline-block;
}
.progress-bar .title {
  font-size: 10pt;
  font-variant-caps: small-caps;
  text-align: left;
  display: block;
  padding-top: 2px;
  min-width: 4em;
}
.above {
  padding-bottom: 6px;
}
.flex-wrapper {
  display: flex;
  flex-direction: row;
}
.square {
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  background: black;
  border: 1px solid black;
  margin: 0px 2px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.empty-square {
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  border: 1px solid black;
  margin: 0px 2px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.empty-square-bold {
  width: 8px;
  min-width: 8px;
  height: 8px;
  min-height: 8px;
  border: 2px solid black;
  margin: 0px 2px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.empty-square-extra-bold {
  width: 4px;
  min-width: 4px;
  height: 4px;
  min-height: 4px;
  border: 4px solid black;
  margin: 0px 2px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.invisible-square {
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  border: 1px solid white;
  margin: 0px 2px;
}
</style>