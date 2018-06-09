<template>
  <div
    class="LockToggle"
    :class="[inHistoryMode ? 'DISABLE-CLICKS-HISTORY-MODE' : '']"
    @click="toggleState = !toggleState; $emit('update', toggleState)">
    <div class="LockToggle__wrapper">
      <div>
        <div class="LockToggle__lock" :class="[lockClass, themeClass]">
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
    },
    lockClass: function () {
      if (this.toggleState) {
        return 'lockClosed'
      } else {
        return 'lockOpen'
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

    &.lockClosed {
      &.theme-light {
        color: $light-bg;
        background-color: $light-text;
      }

      &.theme-dark {
        color: $dark-bg;
        background-color: $dark-text;
      }
    }

    &.lockOpen {
      &.theme-light {
        color: $light-text;
        background-color: $light-bg;
      }

      &.theme-dark {
        color: $dark-text;
        background-color: $dark-bg;
      }
    }
  }

  &__text {
    padding-left: 0.2em;
    font-size: 8pt;
    line-height: 14pt;
  }
}
</style>
