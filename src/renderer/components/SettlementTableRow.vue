<template>
  <td @click.stop="setCurrentSmt(smtID)" :class="[selected ? 'selected' : '']">
    <div v-if="this.editing">
      <input v-model="name" placeholder="Edit Me!"></input>
      <button class="editBtn" @click.stop="toggleEdit()">Done</button>
    </div>
    <div v-else>
      <span v-if="name !== null && name !== ''">
        {{ name }}
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
    smtID: 0,
    index: 0,
    selected: false
  },
  data: function () {
    return {
      editing: false
    }
  },
  computed: {
    name: {
      get () {
        return this.$store.state.settlements[this.index].name
      },
      set (value) {
        this.updateSettlement({ id: this.smtID, update: { name: value } })
      }
    }
  },
  methods: {
    ...mapActions([
      'updateSettlement'
    ]),
    setCurrentSmt: function (smtID) {
      this.$emit('smt-select', smtID)
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
