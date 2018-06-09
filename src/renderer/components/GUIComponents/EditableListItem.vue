<template>
  <li
    class="EditableListItem"
    :class="[themeClass]"
    @mouseover="hover = true"
    @mouseleave="hover = false">
    <input
      v-if="numbered"
      class="EditableListItem__itemCount"
      :class="[numberEditable ? '' : 'itemCount--notEditable', themeClass]"
      :value="count"
      type="number"
      :style="{fontSize:textStyle.fontSize}"
      :disabled="inHistoryMode || !numberEditable"
      @input="$emit('updateCount', $event.target.value)">
    </input>
    <div
      class="EditableListItem__inputWrapper"
      :class="[{ 'inputWrapper--hover' : (hover && !editing) }, themeClass]">
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
    <div class="EditableListItem__deleteIconWrapper">
      <font-awesome-icon
        v-if="hover && !editing"
        class="EditableListItem__deleteIcon"
        :icon="deleteIcon"
        :style="deleteIconPadding"
        @click="$emit('delete')"
        @mousedown="mouseDownOnDelete = true"
        @mouseup="mouseDownOnDelete = false"
        @mouseleave="mouseDownOnDelete = false" />
    </div>
  </li>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faTimesCircle as farTimesCircle } from '@fortawesome/fontawesome-free-regular'
import { faTimesCircle as fasTimesCircle } from '@fortawesome/fontawesome-free-solid'
import EditableTextInput from './EditableTextInput'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'editable-list-item',
  components: { EditableTextInput, FontAwesomeIcon },
  mixins: [ThemeClass],
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
    ...mapGetters(['inHistoryMode']),
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

<style lang="scss" scoped>
.EditableListItem {
  position: relative;
  padding-left: 2px;
  border-top-width: 2px;
  border-top-style: solid;

  &__inputWrapper {
    display: inline-block;
    width: 85%;
  }

  &__deleteIconWrapper {
    position: absolute;
    right: 2px;
    top: 0;
  }

  &__itemCount {
    display: inline-block;
    width: 24px;
    padding-right: 6px;
    text-align: center;
    font-weight: bold;
    border: none;
    border-right-width: 1px;
    border-right-style: solid;
    outline: none;

    &.itemCount--notEditable {
      font-weight: normal;
      user-select: none;
    }
  }
}
</style>
