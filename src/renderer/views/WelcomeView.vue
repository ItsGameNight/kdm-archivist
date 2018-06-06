<template>
  <div class="welcome-main">
    <header>
      <h1 id="title">Twilight Archivist</h1>
      <h4 id="subtitle">A Kingdom Death: Monster Companion App</h4>
    </header>
    <div id="settlement-table">
      <settlement-table></settlement-table>
    </div>
    <button id="play-button" @click="$router.push({ name: 'main' })">Play</button>
  </div>
</template>

<script>
import SettlementTable from '@/components/SettlementTable'
export default {
  name: 'welcome-view',
  components: { SettlementTable }
}
</script>

<style>
.welcome-main {

}
header {
  padding-top: 20px;
  padding-bottom: 15px;
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
