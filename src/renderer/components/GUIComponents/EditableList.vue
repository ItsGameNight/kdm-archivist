<template>
  <div class="editable-list-wrapper">
    <ul class="editable-list">
      <editable-list-item
        v-for="(item, index) in listItems"
        :initTextValue="numbered && item != null ? item.name : item"
        :count="numbered && item != null ? item.count : null"
        :placeholder="placeholder + ' ' + (index + 1)"
        :key="index"
        :autocompleteList="autocompleteList"
        :numbered="numbered"
        @update="updateItem(index, $event)"
        @delete="deleteItem(index)" >
      </editable-list-item>
    </ul>
    <button v-if="!max || listItems.length < max" class="add-item" @click="addNew">+</button>
  </div>
</template>

<script>
import EditableListItem from './EditableListItem'

export default {
  name: 'editable-list',
  components: { EditableListItem },
  props: {
    listItems: { required: true },
    max: { required: false, default: null },
    min: { required: false, default: null },
    placeholder: { required: false, default: 'Item' },
    autocompleteList: { default: () => [] },
    numbered: { default: false }
  },
  created: function () {
    // Deal with case where min is specified but
    // array in datastore does not have min elements
    // i.e. disorders first time opening survival modal
    if (this.min && this.listItems.length < this.min) {
      var listClone = JSON.parse(JSON.stringify(this.listItems))
      for (var i = 0; i < this.min - this.listItems.length; i++) {
        listClone.push(null)
      }
      this.$emit('update', listClone)
    }
  },
  methods: {
    addNew: function () {
      // NOTE: slice() doesn't work with objects + Vuex!
      var listClone = JSON.parse(JSON.stringify(this.listItems))
      listClone.push(null)
      this.$emit('update', listClone)
    },
    updateItem: function (idx, val) {
      var listClone = JSON.parse(JSON.stringify(this.listItems))
      if (this.numbered) {
        // init as object if not yet
        if (listClone[idx] == null) {
          listClone[idx] = {}
        }
        listClone[idx].name = val
      } else {
        listClone[idx] = val
      }
      this.$emit('update', listClone)
    },
    deleteItem: function (idx) {
      // Normally delete button removes element from array
      // If at min elements, however, just set it to null
      var listClone = JSON.parse(JSON.stringify(this.listItems))
      if (!this.min || this.listItems.length > this.min) {
        listClone.splice(idx, 1)
      } else {
        listClone[idx] = null
      }
      this.$emit('update', listClone)
    }
  }
}
</script>

<style scoped>
ul.editable-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 2px solid black;
  border-top: none;
  border-radius: 2px 2px 0 2px;
}
button.add-item {
  float: right;
  background-color: white;
  font-size: 8pt;
  font-weight: normal;
  border: 2px solid black;
  border-top: none;
  border-radius: 0 0 2px 2px;
  outline: none;
}
button.add-item:hover {
  font-weight: bold;
  font-size: 10pt;
}
button.add-item:active {
  background: black;
  color: white;
}
.editable-list-wrapper {
  background: white;
}
</style>
