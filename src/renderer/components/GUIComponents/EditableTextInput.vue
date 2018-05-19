<template>
  <div>
    <input
      class="editable-text-input"
      ref="eIn"
      :placeholder="placeholder"
      :type="inputType"
      :style="editableStyle"
      :value="textValue"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      @focus="focus = true; $emit('focus')"
      @blur="focus = false; $emit('blur'); selectCompletion()"
      @keyup.enter="selectCompletionAndExit()"
      @input="$emit('update', $event.target.value)"
      @keyup.down.prevent="downList()"
      @keyup.up.prevent="upList()"
      @keydown.tab.prevent
      @keyup.tab.prevent="selectCompletion()" />

    <div v-if="okayToShowAutocomplete" class="autocomplete-list">
      <div
        v-for="(item, index) in filteredList"
        :class="['autocomplete-item', index === filteredIdx ? 'activeComplete' : '']"
        @mouseover="filteredIdx = index"
        @mouseleave="filteredIdx = -1" >
        <div v-if="textValue != null">
        <b>{{ item.substring(0, textValue.length) }}</b>{{ item.substring(textValue.length) }}
        </div>
        <div v-else>
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editable-text-input',
  props: {
    placeholder: { required: false, default: 'Text...' },
    textValue: { required: true },
    textStyle: { default: null },
    inputType: { default: 'text' },
    autocompleteList: { default: () => [] } // need function so not all have same list!
  },
  data: function () {
    return {
      bgImgUrl: 'static/pencil.png',
      hover: false,
      focus: false,
      filteredIdx: -1
    }
  },
  computed: {
    editableStyle: function () {
      if (this.focus) {
        return {
          ...this.textStyle,
          backgroundImage: 'url(' + this.bgImgUrl + ')',
          paddingLeft: '1em',
          fontWeight: 'normal',
          fontStyle: 'normal'
        }
      } else if (this.hover) {
        return {
          ...this.textStyle,
          backgroundImage: 'url(' + this.bgImgUrl + ')',
          paddingLeft: '1em'
        }
      } else {
        return this.textStyle
      }
    },

    okayToShowAutocomplete: function () {
      // check that >= 1 character in text (or already in list -- allows down arrow)
      if (this.filteredIdx > -1 || (this.textValue !== null && this.textValue.length > 0)) {
        // check filtered list has stuff + focus on
        if (this.focus && this.filteredList.length > 0) {
          return true
        }
      }
      return false
    },

    filteredList: function () {
      if (this.textValue == null) {
        return this.autocompleteList
      }
      return this.autocompleteList.filter((s) => {
        return s.substring(0, this.textValue.length) === this.textValue
      })
    }
  },
  methods: {
    upList: function () {
      // decrement idx
      if (this.filteredIdx > -1) {
        this.filteredIdx--
      }
    },

    downList: function () {
      // update idx
      if (this.filteredIdx < this.filteredList.length - 1) {
        this.filteredIdx++
      }
    },

    selectCompletion: function () {
      if (this.filteredIdx > -1 && this.filteredIdx < this.filteredList.length) {
        // update!
        this.$emit('update', this.filteredList[this.filteredIdx])

        // reset idx
        this.filteredIdx = -1
      }
    },

    selectCompletionAndExit: function () {
      this.selectCompletion()
      this.$refs.eIn.blur()
    }
  }
}
</script>

<style>
.editable-text-input {
  width: 100%;
  outline: none;
  border: none;
  background-image: none;
  background-repeat: no-repeat;
  background-size: 0.8em;
  background-position: left center;
  user-select: default;
  cursor: text;
}
::selection {
  background: #d8d8d8;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.autocomplete-list {
  position: absolute;
  background: white;
  border-style: solid;
  border-width: 2px;
  z-index: 99;
  max-height: 120px;
  overflow-y: scroll;
}

.autocomplete-item {
  border-style: solid;
  border-width: 1px;
  padding-left: 3px;
  width: 100px;
}

.autocomplete-item:hover {
  background-color: gray;
}

.activeComplete {
  background-color: gray;
}
</style>