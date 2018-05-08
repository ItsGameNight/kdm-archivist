<template>
  <div>
    <header>
      <div id="title">White Speaker</div>
      <div id="subtitle">A Kingdom Death Companion App</div>
    </header>
    <div id="settlement-table">
      <settlement-table @smt-select="setCurrentSmt"></settlement-table>
    </div>
    <button id="play-button" @click="$emit('play')">Play</button>
  </div>
</template>

<script>
import SettlementTable from './SettlementTable'
export default {
  name: 'welcome-screen',
  components: { SettlementTable },
  methods: {
    setCurrentSmt: function (update) {
      this.$emit('smt-select', update)
    }
  }
}
</script>

<style>
header {
  padding-bottom: 25px;
}
#title {
  text-align: center;
}
#subtitle {
  text-align: center;
}
#settlement-table {
  margin: auto;
  width: 33%;
}
#play-button {
  margin-top: 10px;
  margin-left: 33%;
  width: 33%;
  text-align: center;
}
</style>