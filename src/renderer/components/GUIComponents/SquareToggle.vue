<template>
  <div
    class="SquareToggle"
    :class="[inHistoryMode ? 'DISABLE-CLICKS-HISTORY-MODE' : '']"
    :style="titleSize"
    @click="toggle()">
    <div class="SquareToggle__wrapper">
      <div
        :class="[checkValue ? 'square' : 'emptySquare', themeClass]"
        :style="toggleSize">
      </div>
      <div class="SquareToggle__title">
        {{ statDisplayName }}
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'square-toggle',
  mixins: [ThemeClass],
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

<style lang="scss" scoped>
.SquareToggle {
  &__wrapper {
    display: flex;
    flex-direction: row;
  }

  &__title {
    padding-left: 2px;
  }
}
</style>
