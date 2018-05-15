<template>
  <div class="square-toggle" :style="titleSize">
    <div class="flex-wrapper">
      <div :class="[checkValue ? 'square' : 'empty-square']" :style="toggleSize" @click="toggle()"></div><div class="toggle-title">{{ statDisplayName }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'square-toggle',
  props: {
    initValue: { required: true },
    statName: { required: true },
    statDisplayName: { required: true },
    survivorID: { required: true },
    squareSize: { required: false, default: '10' }
  },
  data: function () {
    return {
      checkValue: this.initValue
    }
  },
  computed: {
    toggleSize: function () {
      var toggleStyle = {}
      toggleStyle['width'] = this.squareSize + 'px'
      toggleStyle['min-width'] = this.squareSize + 'px'
      toggleStyle['height'] = this.squareSize + 'px'
      toggleStyle['min-height'] = this.squareSize + 'px'
      return toggleStyle
    },
    titleSize: function () {
      var titleStyle = {}
      titleStyle['font-size'] = this.squareSize + 'pt'
      titleStyle['line-height'] = this.squareSize + 'pt'
      return titleStyle
    }
  },
  methods: {
    ...mapActions([
      'updateSurvivor'
    ]),
    toggle: function () {
      this.checkValue = !this.checkValue
      var update = {}
      update[this.statName] = this.checkValue
      this.updateSurvivor({ id: this.survivorID, update: update })
    }
  }
}
</script>

<style>
.square-toggle {
}
.toggle-title {
  padding-left: 2px;
}
.square {
  background: black;
  border: 1px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
.empty-square {
  border: 1px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
</style>