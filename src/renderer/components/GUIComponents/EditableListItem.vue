<template>
  <div>
    <li class="editable-list-item" @mouseover="hover = true" @mouseleave="hover = false">
      <input v-if="numbered"
        class="item-count-wrapper"
        :value="count"
        type="number"
        @input="$emit('updateCount', $event.target.value)">
      </input>
      <div class="item-input-wrapper" :class="{'input-on-hover' : (hover && !editing)}">
        <editable-text-input
          :textValue="initTextValue"
          :textStyle="listTextStyle"
          :placeholder="placeholder"
          :autocompleteList="autocompleteList"
          @update="$emit('update', $event)"
          @focus="editing = true"
          @blur="editing = false"
          />
      </div>
      <div class="delete-icon-wrapper">
        <font-awesome-icon
          v-if="hover && !editing"
          :icon="deleteIcon"
          class="delete-icon"
          :style="deleteIconPadding"
          @click="$emit('delete')"
          @mousedown="mouseDownOnDelete = true"
          @mouseup="mouseDownOnDelete = false"
          @mouseleave="mouseDownOnDelete = false" />
      </div>
    </li>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faTimesCircle as farTimesCircle } from '@fortawesome/fontawesome-free-regular'
import { faTimesCircle as fasTimesCircle } from '@fortawesome/fontawesome-free-solid'
import EditableTextInput from './EditableTextInput'

export default {
  name: 'editable-list-item',
  components: { EditableTextInput, FontAwesomeIcon },
  props: {
    initTextValue: { required: true },
    count: { required: true },
    autocompleteList: { required: false, default: () => [] },
    placeholder: { required: true },
    numbered: { required: false, default: false },
    textStyle: { required: false, default: null }
  },
  data: function () {
    return {
      hover: false,
      editing: false,
      mouseDownOnDelete: false
    }
  },
  computed: {
    deleteIcon: function () {
      if (this.mouseDownOnDelete) {
        return fasTimesCircle
      } else {
        return farTimesCircle
      }
    },
    listTextStyle: function () {
      return {
        ...this.textStyle,
        textOverflow: 'ellipsis'
      }
    },
    deleteIconPadding: function () {
      return {
        paddingTop: Number(this.textStyle.fontSize.slice(0, -2)) - 11 + 'px'
      }
    }
  }
}
</script>

<style scoped>
li.editable-list-item {
  padding-left: 2px;
  border-top: 2px solid black;
  position: relative;
}
.item-input-wrapper {
  width: 80%;
  background: white;
  display: inline-block;
}
.item-count-wrapper {
  width: 15px;
  text-align: center;
  border: none;
  background: white;
  display: inline-block;
}
.input-on-hover {
  background: white;
  width: 70%;
}
.delete-icon-wrapper {
  position: absolute;
  right: 1px;
  top: 1px;
}
.delete-icon {
}
</style>
