<template>
  <tr class="TimelineYear">
    <td class="TimelineYear__tableCell tableCell--year" :class="[themeClass]">
      <div class="TimelineYear__squareToggleWrapper">
        <square-toggle
          :initValue="checked"
          :statDisplayName="''"
          :squareSize="12"
          @update="$emit('updateYear', $event)" />
      </div>
      <span class="TimelineYear__year">{{ year.number }}</span>
    </td>
    <td class="TimelineYear__tableCell tableCell--event" :class="[themeClass]">
      <div class="TimelineYear__cellSection cellSection--event">
        <img v-if="themeClass==='theme-light'" src="~@/assets/img/se.png" />
        <img v-if="themeClass==='theme-dark'" src="~@/assets/img/se-white.png" />
        <div class="TimelineYear__inputWrapper inputWrapper--event">
          <editable-text-input
            :textValue="year.settlementEvent"
            :textStyle="{fontSize: '11pt'}"
            :placeholder="'Random'"
            @update="update('settlementEvent', $event)" />
        </div>
      </div>
      <div v-if="!nemesis" class="TimelineYear__cellSection cellSection--story">
        <img v-if="themeClass==='theme-light'" src="~@/assets/img/story.png" />
        <img v-if="themeClass==='theme-dark'" src="~@/assets/img/story-white.png" />
        <div class="TimelineYear__inputWrapper inputWrapper--story">
          <editable-text-input
            :textValue="year.story"
            :textStyle="{ fontSize: '11pt', textOverflow: 'ellipsis' }"
            :placeholder="'None'"
            @update="update('story', $event)" />
        </div>
      </div>
      <div v-if="nemesis" class="TimelineYear__cellSection cellSection--nemesis">
        <img v-if="themeClass==='theme-light'" src="~@/assets/img/nemesis.png" />
        <img v-if="themeClass==='theme-dark'" src="~@/assets/img/nemesis-white.png" />
        <div class="TimelineYear__inputWrapper inputWrapper--nemesis">
          <editable-text-input
            :textValue="year.nemesis"
            :textStyle="{ fontSize: '11pt', textOverflow: 'ellipsis' }"
            :placeholder="'None'"
            @update="update('nemesis', $event)" />
        </div>
      </div>
    </td>
  </tr>
</template>

<script type="text/javascript">
import { SquareToggle, EditableTextInput } from './GUIComponents'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'timeline-year',
  components: { SquareToggle, EditableTextInput },
  mixins: [ThemeClass],
  props: {
    year: { required: true },
    checked: { required: true }
  },
  computed: {
    nemesis: function () {
      return this.year.nemesis !== ''
    }
  },
  methods: {
    update: function (prop, value) {
      var newYear = JSON.parse(JSON.stringify(this.year))
      newYear[prop] = value
      this.$emit('update', newYear)
    }
  }
}
</script>

<style lang="scss" scoped>
.TimelineYear {
  &__tableCell {
    padding: 2px;
    border-width: 2px;
    border-style: solid;
    border-bottom: none;

    &.tableCell {
      &--year {
        width: 45px;
        border-right: none;
      }

      &--event {
        border-left: none;
      }
    }
  }

  &__cellSection {
    display: inline-block;

    &.cellSection {
      &--event {
        width: 30%;
        min-width: 135px;
      }

      &--story,
      &--nemesis {
        width: 68%;
      }
    }
  }

  &__year {
    font-weight: bold;
    font-size: 10pt;
  }

  img {
    height: 25px;
    width: 25px;
    vertical-align: middle;
  }

  &__squareToggleWrapper {
    display: inline-block;
    padding-left: 2px;
  }

  &__inputWrapper {
    display: inline-block;
    padding: 2px 15px 2px 0;

    &.inputWrapper {
      &--event {
        width: -webkit-calc(100% - 50px);
      }

      &--story,
      &--nemesis {
        width: -webkit-calc(100% - 50px);
      }
    }
  }
}

tr:last-child td {
  border-bottom-width: 2px;
  border-bottom-style: solid;
}
</style>