<template>
  <td @click.stop="setCurrentSmt(settlement._id)" :class="[selected ? 'selected' : '']">
    <span>{{ settlement._id }}</span>
  </td>
</template>

<script>
export default {
  name: 'settlement-table-row',
  props: {
    settlement: {},
    selected: false
  },
  methods: {
    setCurrentSmt: function (smtID) {
      this.$emit('smt-select', smtID)
    }
  }
}
</script>

<style>
.selected {
  background: #ADD8E6;
}
</style>