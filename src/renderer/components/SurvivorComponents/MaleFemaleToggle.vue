<template>
  <div 
    :class="[ inHistoryMode ? 'DISABLE-CLICKS-HISTORY-MODE' : '' ]"
    class="mf-toggle">
    M <div :class="[sex === 'm' ? 'square' : 'empty-square']" @click="setSex('m')"></div>
    F <div :class="[sex === 'f' ? 'square' : 'empty-square']" @click="setSex('f')"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'male-female-toggle',
  props: {
    initSex: { required: true },
    survivorID: { required: true }
  },
  computed: {
    ...mapGetters(['inHistoryMode'])
  },
  data: function () {
    return {
      sex: this.initSex
    }
  },
  watch: {
    initSex: function (newVal) {
      this.sex = newVal
    }
  },
  methods: {
    ...mapActions([
      'updateSurvivor'
    ]),
    setSex: function (s) {
      this.sex = s
      this.updateSurvivor({ id: this.survivorID, update: { sex: s } })
    }
  }
}
</script>

<style>
.mf-toggle {
  font-size: 10pt;
  font-weight: normal;
  display: flex;
  flex-direction: row;
  line-height: 12px;
}
.square {
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  background: black;
  border: 1px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
.empty-square {
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  border: 1px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
</style>
