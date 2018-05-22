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
      @input="$emit('update', $event.target.value); filteredIdx=-1;"
      @keyup.down.prevent="downList()"
      @keyup.up.prevent="upList()"
      @keydown.tab.prevent
      @keyup.tab.prevent="selectCompletion()" />

    <div
      v-if="okayToShowAutocomplete"
      class="autocomplete-list"
      ref="autocompleteListElement">
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
        return s.substring(0, this.textValue.length).toLowerCase() === this.textValue.toLowerCase()
      })
    }
  },
  methods: {
    upList: function () {
      // decrement idx
      if (this.filteredIdx > -1) {
        this.filteredIdx--
        this.scrollSoActiveAutoItemVisible()
      }
    },

    downList: function () {
      // update idx
      if (this.filteredIdx < this.filteredList.length - 1) {
        this.filteredIdx++
        this.scrollSoActiveAutoItemVisible()
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
    },

    scrollSoActiveAutoItemVisible: function () {
      // scrolls via editing scrollTop property of autocompleteListElement
      // TODO: replace hacky 18px / 7 per page scrolling

      // if open...
      if (typeof this.$refs.autocompleteListElement !== 'undefined') {
        var topOfAutoItem = this.filteredIdx * 18 // each item 18px
        var botOfAutoItem = topOfAutoItem + 18

        // scroll if needed
        if (this.$refs.autocompleteListElement.scrollTop > topOfAutoItem) {
          this.$refs.autocompleteListElement.scrollTop -= 18
        } else if (this.$refs.autocompleteListElement.scrollTop + 126 < botOfAutoItem) {
          this.$refs.autocompleteListElement.scrollTop += 18
        }
      }
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
  border-width: 0px 2px 2px 2px;
  border-color: gray;
  border-radius: 0px 0px 8px 8px;
  margin-top: 2px;
  left: -2px;
  width: 100%;
  z-index: 99;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-height: 126px;
  overflow-y: scroll;
}

.autocomplete-item {
  padding-left: 8px;
}

.activeComplete {
  background-color: #E6E6E6;
}
</style>
