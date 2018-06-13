<template>
  <div class="CollapseGroup">
    <div class="CollapseGroup__header" :class="[themeClass]">
      <h4 class="CollapseGroup__title">
        {{ title }}
      </h4>
      <button
        class="CollapseGroup__collapseButton"
        :class="[themeClass]"
        @click="setCollapseState(!collapseState)">
        <font-awesome-icon :icon="collapseIcon" />
      </button>
    </div>
    <div v-if="!collapseState" class="CollapseGroup__body" :class="[themeClass]">
      <slot name="body">
        Default body.
      </slot>
    </div>
  </div>
</template>

<script type="text/javascript">
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faCaretSquareUp, faCaretSquareDown } from '@fortawesome/fontawesome-free-solid'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'collapse-group',
  mixins: [ThemeClass],
  components: { FontAwesomeIcon },
  props: {
    title: { required: true },
    initCollapse: { required: false, default: false }
  },
  data: function () {
    return {
      collapseState: this.initCollapse
    }
  },
  computed: {
    collapseIcon: function () {
      if (this.collapseState) {
        return faCaretSquareUp
      } else {
        return faCaretSquareDown
      }
    }
  },
  methods: {
    setCollapseState: function (state) {
      this.collapseState = state
    }
  }
}
</script>

<style lang="scss" scoped>
.CollapseGroup {
  &__header {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 4px;
    border-radius: 4px 4px 0 0;
  }

  &__title {
    margin: 0 auto 0 0;
    padding-top: 2px;
  }

  &__collapseButton {
    font-size: 9pt;
    font-weight: normal;
    border: none;
  }

  &__body {
    width: 100%;
    padding: 4px 4px 8px 4px;
    font-size: 10pt;
    border-radius: 0 0 4px 4px;
  }
}
</style>