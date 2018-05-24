<template>
  <div class="notes-tab">
    <h2>Notes</h2>
    <textarea
      class="notes-input"
      placeholder="What happened this year?"
      :value="currentSettlement.notes"
      @input="updateNotes"
      >
    </textarea>

    <div v-if="snapshotNotesForCurrentSettlement.length > 0">
      <h3>Past Notes:</h3>
      <div v-for="snap in snapshotNotesForCurrentSettlement" class="past-note">
        <b>Lantern Year {{ snap.lanternYear }}:</b>
        <br>
        <p>{{ snap.notes }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'notes-tab',
  computed: {
    ...mapGetters([
      'currentSettlement',
      'snapshotNotesForCurrentSettlement'
    ])
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
  height:40%;
  background: white;
  box-sizing: border-box;
  border-style: solid;
  border-width: 2px;
  padding: 10px;
  font-size: 12pt;
  outline: none;
}
.past-note {
  background: white;
  margin-bottom: 10px;
  padding: 5px;
  box-sizing: border-box;
  border-style: solid;
  border-width: 2px;
}
div.notes-tab {
  background: white;
  height: 600px;
  width: 250px;
  position: absolute;
  right: 0px;
  overflow-y: scroll;
  z-index: 98;
  border-left: 1px solid black;
  padding: 0px 10px 0px 10px;
}
</style>
