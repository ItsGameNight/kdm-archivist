<template>
  <div>
    <li class="editable-list-item" @mouseover="hover = true" @mouseleave="hover = false">
      <div class="item-input-wrapper" :class="{'input-on-hover' : (hover && !editing)}">
        <editable-text-input
          :textValue="initTextValue"
          :textStyle="{textOverflow: 'ellipsis'}"
          :placeholder="placeholder"
          :autocompleteList="autocompleteList"
          @update="$emit('update', $event)"
          @focus="editing = true"
          @blur="editing = false"
          />
      </div>
      <font-awesome-icon v-if="hover && !editing" :icon="deleteIcon" class="delete-icon" @click="$emit('delete')" @mousedown="mouseDownOnDelete = true" @mouseup="mouseDownOnDelete = false" @mouseleave="mouseDownOnDelete = false" />
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
    autocompleteList: { default: () => [] },
    placeholder: { required: true }
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
    }
  }
}
</script>

<style scoped>
li.editable-list-item {
  padding-left: 2px;
  border-top: 2px solid black;
}
.item-input-wrapper {
  width: 80%;
  display: inline-block;
}
.input-on-hover {
  width: 70%;
}
.delete-icon {
  float: right;
  padding: 1px 1px 0 0;
}
</style>
