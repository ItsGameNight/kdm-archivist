<template>
  <div>
    <div class="table-scroll" @click="currentSmt = null; setCurrentSmt(null)">
      <table>
        <tr><th>Settlements:</th></tr>
        <tr v-for="smt in settlements"><settlement-table-row :settlement="smt" :key="smt._id" :selected="smt._id === currentSmt" @smt-select="setCurrentSmt"></settlement-table-row></tr>
      </table>
    </div>
    <div id="controls">
      <button v-if="currentSmt !== null" @click="deleteSmt()">Delete Settlement</button>
      <button @click="newSettlement()">New Settlement</button>
    </div>
  </div>
</template>

<script>
import SettlementTableRow from './SettlementTableRow'

export default {
  name: 'settlement-table',
  components: { SettlementTableRow },
  data () {
    return {
      settlements: [],
      currentSmt: null
    }
  },
  created () {
    this.loadSettlements()
  },
  methods: {
    loadSettlements: function () {
      this.$settlements.getAll((smts) => {
        if (smts.length !== 0) {
          this.settlements = smts
        }
      })
    },
    setCurrentSmt: function (update) {
      this.currentSmt = update
      this.$emit('smt-select', update)
    },
    newSettlement: function () {
      this.$settlements.createNew(() => {
        this.loadSettlements()
      })
    },
    deleteSmt: function () {
      this.$settlements.remove(this.currentSmt, () => {
        this.currentSmt = null
        this.loadSettlements()
      })
    }
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
