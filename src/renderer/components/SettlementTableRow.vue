<template>
  <td @click.stop="setCurrentSmt(settlement._id)" :class="[selected ? 'selected' : '']">
    <span v-if="settlement.name !== null">settlement.name</span>
    <span v-else>NAME ME!</span>
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
