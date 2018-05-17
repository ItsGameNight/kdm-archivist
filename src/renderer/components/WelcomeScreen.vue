<template>
  <div class="welcome-main">
    <header>
      <div class="logo-wrapper"><img class="logo" :src="headerImg" /></div>
      <h4 id="subtitle">A Kingdom Death: Monster Companion App</h4>
    </header>
    <div id="settlement-table">
      <settlement-table></settlement-table>
    </div>
    <button id="play-button" @click="$emit('play')">Play</button>
  </div>
</template>

<script>
import SettlementTable from './SettlementTable'
export default {
  name: 'welcome-screen',
  components: { SettlementTable },
  data: function () {
    return {
      headerImg: 'static/logo-animated.png'
    }
  }
}
</script>

<style>
.welcome-main {

}
header {
  padding-top: 20px;
  padding-bottom: 15px;
}
.logo-wrapper {
  height: 75px;
}
img.logo {
  width: 500px;
  display: block;
  margin: auto;
  -webkit-user-drag: none;
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
