<template>
  <div class="dropdown">
    <button
      @click="showOptions = !showOptions"
      :class="[showOptions ? 'button-with-list' : '']">
      <span v-if="title">{{ title }}</span>{{ options[selected] }}
    </button>
    <div v-if="showOptions" class="options-list">
      <ul>
        <li v-for="(option, index) in options"
          @click="setSelected(index); showOptions = false"
          :class="[selected === index ? 'selected' : '']">{{ option }}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'dropdown',
  props: {
    options: { required: true },
    initSelected: { required: false, default: 0 },
    title: { required: false, default: null }
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

<style type="text/css" scoped>
.dropdown {
  position: relative;
  z-index: 777;
}
.options-list {
  position: absolute;
  top: 23px;
  width: 100%;
  background-color: white;
}
button {
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  font-size: 10pt;
  font-weight: bold;
  outline: none;
}
button:hover {
  background-color: #ccc;
}
button:active {
  background-color: black;
  color: white;
}
.button-with-list {
  border-radius: 3px 3px 0 0;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 2px 0;
  border: 1px solid black;
  border-top: none;
  border-radius: 0 0 3px 3px;
}
li {
  font-size: 10pt;
  font-family: system-ui;
  padding: 2px 0 2px 8px;
}
li:hover {
  background-color: #ccc;
}
li:active {
  background-color: black;
  color: white;
}
.selected {
  background-color: #ccc;
  color: black;
}
</style>