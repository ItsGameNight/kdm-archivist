<template>
  <div class="Timeline" :class="[themeClass]">
    <table class="Timeline__table">
      <thead>
        <tr>
          <th>Year</th>
          <th>Settlement Event</th>
          <th>Story Events</th>
        </tr>
      </thead>
      <tbody :class="[themeClass]">
        <timeline-year
          v-for="(year, index) in currentSettlement.timeline"
          :key="index"
          :year="year"
          :checked="year.number <= currentSettlement.lanternYear"
          @update="update(index, $event)"
          @updateYear="updateYear(index, $event)" />
      </tbody>
      <tr>
        <td class="Timeline__buttonWrapper">
          <button
            class="Timeline__addButton"
            :class="[themeClass]"
            :disabled="inHistoryMode"
            @click="addYear()">
            +
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import TimelineYear from './TimelineYear'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'settlement-timeline',
  components: { TimelineYear },
  mixins: [ThemeClass],
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

<style lang="scss" scoped>
.Timeline {
  width: 100%;

  &__table {
    width: 655px;
    margin: 0 auto;
    table-layout: fixed;
    border-spacing: 0;

    thead tr {
      display: block;
      position: relative;
    }

    th {
      padding-right: 23px;
      padding-bottom: 4px;
      font-size: 10pt;
    }

    tbody {
      display: block;
      width: 100%;
      height: 560px;
      border-width: 2px;
      border-style: solid;
      border-left: none;
      border-right: none;
      overflow: auto;

      &.theme-light {
        border-color: $light-border;
      }

      &.theme-dark {
        border-color: $dark-border;
      }
    }
  }

  &__buttonWrapper {
    position: relative;
    width: 100%;
  }

  &__addButton {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12pt;
    border-width: 2px;
    border-style: solid;
    border-radius: 0 0 2px 2px;
    border-top: none;

    &.theme-dark {
      background-color: $dark-bg;
    }

    &:hover {
      font-size: 14pt;
      font-weight: bold;

      &.theme-light {
        background-color: $light-bg;
      }

      &.theme-dark {
        background-color: $dark-bg;
      }
    }

    &:active {
      &.theme-light {
        color: $light-bg;
        background-color: $light-text;
      }

      &.theme-dark {
        color: $dark-bg;
        background-color: $dark-text;
      }
    }
  }
}
</style>
