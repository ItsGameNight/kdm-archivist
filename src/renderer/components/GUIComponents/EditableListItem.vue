<template>
  <div>
    <li class="editable-list-item" @mouseover="hover = true" @mouseleave="hover = false">
      <input
        v-if="numbered"
        class="item-count"
        :class="[numberEditable ? '' : 'not-editable']"
        :value="count"
        type="number"
        :style="{fontSize:textStyle.fontSize}"
        :disabled="!numberEditable"
        @input="$emit('updateCount', $event.target.value)">
      </input>
      <div class="item-input-wrapper" :class="{'input-on-hover' : (hover && !editing)}">
        <editable-text-input
          :textValue="initTextValue"
          :textStyle="listTextStyle"
          :placeholder="placeholder"
          :autocompleteList="autocompleteList"
          :parentHeight="parentHeight"
          @update="$emit('update', $event)"
          @focus="editing = true"
          @blur="editing = false; hover = false"
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
    numbered: { required: false, default: false, type: Boolean },
    numberEditable: { required: false, default: true, type: Boolean },
    textStyle: { required: false, default: null },
    parentHeight: { required: false, default: 9999 }
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
.item-count {
  width: 24px;
  text-align: center;
  font-weight: bold;
  border: none;
  border-right: 1px solid black;
  padding-right: 6px;
  background: transparent;
  display: inline-block;
  outline: none;
}
.not-editable {
  user-select: none;
  font-weight: normal;
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
