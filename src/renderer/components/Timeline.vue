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
          @update="update(index, $event)" />
      </tbody>
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
</style>