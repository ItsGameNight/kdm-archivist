<template>
  <div id="kdm-app">
    <settlement-inspector id="inspector"></settlement-inspector>
    <div id="content">
      <span>|NAV| |BAR| |HERE|</span>
      <survivor-table id="survivor-table"></survivor-table>
    </div>
    <div id="note-panel">
      <span style="font-weight: bold">Notes:</span>
      <note-panel></note-panel>
    </div>
  </div>
</template>

<script>
import SurvivorTable from './SurvivorTable'
import SettlementInspector from './SettlementInspector'
import NotePanel from './NotePanel'

export default {
  name: 'kdm-app',
  components: { SurvivorTable, SettlementInspector, NotePanel }
}
</script>

<style>
#kdm-app {
  height: 600px;
  min-height: 600px;
  max-height: 600px;
  display: flex;
  flex-direction: row;
}
#inspector {
  width: 15%;
  height: auto;
  padding: 1.5%;
  margin-right: 2%;
  border: 1px solid black;
}
#content {
  width: 60%;
}
#note-panel {
  width: 15%;
  margin-left: 2%;
  border: 1px solid black;
}
</style>
