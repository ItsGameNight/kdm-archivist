<template>
  <div>
    <editable-list-item v-for="(item, index) in currentSettlement[propertyName]" :propertyName="propertyName" :idx="index"></editable-list-item>
    <li>
      <button @click="addNew">+</button>
    </li>
  </div>
</template>

<script>
import EditableListItem from './EditableListItem'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'editable-list',
  components: { EditableListItem },
  props: {
    propertyName: ''
  },
  computed: {
    ...mapGetters(['currentSettlement'])
  },
  methods: {
    ...mapActions(['updateSettlement']),
    addNew () {
      var update = {}
      var listClone = this.currentSettlement[this.propertyName].slice()
      listClone.push('CLICK ME!')
      update[this.propertyName] = listClone
      this.updateSettlement({ id: this.currentSettlement._id, update: update })
    }
  }
}
</script>

<style>
</style>
