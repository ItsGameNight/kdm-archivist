<template>
  <div class="EditableList" :style="fixedStyle">
    <div class="EditableList__scrollBox" :class="[fixedHeight ? 'fixedScroll' : '']">
      <ul class="EditableList__list" :class="[themeClass, fixedHeight ? 'fixedScroll' : '']">
        <editable-list-item
          v-for="(item, index) in listItems"
          :initTextValue="numbered ? item.name : item"
          :count="numbered ? item.count : null"
          :placeholder="placeholder + ' ' + (index + 1)"
          :key="index"
          :autocompleteList="autocompleteList"
          :numbered="numbered"
          :numberEditable="numberEditable"
          :textStyle="textStyle"
          :parentHeight="parentHeight"
          @update="updateItem(index, $event)"
          @updateCount="updateCount(index, $event)"
          @delete="deleteItem(index)" />
      </ul>
    </div>
    <button
      v-if="!max || listItems.length < max"
      class="EditableList__addButton"
      :class="[themeClass]"
      :disabled="inHistoryMode"
      @click="addNew">
        +
    </button>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import EditableListItem from './EditableListItem'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'editable-list',
  components: { EditableListItem },
  mixins: [ThemeClass],
  props: {
    listItems: { required: true },
    max: { required: false, default: null },
    min: { required: false, default: null },
    placeholder: { required: false, default: 'Item' },
    autocompleteList: { required: false, default: () => [] },
    numbered: { required: false, default: false, type: Boolean },
    numberEditable: { required: false, default: true, type: Boolean },
    textStyle: { required: false, default: () => { return { fontSize: '10pt' } } },
    parentHeight: { required: false, default: 9999 },
    fixedHeight: { required: false, default: null }
  },
  computed: {
    ...mapGetters(['inHistoryMode']),
    fixedStyle: function () {
      if (this.fixedHeight) {
        return { maxHeight: this.fixedHeight, height: this.fixedHeight }
      } else {
        return null
      }
    }
  },
  created: function () {
    // Deal with case where min is specified but
    // array in datastore does not have min elements
    // i.e. disorders first time opening survival modal
    if (this.min && this.listItems.length < this.min) {
      var listClone = JSON.parse(JSON.stringify(this.listItems))
      for (var i = 0; i < this.min - this.listItems.length; i++) {
        if (this.numbered) {
          var obj = {}
          obj.name = null
          obj.count = 1
        } else {
          obj = null
        }
        listClone.push(obj)
      }
      this.$emit('update', listClone)
    }
  },
  methods: {
    addNew: function () {
      // NOTE: slice() doesn't work with objects + Vuex!
      var listClone = JSON.parse(JSON.stringify(this.listItems))
      if (this.numbered) {
        var obj = {}
        obj.name = null
        obj.count = 1
      } else {
        obj = null
      }
      listClone.push(obj)
      this.$emit('update', listClone)
    },
    updateCount: function (idx, val) {
      var listClone = JSON.parse(JSON.stringify(this.listItems))
      if (this.numbered) {
        listClone[idx].count = val
      } else {
        // should never happen if not numbered!
        return
      }
      this.$emit('update', listClone)
    },
    updateItem: function (idx, val) {
      var listClone = JSON.parse(JSON.stringify(this.listItems))
      if (this.numbered) {
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

<style lang="scss" scoped>
.EditableList {
  display: block;

  &__scrollBox {
    &.fixedScroll {
      height: 100%;
      border: 2px solid;
      border-radius: 2px 2px 0 2px;
      overflow: scroll;
    }
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    border-width: 2px;
    border-style: solid;
    border-radius: 2px 2px 0 2px;
    border-top: none;

    &.fixedScroll {
      border-left: none;
      border-right: none;
      border-radius: 0;
    }
  }

  &__addButton {
    float: right;
    font-size: 8pt;
    font-weight: normal;
    border-width: 2px;
    border-radius: 0 0 2px 2px;
    border-top: none;

    &.theme-dark {
      background-color: $dark-bg;
    }

    &:hover {
      font-weight: bold;
      font-size: 10pt;

      &.theme-light {
        background-color: $light-bg;
      }

      &.theme-dark {
        background-color: $dark-bg;
      }
    }

    &:active {
      &.theme-light {
        color: $light-bg;
        background-color: $light-text;
      }

      &.theme-dark {
        color: $dark-bg;
        background-color: $dark-text;
      }
    }
  }
}
</style>
