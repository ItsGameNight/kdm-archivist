<template>
  <div class="Dropdown">
    <button
      class="Dropdown__button"
      :class="[showOptions ? 'Dropdown__button button--withList' : '', themeClass]"
      :style="[width > 0 ? { width: width + 'px' } : {} ]"
      @click="showOptions = !showOptions">
      <span v-if="title">{{ title }}</span>{{ options[selected] }}
    </button>
    <div v-if="showOptions" class="Dropdown__optionsList" :class="[themeClass]">
      <ul :class="[themeClass]">
        <li
          v-for="(option, index) in options"
          :class="[themeClass, dropdownItem, selected === index ? 'selected' : '']"
          @click="setSelected(index); showOptions = false">
            {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'dropdown',
  mixins: [ThemeClass],
  props: {
    options: { required: true },
    initSelected: { required: false, default: 0 },
    title: { required: false, default: null },
    width: { required: false, default: -1 }
  },
  watch: {
    initSelected: function (newVal) {
      this.selected = newVal
    }
  },
  data: function () {
    return {
      showOptions: false,
      selected: this.initSelected
    }
  },
  methods: {
    setSelected: function (index) {
      this.selected = index
      this.$emit('selected', this.selected)
    }
  }
}
</script>

<style lang="scss" scoped>
.Dropdown {
  position: relative;

  &__button {
    &.button {
      &--withList {
        border-radius: 3px 3px 0 0;
      }
    }
  }

  &__optionsList {
    position: absolute;
    top: 23px;
    width: 100%;
    z-index: 789;
  }

  ul {
    margin: 0;
    padding: 2px 0;
    list-style-type: none;
    border-width: 1px;
    border-style: solid;
    border-radius: 0 0 3px 3px;
    border-top: none;

    li {
      padding: 2px 0 2px 8px;
      font-size: 9pt;
    }
  }
}
</style>