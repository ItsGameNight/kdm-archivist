<template>
  <tr>
    <td class="timeline-year year-cell">
      <div class="square-toggle-wrapper">
        <square-toggle
          :initValue="checked"
          :statDisplayName="''"
          :squareSize="12"
          @update="$emit('updateYear', $event)" />
      </div>
      <span class="year">{{ year.number }}</span>
    </td>
    <td class="timeline-year event-cell">
      <img :src="seImg" />
      <div class="input-wrapper se-wrapper">
        <editable-text-input
          :textValue="year.settlementEvent"
          :textStyle="{fontSize: '11pt'}"
          :placeholder="'Random'"
          @update="update('settlementEvent', $event)" />
      </div>
      <img v-if="!nemesis" :src="storyImg" />
      <div v-if="!nemesis" class="input-wrapper story-wrapper">
        <editable-text-input
          :textValue="year.story"
          :textStyle="{fontSize: '11pt'}"
          :placeholder="'None'"
          @update="update('story', $event)" />
      </div>
      <img v-if="nemesis" :src="nemImg" />
      <div v-if="nemesis" class="input-wrapper nem-wrapper">
        <editable-text-input
          :textValue="year.nemesis"
          :textStyle="{fontSize: '11pt'}"
          :placeholder="'None'"
          @update="update('nemesis', $event)" />
      </div>
    </td>
  </tr>
</template>

<script type="text/javascript">
import { SquareToggle, EditableTextInput } from './GUIComponents'

export default {
  name: 'timeline-year',
  components: { SquareToggle, EditableTextInput },
  props: {
    year: { required: true },
    checked: { required: true }
  },
  data: function () {
    return {
      seImg: 'static/se.png',
      storyImg: 'static/story.png',
      nemImg: 'static/depart.png'
    }
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

<style type="text/css" scoped>
td {
  background: white;
  padding: 2px;
}
.timeline-year {
  border: 2px solid black;
  border-bottom: none;
}
.year-cell {
  border-right: none;
  width: 50px;
}
.event-cell {
  border-left: none;
  width: 620px;
}
tr:last-child td {
  border-bottom: 2px solid black;
}
.year {
  font-family: system-ui;
  font-weight: bold;
  font-size: 10pt;
}
img {
  height: 25px;
  width: 25px;
  vertical-align: middle;
}
.square-toggle-wrapper {
  display: inline-block;
  padding-left: 2px;
}
.input-wrapper {
  display: inline-block;
  padding: 2px 15px 2px 0;
}
.se-wrapper {
  width: 15%;
}
.story-wrapper {
  width: 65%;
}
.nem-wrapper {
  width: 65%;
}
</style>