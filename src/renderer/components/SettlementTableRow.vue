<template>
  <td class="SettlementTableRow"
    :class="[selected ? 'selected' : '', themeClass]"
    @click.stop="setCurrentSmt(smtID)">
    <span v-if="editing">
      <input v-model="name" placeholder="Unnamed Settlement"></input>
    </span>
    <span v-else>
      {{ name }}
    </span>
    <button v-if="selected"
      class="SettlementTableRow__editButton"
      :class="themeClass"
      @click.stop="toggleEdit()">
        <span v-if="!editing">Edit</span>
        <span v-else>Done</span>
    </button>
  </td>
</template>

<script>
import { mapActions } from 'vuex'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'settlement-table-row',
  mixins: [ThemeClass],
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

<style lang="scss" scoped>
.SettlementTableRow {
  padding: 5px;

  &.theme-light {
    border: 2px solid $light-border;

    &.selected {
      background-color: $light-highlight;
    }
  }

  &.theme-dark {
    border: 2px solid $dark-input;

    &.selected {
      background-color: $dark-highlight;
    }
  }

  &__editButton {
    float: right;
    font-size: 8pt;
  }
}
</style>
