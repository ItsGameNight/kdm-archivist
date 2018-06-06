<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'twilight-archivist',
  mounted: function () {
    // load all db's
    this.$store.dispatch('loadSettlements')
    this.$store.dispatch('loadSurvivors')
    this.$store.dispatch('loadSnapshots')
  }
}
</script>

<style>
/* Global CSS */
.DISABLE-CLICKS-HISTORY-MODE {
  pointer-events: none;
}
</style>
