<template>
  <div class="xp-square-row">
    <span class="hunt-xp-title">Hunt XP ({{ level }}): </span>
    <div v-for="n in 16" :class="huntXpSquareClass(level, n)" @click="$emit('xp-change', n)"></div>
  </div>
</template>

<script>
export default {
  name: 'hunt-xp-bar',
  props: {
    xp: { default: 0 }
  },
  data: function () {
    return {
      level: this.xp
    }
  },
  watch: {
    xp: function (newVal, oldVal) {
      console.log('asdasd')
      this.level = newVal
    }
  },
  methods: {
    huntXpSquareClass (xp, n) {
      if (n <= xp) {
        return 'square'
      } else if (n === 2 || n === 6 || n === 10 || n === 15) {
        return 'empty-square-bold'
      } else if (n === 16) {
        return 'empty-square-extra-bold'
      } else {
        return 'empty-square'
      }
    }
  }
}
</script>

<style>
.hunt-xp-title {
  font-size: 10pt;
  font-variant-caps: small-caps;
  text-align: left;
  display: block;
  padding-top: 2px;
  min-width: 6em;
}
.square {
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  background: black;
  border: 1px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
.empty-square {
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  border: 1px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
.empty-square-bold {
  width: 8px;
  min-width: 8px;
  height: 8px;
  min-height: 8px;
  border: 2px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
.empty-square-extra-bold {
  width: 4px;
  min-width: 4px;
  height: 4px;
  min-height: 4px;
  border: 4px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
.invisible-square {
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  border: 1px solid white;
  margin: 0px 2px;
}
.xp-square-row {
  height: 16px;
  line-height: 12px;
  text-align: right;
  display: flex;
  flex-direction: row;
  margin-top: 2px;
  margin-left: 0;
}
</style>