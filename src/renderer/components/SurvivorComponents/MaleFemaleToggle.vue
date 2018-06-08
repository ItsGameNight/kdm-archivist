<template>
  <div class="MaleFemaleToggle"
    :class="[inHistoryMode ? 'DISABLE-CLICKS-HISTORY-MODE' : '']">
    M <div :class="[sex === 'm' ? 'square' : 'emptySquare', themeClass]" @click="setSex('m')"></div>
    F <div :class="[sex === 'f' ? 'square' : 'emptySquare', themeClass]" @click="setSex('f')"></div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'male-female-toggle',
  props: {
    initSex: { required: true },
    survivorID: { required: true }
  },
  mixins: [ThemeClass],
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

<style lang="scss" scoped>
.MaleFemaleToggle {
  display: flex;
  flex-direction: row;
  font-size: 10pt;
  font-weight: normal;
  line-height: 12px;
}
</style>
