<template>
  <div 
    :class="[ inHistoryMode ? 'DISABLE-CLICKS-HISTORY-MODE' : '' ]"
    class="alive-wrapper"
    @click="toggle()">
    <div class="flex-wrapper">
      <div><div class="alive-toggle" :class="[toggleState ? 'alive' : 'dead']"><font-awesome-icon :icon="icon" /></div></div>
      <div class="alive-toggle-text"><span v-if="toggleState">Alive</span><span v-else>Dead</span></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faHeartbeat, faSkull } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'lock-toggle',
  components: { FontAwesomeIcon },
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

<style>
.alive-wrapper {
  cursor: pointer;
  padding-left: 0.2em;
  padding-top: 0.1em;
}
.alive-wrapper:hover {
  border-radius: 10px;
  box-shadow: 0 0 6px 0 rgba(45, 45, 45, 0.67);
}
.alive-toggle {
  font-size: 12pt;
}
.alive {
  color: #8a0707;
}
.alive-toggle-text {
  font-size: 10pt;
  padding-left: 0.3em;
  min-width: 2.6em;
  line-height: 14pt;
}
</style>
