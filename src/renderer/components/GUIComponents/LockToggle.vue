<template>
  <div @click="toggleState = !toggleState">
    <div class="flex-wrapper">
      <div><div class="lock" :class="lockClass"><font-awesome-icon :icon="icon" /></div></div>
      <div class="lock-toggle-text">{{ statDisplayName }}</div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'lock-toggle',
  components: { FontAwesomeIcon },
  props: {
    initValue: { required: true },
    statName: { required: true },
    statDisplayName: { required: true },
    survivorID: { required: true }
  },
  data: function () {
    return {
      toggleState: false
    }
  },
  computed: {
    icon: function () {
      if (this.toggleState) {
        return faLock
      } else {
        return faLockOpen
      }
    },
    lockClass: function () {
      if (this.toggleState) {
        return 'lock-closed'
      } else {
        return 'lock-open'
      }
    }
  }
}
</script>

<style>
.lock {
  width: 1.4em;
  height: 1.2em;
  padding-top: .2em;
  font-size: 8pt;
  text-align: center;
  border: 1px solid black;
  border-radius: 3px;
}
.lock-closed {
  color: white;
  background: black;
  transition: background-color 0.5s ease;
  transition: color 0.5s ease;
}
.lock-open {
  color: black;
  background: white;
  transition: background-color 0.5s ease;
  transition: color 0.5s ease;
}
.lock-toggle-text {
  padding-left: 0.2em;
  font-size: 10pt;
  line-height: 14pt;
}
</style>