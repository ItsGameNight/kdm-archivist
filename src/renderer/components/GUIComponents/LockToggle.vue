<template>
  <div
    class="LockToggle"
    :class="[inHistoryMode ? 'DISABLE-CLICKS-HISTORY-MODE' : '']"
    @click="toggleState = !toggleState; $emit('update', toggleState)">
    <div class="LockToggle__wrapper">
      <div>
        <div class="LockToggle__lock" :class="[themeClass, toggleState ? inverseAltColor : altColor]">
          <font-awesome-icon :icon="icon" />
        </div>
      </div>
      <div class="LockToggle__text">
        {{ statDisplayName }}
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/fontawesome-free-solid'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'lock-toggle',
  components: { FontAwesomeIcon },
  mixins: [ThemeClass],
  props: {
    initValue: { required: true },
    statDisplayName: { required: true }
  },
  data: function () {
    return {
      toggleState: this.initValue
    }
  },
  computed: {
    ...mapGetters(['inHistoryMode']),
    icon: function () {
      if (this.toggleState) {
        return faLock
      } else {
        return faLockOpen
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.LockToggle {
  &__wrapper {
    display: flex;
    flex-direction: row;
  }

  &__lock {
    width: 1.4em;
    height: 1.2em;
    padding: 0.1em 0;
    font-size: 8pt;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
    transition: background-color 0.5s ease;
    transition: color 0.5s ease;
  }

  &__text {
    padding-left: 0.2em;
    font-size: 8pt;
    line-height: 14pt;
  }
}
</style>
