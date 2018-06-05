<template>
  <div class="notes-tab">
    <h2>Notes</h2>
    <textarea
      class="notes-input"
      placeholder="What happened this year?"
      v-model="currNote"
      >
    </textarea>
      <button class="add-note" @click="addNote"> + </button>

    <div v-if="currentSettlement.notes.length > 0">
      <h3>Past Notes:</h3>
      <div v-for="(note, index) in sortedNotes" class="past-note">
        <b> Lantern Year {{ note.lanternYear }} </b>
        <button class="delete-note" @click="deleteNote(index)">x</button>
        <button class="delete-note" @click="setCurrentSnapByLanternYear(note.lanternYear)">
          <font-awesome-icon :icon="histIcon"/>
        </button>
        <br>
        {{ note.body }}
        <br>
        <p class="note-timestamp">
        {{ note.timeStr }}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faHistory } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'notes-tab',
  components: { FontAwesomeIcon },
  computed: {
    ...mapGetters(['currentSettlement']),
    sortedNotes: function () {
      var notesClone = JSON.parse(JSON.stringify(this.currentSettlement.notes))
      return notesClone.sort((a, b) => { return b.time - a.time })
    },
    histIcon: function () {
      return faHistory
    }
  },
  data: function () {
    return {
      currNote: ''
    }
  },
  methods: {
    ...mapActions([
      'updateSettlement',
      'setCurrentSnapByLanternYear'
    ]),
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
      this.currNote = ''
    },

    deleteNote: function (idx) {
      var oldNotes = JSON.parse(JSON.stringify(this.sortedNotes))
      oldNotes.splice(idx, 1)
      this.updateSettlement({ id: this.currentSettlement._id, update: { notes: oldNotes } })
    }
  }
}
</script>

<style scoped>
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
  padding-left: 5px;
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
p.note-timestamp {
  color: gray;
  font-size: 8px;
  text-align: right;
  margin-right: 5px;
}
button.add-note {
  float: right;
  background-color: white;
  font-size: 14pt;
  font-weight: normal;
  padding: 0px 8px 3px 8px;
  border: 2px solid black;
  border-top: none;
  border-radius: 0 0 2px 2px;
  outline: none;
}
button.add-note:hover {
  font-weight: bold;
  font-size: 16pt;
}
button.add-note:active {
  background: black;
  color: white;
}

button.delete-note {
  float: right;
  background-color: white;
  font-size: 8pt;
  font-weight: normal;
  padding: 0px 8px 3px 8px;
  border: 2px solid black;
  border-top: none;
  border-right: none;
  border-radius: 0 0 2px 2px;
  outline: none;
}
button.delete-note:hover {
  font-weight: bold;
  font-size: 10pt;
}
button.delete-note:active {
  background: black;
  color: white;
}
</style>
