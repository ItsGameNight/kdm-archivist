<template>
  <div
    class="ProgressBar"
    :class="[inHistoryMode ? 'DISABLE-CLICKS-HISTORY-MODE' : '']">
    <span
      v-if="!inline && title"
      class="ProgressBar__title above">
        {{ title }} ({{ level }}):
    </span>
    <div class="ProgressBar__bar">
      <span
        v-if="inline && title"
        class="ProgressBar__title"
        :style="{minWidth: String(4 + maxLevel / 8) + 'em'}">
          {{ title }} ({{ level }}): 
      </span>
      <div
        v-for="n in maxLevel"
        :class="[squareClass(n), themeClass]"
        @click="setLevel(n)" @dblclick.stop>
      </div>
      <div
        v-for="n in paddingSquares"
        class="invisibleSquare"
        :class="[themeClass]">
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'progress-bar',
  mixins: [ThemeClass],
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
  computed: {
    ...mapGetters(['inHistoryMode'])
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
        return 'emptySquareBold'
      } else if (this.extraBoldLevels && this.extraBoldLevels.includes(n)) {
        return 'emptySquareExtraBold'
      } else {
        return 'emptySquare'
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
      this.$emit('onChange', this.level)
    }
  }
}
</script>

<style lang="scss" scoped>
.ProgressBar {
  display: inline-block;
  height: 16px;
  margin-top: 2px;
  line-height: 8px;
  text-align: right;

  &__title {
    display: block;
    padding-top: 2px;
    min-width: 4em;
    font-size: 9pt;
    text-align: left;

    &.above {
      padding-bottom: 6px;
    }
  }

  &__bar {
    display: flex;
    flex-direction: row;
  }
}
</style>
