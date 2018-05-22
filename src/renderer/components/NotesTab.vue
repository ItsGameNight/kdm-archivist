<template>
  <div style="height: 500px;">
    <h3>Lantern Year {{ currentSettlement.lanternYear }} Notes</h3>
    <textarea
      class="notes-input"
      placeholder="What happened this year?"
      :value="currentSettlement.notes"
      @input="updateNotes"
      >
    </textarea>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'notes-tab',
  computed: {
    ...mapGetters(['currentSettlement'])
  },
  methods: {
    ...mapActions(['updateSettlement']),
    updateNotes: function (e) {
      var update = { notes: e.target.value }
      this.updateSettlement({ id: this.currentSettlement._id, update: update })
    }
  }
}
</script>

<style>
.notes-input {
  display: block;
  overflow-y: scroll;
  width:100%;
  height:50%;
  background: white;
  box-sizing: border-box;
  border-style: solid;
  border-width: 2px;
  padding: 10px;
  font-size: 12pt;
  outline: none;
}
</style>
