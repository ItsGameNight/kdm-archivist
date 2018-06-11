<template>
  <div class="Storage">
    <div class="Storage__column">
      <h3>Resources</h3>
      <editable-list
        :listItems="currentSettlement.resources"
        :autocompleteList="resourceNames"
        numbered
        :textStyle="{fontSize:'12pt'}"
        :fixedHeight="'85%'"
        @update="update('resources', $event)"
        ></editable-list>
    </div>
    <div class="Storage__column">
      <h3>Gear</h3>
      <editable-list
        :listItems="currentSettlement.storedGear"
        numbered
        :textStyle="{fontSize:'12pt'}"
        :fixedHeight="'85%'"
        @update="update('storedGear', $event)"
        ></editable-list>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex'
import { EditableList } from './GUIComponents'
import { Resources } from '../assets/StaticGameData'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'settlement-storage',
  components: { EditableList },
  mixins: [ThemeClass],
  computed: {
    ...mapGetters([
      'currentSettlement'
    ]),
    resourceNames: function () {
      return Object.values(Resources).map((o) => { return o.name })
    }
  },
  methods: {
    ...mapActions([
      'updateSettlement'
    ]),
    update: function (stat, val) {
      var update = {}
      update[stat] = val
      this.updateSettlement({ id: this.currentSettlement._id, update: update })
    }
  }
}
</script>

<style lang="scss" scoped>
.Storage {
  display: flex;
  flex-direction: row;
  position: relative;
  height: 100%;
  overflow: hidden;

  h3 {
    margin: 0 auto 8px auto;
  }

  &__column {
    width: 50%;
    padding: 5px;
  }
}
</style>
