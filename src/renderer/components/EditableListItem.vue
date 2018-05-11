<template>
  <div>
    <li v-if=editing>
      <input :value="currentSettlement[propertyName][idx]" class="editInput" @input="update"/>
      <button @click="editing=false" class="doneBtn">√</button>
      <button @click="deleteItem" class="deleteBtn">X</button>
    </li>
    <li v-else @click="editing=true">
      {{ currentSettlement[propertyName][idx] }}
    </li>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'editable-list-item',
  props: {
    propertyName: '',
    idx: 0
  },
  data: function () {
    return {
      editing: false
    }
  },
  computed: {
    ...mapGetters(['currentSettlement'])
  },
  methods: {
    ...mapActions(['updateSettlement']),
    update (e) {
      var value = e.target.value
      if (value !== '') {
        // clone list + make update
        var update = {}
        var listClone = this.currentSettlement[this.propertyName].slice()
        listClone[this.idx] = value
        update[this.propertyName] = listClone
        this.updateSettlement({ id: this.currentSettlement._id, update: update })
      }
    },
    deleteItem () {
      // splice out of list
      var listClone = this.currentSettlement[this.propertyName].slice()
      listClone.splice(this.idx, 1)

      // send to store
      var update = {}
      update[this.propertyName] = listClone
      this.editing = false
      this.updateSettlement({ id: this.currentSettlement._id, update: update })
    }
  }
}
</script>

<style>
.deleteBtn {
  color: red;
}
.doneBtn {
  color: green;
}
.editInput {
  width: 50%;
}
</style>
