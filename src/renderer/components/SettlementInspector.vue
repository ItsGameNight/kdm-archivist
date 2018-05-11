<template>
  <div style="overflow-y: scroll;">
    <h2>{{ currentSettlement.name }}</h2>
    <p>
    <b>Stats:</b><br>
      Lantern Year: 
      <input class="value" :value="currentSettlement.lanternYear" :stat="'lanternYear'" @input="updateNumberValue"/>
    <br>
      Survivors: 
      {{ numberAliveInSettlement }}
    <br>
     Death Count: 
     {{ settlementDeathCount }}
    <br>
      Survival Limit: 
      <input class="value" :value="currentSettlement.survivalLimit" :stat="'survivalLimit'" @input="updateNumberValue"/>
    <br>
      Survival on Depart: 
      <input class="value" :value="currentSettlement.survivalOnDepart" :stat="'survivalOnDepart'" @input="updateNumberValue"/>
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
      'currentSettlement',
      'numberAliveInSettlement',
      'settlementDeathCount'
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
