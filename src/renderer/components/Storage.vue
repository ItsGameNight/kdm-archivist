<template>
  <div class="storage-container">
    <div class="storage-column">
      <h3>Resources</h3>
      <editable-list
        :listItems="currentSettlement.resources"
        :autocompleteList="resourceNames"
        :numbered="true"
        @update="update('resources', $event)"
        ></editable-list>
    </div>
    <div class="storage-column">
      <h3>Gear</h3>
      <editable-list
        :listItems="currentSettlement.storedGear"
        :numbered="true"
        @update="update('storedGear', $event)"
        ></editable-list>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { EditableList } from './GUIComponents'
import { Resources } from '../assets/StaticGameData'

export default {
  name: 'settlement-storage',
  components: { EditableList },
  computed: {
    ...mapGetters([
      'currentSettlement'
    ]),
    resourceNames: function () {
      return Object.values(Resources).map((o) => { return o.name })
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
    }
  }
}
</script>

<style>
.storage-container {
  display: flex;
  flex-direction: row;
}
.storage-column {
  width: 50%;
  padding: 5px;
}
</style>
