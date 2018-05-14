<template>
  <div style="overflow-y: scroll;">
    <h2>{{ currentSettlement.name }}</h2>
    <p>
    <b>Overview:</b>
    <br>
      Lantern Year:
      <input class="value" :value="currentSettlement.lanternYear" :stat="'lanternYear'" @input="updateNumberValue"/>
    <br>
      Survival Limit:
      <input class="value" :value="currentSettlement.survivalLimit" :stat="'survivalLimit'" @input="updateNumberValue"/>
    <br>
      Survival on Depart:
      <input class="value" :value="currentSettlement.survivalOnDepart" :stat="'survivalOnDepart'" @input="updateNumberValue"/>
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
      <editable-list :propertyName="'principles'"></editable-list>
    </p>
    <p>
      <b>Locations: </b>
      <editable-list :propertyName="'locations'"></editable-list>
    </p>
    <p>
      <b>Innovations: </b>
      <editable-list :propertyName="'innovations'"></editable-list>
    </p>
    <p>
      <b>Quarries: </b>
      <editable-list :propertyName="'quarries'"></editable-list>
    </p>
  </div>
</template>

<script>
import EditableList from './EditableList'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'settlement-inspector',
  components: { EditableList },
  computed: {
    ...mapGetters([
      'numberAliveInSettlement',
      'settlementDeathCount',
      'settlementMaleCount',
      'settlementFemaleCount',
      'currentSettlement'
    ])
  },
  methods: {
    ...mapActions([
      'updateSettlement'
    ]),
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

<style>
input.value {
  text-align: center;
  width: 20px;
  font-size: 10pt;
}
</style>
