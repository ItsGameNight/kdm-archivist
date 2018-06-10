<template>
  <div style="overflow-y: scroll;">
    <h2>{{ currentSettlement.name }}</h2>
    <p>
    <b>Overview:</b>
    <br>
      Lantern Year:
      <input
        class="value"
        :value="currentSettlement.lanternYear"
        :disabled="inHistoryMode"
        :stat="'lanternYear'"
        @input="updateNumberValue"/>
    <br>
      Survival Limit:
      <input
        class="value"
        :value="currentSettlement.survivalLimit"
        :stat="'survivalLimit'"
        :disabled="inHistoryMode"
        @input="updateNumberValue"/>
    <br>
      Survival on Depart:
      <input
        class="value"
        :value="currentSettlement.survivalOnDepart"
        :stat="'survivalOnDepart'"
        :disabled="inHistoryMode"
        @input="updateNumberValue"/>
    </p>
    <p>
    <b>Stats:</b>
    <br>
      Survivors: {{ numberAliveInSettlement }}
    <br>
      Death Count: {{ settlementDeathCount }}
    <br>
      M/F Ratio: {{ settlementMaleCount }} / {{ settlementFemaleCount }}
    </p>
    <p>
      <b>Principles: </b>
      <editable-list
        :listItems="currentSettlement.principles"
        :max="4"
        :autocompleteList="principleNames"
        :parentHeight="height"
        @update="update('principles', $event)"
        ></editable-list>
    </p>
    <p>
      <b>Locations: </b>
      <editable-list
        :listItems="currentSettlement.locations"
        :autocompleteList="settlementLocationNames"
        :parentHeight="height"
        @update="update('locations', $event)"
        ></editable-list>
    </p>
    <p>
      <b>Innovations: </b>
      <editable-list
        :listItems="currentSettlement.innovations"
        :autocompleteList="innovationNames"
        :parentHeight="height"
        @update="update('innovations', $event)"
        ></editable-list>
    </p>
    <p>
      <b>Quarries: </b>
      <editable-list
        :listItems="currentSettlement.quarries"
        :autocompleteList="quarryNames"
        :parentHeight="height"
        @update="update('quarries', $event)"></editable-list>
    </p>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import { EditableList } from './GUIComponents'
import ThemeClass from '@/mixins/ThemeClass'
import {
  Innovations,
  Principles,
  SettlementLocations,
  Quarries
} from '../assets/StaticGameData'

function getNames (obj) {
  return Object.values(obj).map((o) => { return o.name })
}

export default {
  name: 'settlement-inspector',
  components: { EditableList },
  mixins: [ThemeClass],
  data: function () {
    return {
      height: 0
    }
  },
  mounted: function () {
    this.height = this.$el.getBoundingClientRect().height + this.$el.getBoundingClientRect().top
    this.$nextTick(() => {
      // Detect window resizes
      window.addEventListener('resize', (e) => {
        this.height = this.$el.getBoundingClientRect().height + this.$el.getBoundingClientRect().top
      })
      // Detect scrolls
      window.addEventListener('scroll', (e) => {
        this.height = this.$el.getBoundingClientRect().height + this.$el.getBoundingClientRect().top
      })
    })
  },
  computed: {
    ...mapGetters([
      'inHistoryMode',
      'numberAliveInSettlement',
      'settlementDeathCount',
      'settlementMaleCount',
      'settlementFemaleCount',
      'currentSettlement'
    ]),
    principleNames: function () {
      return getNames(Principles)
    },
    innovationNames: function () {
      return getNames(Innovations)
    },
    settlementLocationNames: function () {
      return getNames(SettlementLocations)
    },
    quarryNames: function () {
      return getNames(Quarries)
    }
  },
  methods: {
    ...mapActions([
      'updateSettlement'
    ]),
    update: function (stat, val) {
      var update = {}
      update[stat] = val
      this.updateSettlement({ id: this.currentSettlement._id, update: update })
    },
    updateNumberValue (e) {
      var value = e.target.value
      if (value !== '' && !isNaN(parseFloat(value))) {
        // unpack the event
        var update = {}
        update[e.target.getAttribute('stat')] = Number(value)
        // update backend
        this.updateSettlement({ id: this.currentSettlement._id, update: update })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input.value {
  text-align: center;
  width: 20px;
  font-size: 10pt;
}
</style>
