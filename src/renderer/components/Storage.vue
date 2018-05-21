<template>
  <div style="overflow-y: scroll;">
    <editable-list
      :listItems="currentSettlement.resources"
      :autocompleteList="resourceNames"
      :numbered="true"
      @update="update('resources', $event)"
      ></editable-list>
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
</style>
