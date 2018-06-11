<template>
  <div class="SettlementTable">
    <div class="SettlementTable__modals">
      <modal v-if="showNewSettlementModal"
        @okay="newSmtModalOkayPressed()"
        @close="showNewSettlementModal = false"
        :modalWidth="300">
          <h3 slot="header">New Settlement</h3>
          <label slot="body">Settlement Name: <input v-model="newName" /></label>
      </modal>
    </div>
    <div class="SettlementTable__tableScroll" @click="setCurrentSmt(null)">
      <table>
        <tr><th>Settlements:</th></tr>
        <tr v-for="(smt, index) in settlements">
          <settlement-table-row
            :smtID="smt._id"
            :index="index"
            :key="smt._id"
            :selected="smt._id === currentSmt"
            @smt-select="setCurrentSmt(smt._id)" />
        </tr>
      </table>
    </div>
    <div class="SettlementTable__bottomButtons">
      <button v-if="currentSmt !== null"
        :class="[themeClass]"
        @click="deleteSettlement(currentSmt)">
          Delete Settlement
      </button>
      <button
        :class="[themeClass]"
        @click="newSmtButtonPressed()">
          New Settlement
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapState } from 'vuex'
import SettlementTableRow from './SettlementTableRow'
import Modal from './Modal'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'settlement-table',
  components: { SettlementTableRow, Modal },
  mixins: [ThemeClass],
  data () {
    return {
      showNewSettlementModal: false,
      newName: null
    }
  },
  computed: {
    ...mapState([
      'currentSmt',
      'settlements'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentSmt',
      'createNamedSettlement',
      'deleteSettlement'
    ]),
    newSmtButtonPressed: function () {
      this.newName = null
      this.showNewSettlementModal = true
    },
    newSmtModalOkayPressed: function () {
      if (this.newName !== null) {
        this.createNamedSettlement(this.newName)
      }
    }
  },
  mounted () {
    this.setCurrentSmt(null)
  }
}
</script>

<style lang="scss" scoped>
.SettlementTable {
  &__tableScroll {
    height: 300px;
    overflow-y: scroll;

    table {
      width: 98%;
      border-spacing: 0em 0.5em;
      padding: 0 5px;
    }
  }

  &__bottomButtons {
    width: 98%;
    text-align: right;
  }
}
</style>
