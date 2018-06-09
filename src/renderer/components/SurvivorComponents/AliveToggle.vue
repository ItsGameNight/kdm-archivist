<template>
  <button
    class="AliveToggle"
    :class="[inHistoryMode ? 'DISABLE-CLICKS-HISTORY-MODE' : '', themeClass]"
    @click="toggle()">
    <div class="AliveToggle__wrapper">
      <div>
        <div class="AliveToggle__toggle" :class="[toggleState ? 'alive' : 'dead']">
          <font-awesome-icon :icon="icon" />
        </div>
      </div>
      <div class="AliveToggle__text">
        <span v-if="toggleState">Alive</span>
        <span v-else>Dead</span>
      </div>
    </div>
  </button>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faHeartbeat, faSkull } from '@fortawesome/fontawesome-free-solid'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'lock-toggle',
  components: { FontAwesomeIcon },
  mixins: [ThemeClass],
  props: {
    initValue: { required: true },
    survivorID: { required: true }
  },
  data: function () {
    return {
      toggleState: this.initValue
    }
  },
  watch: {
    initValue: function (newVal) {
      this.toggleState = newVal
    }
  },
  computed: {
    ...mapGetters([
      'inHistoryMode',
      'currentSettlement'
    ]),
    icon: function () {
      if (this.toggleState) {
        return faHeartbeat
      } else {
        return faSkull
      }
    }
  },
  methods: {
    ...mapActions([
      'updateSurvivor'
    ]),
    toggle: function () {
      this.toggleState = !this.toggleState
      var update = {}
      update['alive'] = this.toggleState
      if (this.toggleState) {
        update['deathYear'] = null
      } else {
        update['deathYear'] = this.currentSettlement.lanternYear
      }
      this.updateSurvivor({ id: this.survivorID, update: update })
    }
  }
}
</script>

<style lang="scss" scoped>
.AliveToggle {
  border: none;

  &.theme-dark {
    background-color: $dark-bg;
  }

  &__wrapper {
    display: flex;
    flex-direction: row;
  }

  &__toggle {
    font-size: 10pt;

    &.alive {
      color: $blood-red;
    }
  }

  &__text {
    min-width: 2.6em;
    padding-left: 0.3em;
    font-size: 10pt;
    line-height: 14pt;
  }
}
</style>
