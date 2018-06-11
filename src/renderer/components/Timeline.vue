<template>
  <div class="Timeline" :class="[themeClass]">
    <div class="Timeline__tableWrapper">
      <table class="Timeline__table">
        <thead>
          <tr>
            <th class="Timeline__yearHeader">Year</th>
            <th class="Timeline__eventHeader">Settlement Event</th>
            <th class="Timeline__storyHeader">Story Events</th>
          </tr>
        </thead>
        <tbody :class="[themeClass]">
          <div class="Timeline__bodyWrapper">
            <timeline-year
              v-for="(year, index) in currentSettlement.timeline"
              :key="index"
              :year="year"
              :checked="year.number <= currentSettlement.lanternYear"
              @update="update(index, $event)"
              @updateYear="updateYear(index, $event)" />
          </div>
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
  position: relative;
  width: 100%;
  height: 100%;

  &__tableWrapper {
    position: absolute;
    top: 10px;
    bottom: 0;
  }

  &__table {
    width: 95%;
    height: 100%;
    margin: 0 auto;
    table-layout: fixed;
    border-spacing: 0;

    &.theme-dark {
      border-color: $dark-border;
    }

    thead tr {
      display: block;
      position: relative;
    }

    th {
      display: inline-block;
      padding-bottom: 4px;
      font-size: 10pt;
      text-align: left;
    }

    tbody {
      display: block;
      width: 100%;
      height: 100%;
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

  &__yearHeader {
    width: 50px;
  }

  &__eventHeader {
    width: 27%;
  }

  &__bodyWrapper {
    display: table;
    width: 100%;
    height: 100%;
  }

  &__buttonWrapper {
    position: relative;
    width: 100%;
    height: 40px;
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
