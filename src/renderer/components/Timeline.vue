<template>
  <div class="timeline-wrapper">
    <table class="timeline">
      <thead>
        <tr>
          <th>Year</th>
          <th>Settlement Event</th>
          <th>Story Events</th>
        </tr>
      </thead>
      <tbody>
        <timeline-year
          v-for="(year, index) in currentSettlement.timeline"
          :key="index"
          :year="year"
          :checked="year.number <= currentSettlement.lanternYear"
          @update="update(index, $event)"
          @updateYear="updateYear(index, $event)" />
      </tbody>
      <tr>
        <td class="button-wrapper">
          <button
            class="add-button"
            :disabled="inHistoryMode"
            @click="addYear()">
            +
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TimelineYear from './TimelineYear'

export default {
  name: 'settlement-timeline',
  components: { TimelineYear },
  computed: {
    ...mapGetters([
      'inHistoryMode',
      'currentSettlement'
    ])
  },
  methods: {
    ...mapActions([
      'updateSettlement'
    ]),
    update: function (index, value) {
      var timeline = JSON.parse(JSON.stringify(this.currentSettlement.timeline))
      timeline[index] = value
      var update = { timeline: timeline }
      this.updateSettlement({ id: this.currentSettlement._id, update: update })
    },
    updateYear: function (index, value) {
      var update = {}
      if (value) {
        update['lanternYear'] = index + 1
      } else {
        update['lanternYear'] = index
      }
      this.updateSettlement({ id: this.currentSettlement._id, update: update })
    },
    addYear: function () {
      var newYear = {
        number: this.currentSettlement.timeline.length + 1,
        settlementEvent: '',
        story: '',
        nemesis: '',
        checked: false
      }
      var timeline = JSON.parse(JSON.stringify(this.currentSettlement.timeline))
      timeline.push(newYear)
      var update = { timeline: timeline }
      this.updateSettlement({ id: this.currentSettlement._id, update: update })
    }
  }
}
</script>

<style scoped>
.timeline-wrapper {
  width: 100%;
}
table {
  width: 655px;
  margin: 0 auto;
  table-layout: fixed;
  border-spacing: 0;
}
thead tr {
  display: block;
  position: relative;
}
th {
  padding-right: 33px;
  padding-bottom: 4px;
  font-size: 10pt;
}
tbody {
  display: block;
  overflow: auto;
  width: 100%;
  height: 560px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}
.button-wrapper {
  position: relative;
  width: 100%;
}
.add-button {
  position: absolute;
  right: 0;
  top: 0;
  border: 2px solid black;
  border-top: none;
  background-color: white;
  border-radius: 0 0 2px 2px;
  font-size: 12pt;
  outline: none;
}
.add-button:hover {
  font-size: 14pt;
  font-weight: bold;
}
.add-button:active {
  color: white;
  background-color: black;
}
</style>
