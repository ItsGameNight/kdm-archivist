<template>
  <div>
    <h2>{{ currentSettlement.name }}</h2>
    <p>
      <b>Lantern Year: </b>
      <input class="value" :value="currentSettlement.lanternYear" :stat="'lanternYear'" @input="updateNumberValue"/>
    </p>
    <p>
      <b>Survivors: </b>
      {{ numberAliveInSettlement }}
    </p>
    <p>
     <b>Death Count: </b>
     {{ settlementDeathCount }}
    </p>
    <p>
      <b>Survival Limit: </b>
      <input class="value" :value="currentSettlement.survivalLimit" :stat="'survivalLimit'" @input="updateNumberValue"/>
    </p>
    <p>
      <b>Survival on Depart: </b>
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
