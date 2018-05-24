<template>
  <div class="notes-tab">
    <h2>Notes</h2>
    <textarea
      class="notes-input"
      placeholder="What happened this year?"
      v-model="currNote"
      >
    </textarea>
      <button
        @click="addNote">
        +
      </button>

    <div v-if="currentSettlement.notes.length > 0">
      <h3>Past Notes:</h3>
      <div v-for="note in sortedNotes" class="past-note">
        <b> Lantern Year {{ note.lanternYear }} </b>
        <br>
        {{ note.body }}
        <br>
        <p style="color: gray; font-size: 8px; text-align: right;">
        {{ note.timeStr }}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'notes-tab',
  computed: {
    ...mapGetters(['currentSettlement']),
    sortedNotes: function () {
      var notesClone = JSON.parse(JSON.stringify(this.currentSettlement.notes))
      return notesClone.sort((a, b) => { return b.time - a.time })
    }
  },
  data: function () {
    return {
      currNote: ''
    }
  },
  methods: {
    ...mapActions(['updateSettlement']),
    addNote: function () {
      var d = new Date()
      var dateStr = d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
      var fullNote = {
        body: this.currNote,
        time: Date.now(),
        timeStr: dateStr,
        lanternYear: this.currentSettlement.lanternYear
      }
      var oldNotes = JSON.parse(JSON.stringify(this.currentSettlement.notes))
      oldNotes.push(fullNote)
      this.updateSettlement({ id: this.currentSettlement._id, update: { notes: oldNotes } })
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
