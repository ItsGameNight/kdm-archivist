<template>
  <div class="Notes" :class="[themeClass]">
    <h2>Notes</h2>
    <textarea
      class="Notes__input"
      :class="[themeClass, altColor]"
      :disabled="inHistoryMode"
      placeholder="What happened this year?"
      v-model="currNote">
    </textarea>
    <button
      class="Notes__button button--add"
      :class="[themeClass, altColor]"
      :disabled="inHistoryMode"
      @click="addNote">
      +
    </button>
    <div v-if="currentSettlement.notes.length > 0">
      <h3>Past Notes:</h3>
      <div v-for="(note, index) in sortedNotes" class="Notes__pastNote" :class="[themeClass, altColor]">
        <b> Lantern Year {{ note.lanternYear }} </b>
        <button
          class="Notes__button button--delete"
          :class="[themeClass, altColor]"
          :disabled="inHistoryMode"
          @click="deleteNote(index)">
          x
        </button>
        <button
          class="Notes__button button--history"
          :class="[themeClass, altColor]"
          :disabled="inHistoryMode"
          @click="setCurrentSnapByLanternYearAndNoteID({ ly: note.lanternYear, noteID: note._id })">
          <font-awesome-icon :icon="histIcon"/>
        </button>
        <br>
        {{ note.body }}
        <br>
        <p class="Notes__timestamp" :class="[themeClass, highlightColor]">
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
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'notes-tab',
  components: { FontAwesomeIcon },
  mixins: [ThemeClass],
  computed: {
    ...mapGetters([
      'inHistoryMode',
      'currentSettlement'
    ]),
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
      'setCurrentSnapByLanternYearAndNoteID',
      'createSnapshot'
    ]),
    addNote: function () {
      var d = new Date()
      var dateStr = d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
      var fullNote = {
        _id: 'id_' + Date.now(),
        body: this.currNote,
        time: Date.now(),
        timeStr: dateStr,
        lanternYear: this.currentSettlement.lanternYear
      }
      var oldNotes = JSON.parse(JSON.stringify(this.currentSettlement.notes))
      oldNotes.push(fullNote)
      this.updateSettlement({ id: this.currentSettlement._id, update: { notes: oldNotes } })
      this.currNote = ''

      // create snapshot with this noteID!
      this.createSnapshot({ smtID: this.currentSettlement._id, noteID: fullNote._id })
    },

    deleteNote: function (idx) {
      var oldNotes = JSON.parse(JSON.stringify(this.sortedNotes))
      oldNotes.splice(idx, 1)
      this.updateSettlement({ id: this.currentSettlement._id, update: { notes: oldNotes } })
    }
  }
}
</script>

<style lang="scss" scoped>
.Notes {
  position: absolute;
  top: 0;
  right: 0;
  min-height: 600px;
  height: 100%;
  width: 250px;
  padding: 0 10px;
  overflow-y: scroll;
  z-index: 98;
  border-left-width: 1px;
  border-left-style: solid;

  &__input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 40%;
    padding: 10px;
    font-size: 12pt;
    border-width: 2px;
    border-style: solid;
    overflow-y: scroll;
    outline: none;
    resize: none;
  }

  &__pastNote {
    box-sizing: border-box;
    margin-bottom: 10px;
    padding-left: 5px;
    border-width: 2px;
    border-style: solid;
  }

  &__timestamp {
    margin-right: 5px;
    font-size: 8pt;
    text-align: right;
  }

  &__button {
    float: right;
    font-size: 14pt;
    font-weight: normal;
    padding: 0 8px 3px 8px;
    border-width: 2px;
    border-radius: 0 0 2px 2px;
    border-top: none;

    &:hover {
      font-weight: bold;
      font-size: 16pt;
    }

    &.button {
      &--delete,
      &--history {
        font-size: 8pt;
        border-right: none;

        &:hover {
          font-size: 10pt;
        }
      }
    }
  }
}
</style>
