<template>
  <div>
    <div class="table-scroll" @click="setCurrentSmt(null)">
      <table>
        <tr><th>Settlements:</th></tr>
        <tr v-for="(smt, index) in settlements"><settlement-table-row :smtID="smt._id" :index="index" :key="smt._id" :selected="smt._id === currentSmt" @smt-select="setCurrentSmt"></settlement-table-row></tr>
      </table>
    </div>
    <div id="controls">
      <button v-if="currentSmt !== null" @click="deleteSettlement(currentSmt)">Delete Settlement</button>
      <button @click="createSettlement()">New Settlement</button>
    </div>
  </div>
</template>

<script>
import SettlementTableRow from './SettlementTableRow'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'settlement-table',
  components: { SettlementTableRow },
  computed: {
    ...mapState([
      'currentSmt',
      'settlements'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentSmt',
      'createSettlement',
      'deleteSettlement'
    ])
  }
}
</script>

<style>
table {
  width: 98%;
  border-spacing: 0em 0.5em;
  padding: 0 5px;
}
td {
  border: 1px solid black;
  padding: 5px;
}
.table-scroll {
  height: 300px;
  border: 1px solid black;
  overflow-y: scroll;
}
#controls {
  text-align: right;
}
</style>
