<template>
  <div>
  <input class="editable-text-input" ref="eIn" :style="editableStyle" :value="textValue" @mouseover="hover = true" @mouseleave="hover = false" @focus="focus = true" @blur="focus = false" @keyup.enter="$refs.eIn.blur()" @input="$emit('update', $event)" />
</div>
</template>

<script>
export default {
  name: 'editable-text-input',
  props: {
    textValue: { required: true },
    textStyle: { default: {} }
  },
  data: function () {
    return {
      bgImgUrl: 'static/pencil.png',
      hover: false,
      focus: false
    }
  },
  computed: {
    editableStyle: function () {
      if (this.focus) {
        return {
          ...this.textStyle,
          backgroundImage: 'url(' + this.bgImgUrl + ')',
          width: '95%',
          paddingRight: '1em',
          fontWeight: 'normal'
        }
      } else if (this.hover) {
        return {
          ...this.textStyle,
          backgroundImage: 'url(' + this.bgImgUrl + ')',
          width: '95%',
          paddingRight: '1em'
        }
      } else {
        return this.textStyle
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
  background-position: right center;
  user-select: default;
}
::selection {
  background: #d8d8d8;
}
</style>