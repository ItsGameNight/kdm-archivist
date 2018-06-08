<template>
  <div class="EditableTextInput">
    <input
      class="EditableTextInput__input"
      :class="[themeClass]"
      ref="eIn"
      :placeholder="placeholder"
      :type="inputType"
      :disabled="inHistoryMode"
      :style="textStyle"
      :value="textValue"
      @focus="focus = true; $emit('focus')"
      @blur="focus = false; selectCompletion(); $emit('blur');"
      @keyup.enter="selectCompletion(); $event.target.blur()"
      @input="$emit('update', $event.target.value); filteredIdx = -1;"
      @keydown.down.prevent="downList()"
      @keydown.up.prevent="upList()"
      @keydown.tab.prevent
      @keyup.tab.prevent="selectCompletion()"
      @keyup.esc="filteredIdx = -1; $event.target.blur()" />
    <div
      v-if="okayToShowAutocomplete"
      class="EditableTextInput__autocompleteList"
      :class="[themeClass]"
      :style="maxListHeightStyle"
      ref="autocompleteListElement">
      <div
        v-for="(item, index) in filteredList"
        class="EditableTextInput__autocompleteItem"
        :class="[index === filteredIdx ? 'activeComplete' : '', themeClass]"
        :key="index"
        :id="'autoItem-' + index"
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

<script type="text/javascript">
import { mapGetters } from 'vuex'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'editable-text-input',
  mixins: [ThemeClass],
  props: {
    placeholder: { required: false, default: 'Text...' },
    textValue: { required: true },
    textStyle: { default: null },
    inputType: { default: 'text' },
    autocompleteList: { default: () => [] }, // need function so not all have same list!
    parentHeight: { required: false, default: 9999 }
  },
  data: function () {
    return {
      bgImgUrl: 'static/pencil.png',
      focus: false,
      filteredIdx: -1,
      windowHeight: 0,
      boundingBox: null,
      containerHeight: this.parentHeight
    }
  },
  watch: {
    parentHeight: function (newVal) {
      this.containerHeight = newVal
    }
  },
  mounted: function () {
    // Need to detect changes to dynamically update maxHeight for autocomplete list
    this.windowHeight = window.innerHeight
    this.bottomPos = this.$el.getBoundingClientRect().bottom
    this.$nextTick(() => {
      // Detect window resizes
      window.addEventListener('resize', (e) => {
        this.windowHeight = window.innerHeight
        this.boundingBox = this.$el.getBoundingClientRect()
      })
      // Detect scrolls
      window.addEventListener('scroll', (e) => {
        this.windowHeight = window.innerHeight
        this.boundingBox = this.$el.getBoundingClientRect()
      })
    })
    // Detect insertions/deletion etc. from DOM
    var obs = new MutationObserver((mutations) => {
      this.windowHeight = window.innerHeight
      this.boundingBox = this.$el.getBoundingClientRect()
    })
    obs.observe(this.$root.$el, { childList: true, subtree: true })
  },
  computed: {
    ...mapGetters(['inHistoryMode']),

    okayToShowAutocomplete: function () {
      // check filtered list has stuff + focus on
      if (this.focus && this.filteredList.length > 0) {
        return true
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
    },

    maxListHeight: function () {
      var maxHeight = Math.min(126,
        Math.abs(this.windowHeight - (this.boundingBox.bottom + 10)),
        Math.abs(this.containerHeight - (this.boundingBox.bottom + 10)))
      return maxHeight
    },

    maxListHeightStyle: function () {
      return { maxHeight: this.maxListHeight + 'px' }
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
      if (typeof this.$refs.autocompleteListElement !== 'undefined' && this.filteredIdx >= 0) {
        var autoItemBox = this.$el.querySelector('#autoItem-' + this.filteredIdx).getBoundingClientRect()
        var topOfAutoItem = autoItemBox.top - this.boundingBox.top - this.boundingBox.height
        var botOfAutoItem = autoItemBox.bottom - this.boundingBox.top - this.boundingBox.height

        // scroll if needed
        if (topOfAutoItem < 0) {
          this.$refs.autocompleteListElement.scrollTop -= autoItemBox.height
        } else if (this.maxListHeight < botOfAutoItem) {
          this.$refs.autocompleteListElement.scrollTop += autoItemBox.height
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.EditableTextInput {
  position: relative;

  &__input {
    width: 100%;
    background-image: none;
    background-repeat: no-repeat;
    background-size: 0.8em;
    background-position: left center;
    border: none;
    -webkit-box-sizing: border-box;

    &:hover {
      padding-left: 1em;

      &.theme-light {
        background-image: url('~@/assets/img/pencil.png');
      }

      &.theme-dark {
        background-image: url('~@/assets/img/pencil-white.png');
      }
    }

    &:focus {
      padding-left: 1em;
      font-weight: normal;
      font-style: normal;

      &.theme-light {
        background-image: url('~@/assets/img/pencil.png');
      }

      &.theme-dark {
        background-image: url('~@/assets/img/pencil-white.png');
      }
    }
  }

  &__autocompleteList {
    position: absolute;
    left: -2px;
    width: 100%;
    max-height: 126px;
    margin-top: 2px;
    margin-right: 4px;
    font-size: 10pt;
    z-index: 99;
    overflow-y: scroll;
    border-width: 0 2px 2px 2px;
    border-style: solid;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    &.theme-light {
      background-color: $light-bg;
      border-color: $light-hover;
    }

    &.theme-dark {
      background-color: $dark-bg;
      border-color: $dark-hover;
    }
  }

  &__autocompleteItem {
    padding-left: 8px;

    &.activeComplete {
      &.theme-light {
        background-color: $light-highlight;
      }

      &.theme-dark {
        background-color: $dark-highlight;
      }
    }
  }
}
</style>
