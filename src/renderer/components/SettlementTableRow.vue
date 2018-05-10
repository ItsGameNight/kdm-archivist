<template>
  <td @click.stop="setCurrentSmt(settlement._id)" :class="[selected ? 'selected' : '']">
    <div v-if="this.editing">
      <input v-model="textInput" placeholder="Edit Me!"></input>
      <button class="editBtn" @click.stop="setSettlementName(settlement._id)">Done</button>
    </div>
    <div v-else>
      <span v-if="settlement.name !== null">
        {{ settlement.name }}
        <button v-if="selected" class="editBtn" @click.stop="toggleEdit()">Edit</button>
      </span>
      <span v-else>
        NAME ME!
        <button v-if="selected" class="editBtn" @click.stop="toggleEdit()">Edit</button>
      </span>
    </div>
  </td>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'settlement-table-row',
  props: {
    settlement: {},
    selected: false
  },
  data: function () {
    return {
      textInput: '',
      editing: false
    }
  },
  methods: {
    ...mapActions([
      'updateSettlement'
    ]),
    setCurrentSmt: function (smtID) {
      this.$emit('smt-select', smtID)
    },
    setSettlementName: function (smtID) {
      if (this.textInput !== '') {
        this.updateSettlement({
          id: smtID,
          update: { name: this.textInput }
        })
      }
      this.editing = false
    },
    toggleEdit: function () {
      this.editing = !this.editing
    }
  }
}
</script>

<style>
.selected {
  background: #ADD8E6;
}
.editBtn {
  float: right
}
</style>
