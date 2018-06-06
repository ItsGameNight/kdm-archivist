<template>
  <div
    :class="[ inHistoryMode ? 'DISABLE-CLICKS-HISTORY-MODE' : '' ]"
    class="square-toggle"
    :style="titleSize"
    @click="toggle()">
    <div class="flex-wrapper">
      <div :class="[checkValue ? 'square' : 'empty-square']" :style="toggleSize"></div><div class="toggle-title">{{ statDisplayName }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'square-toggle',
  props: {
    initValue: { required: true },
    statDisplayName: { required: true },
    squareSize: { required: false, default: '10' }
  },
  data: function () {
    return {
      checkValue: this.initValue
    }
  },
  watch: {
    initValue: function (newVal) {
      this.checkValue = newVal
    }
  },
  computed: {
    ...mapGetters(['inHistoryMode']),
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
    toggle: function () {
      this.checkValue = !this.checkValue
      this.$emit('update', this.checkValue)
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
  transition: background-color 0.3s ease;
}
.empty-square {
  border: 1px solid black;
  margin: 0px 2px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
