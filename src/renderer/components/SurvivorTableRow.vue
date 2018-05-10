<template>
  <td @dblclick="collapsedView = !collapsedView">
    <div :class="['section', 'gscore', 'gscore' + String(yeeScore)]">
    </div>
    <div :class="['section', collapsedView ? 'basic-info-collapsed' : 'basic-info']">
      <div>
        <span :class="[collapsedView ? 'name-collapsed' : 'name']">{{ survivor.name }}</span>
        <div class="square-row sex">
          <div>
            <div :class="[survivor.sex === 'm' ? 'square' : 'empty-square']" @click="survivor.sex='m'"></div>
            M
          </div>
          <div>
            <div :class="[survivor.sex === 'f' ? 'square' : 'empty-square']" @click="survivor.sex='f'"></div>
            F
          </div>
        </div>
      </div>
      <div v-if="collapsedView" class="stat xp">
        <input class="value-no-border" :value="survivor.xp" :stat="'xp'" @input="updateNumberValue" @dblclick.stop />
        <div class="title">XP</div>
      </div>
    </div>
    <div :class="['section', collapsedView ? 'stats-collapsed' : 'stats-info']">
      <div v-if="!collapsedView" class="square-row xp-bar">
        <span class="title">Hunt XP ({{ survivor.xp }}): </span>
        <div v-for="n in 16" :class="huntXpSquareClass(survivor.xp, n)" @click="setBox" :n="n" :stat="'xp'" @dblclick.stop></div>
      </div>
      <div class="wrapper survival-insanity">
        <div class="stats-display">
          <div class="stat">
            <input class="value" :value="survivor.survival" :stat="'survival'" @input="updateNumberValue" @dblclick.stop />
            <div class="title">SUR</div>
          </div>
          <div class="stat">
            <input class="value" :value="survivor.insanity" :stat="'insanity'" @input="updateNumberValue" @dblclick.stop />
            <div class="title">INS</div>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div class="stats-display">
          <div class="stat">
            <input class="value" :value="survivor.movement" :stat="'movement'" @input="updateNumberValue" @dblclick.stop />
            <div class="title">MOV</div>
          </div>
          <div class="stat">
            <input class="value" :value="survivor.strength" :stat="'strength'" @input="updateNumberValue" @dblclick.stop />
            <div class="title">STR</div>
          </div>
          <div class="stat">
            <input class="value" :value="survivor.accuracy" :stat="'accuracy'" @input="updateNumberValue" @dblclick.stop />
            <div class="title">ACC</div>
          </div>
          <div class="stat">
            <input class="value" :value="survivor.evasion" :stat="'evasion'" @input="updateNumberValue" @dblclick.stop />
            <div class="title">EVA</div>
          </div>
          <div class="stat">
            <input class="value" :value="survivor.luck" :stat="'luck'" @input="updateNumberValue" @dblclick.stop />
            <div class="title">LCK</div>
          </div>
          <div class="stat">
            <input class="value" :value="survivor.speed" :stat="'speed'" @input="updateNumberValue" @dblclick.stop />
            <div class="title">SPD</div>
          </div>
        </div>
      </div>
      <div v-if="collapsedView" class="wrapper courage-under">
        <div class="stats-display">
          <div class="stat">
            <input class="value-no-border" :value="survivor.courage" :stat="'courage'" @input="updateNumberValue" @dblclick.stop />
            <div class="title">CRG</div>
          </div>
          <div class="stat">
            <input class="value-no-border" :value="survivor.understanding" :stat="'understanding'" @input="updateNumberValue" @dblclick.stop />
            <div class="title">UND</div>
          </div>
          <div class="stat">
            <input class="value-no-border" :value="survivor.weaponProficiencyLevel" :stat="'weaponProficiencyLevel'" @input="updateNumberValue" @dblclick.stop />
            <div class="title">WPN</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!collapsedView" class="section progress">
      <div class="progress-bar">
        <span class="title">Courage ({{ survivor.courage }}): </span>
        <div class="square-row">
          <div v-for="n in 9" :class="courageBoldXpSquareClass(survivor.courage, n)" @click="setBox" :n="n" :stat="'courage'" @dblclick.stop></div>
        </div>
      </div>
      <div class="progress-bar">
        <span class="title">Understanding ({{ survivor.understanding }}): </span>
        <div class="square-row">
          <div v-for="n in 9" :class="courageBoldXpSquareClass(survivor.understanding, n)" @click="setBox" :n="n" :stat="'understanding'" @dblclick.stop></div>
        </div>
      </div>
      <div class="progress-bar">
        <span class="title">Weapon Proficiency ({{ survivor.weaponProficiencyLevel }}): </span>
        <div class="square-row">
          <div v-for="n in 8" :class="weaponXpSquareClass(survivor.weaponProficiencyLevel, n)" @click="setBox" :n="n" :stat="'weaponProficiencyLevel'" @dblclick.stop></div><div class="invisible-square"></div>
        </div>
        <span class="detail">Weapon Type: <span class="weapon-prof" v-if="survivor.weaponProficiency">{{ survivor.weaponProficiency }}</span><span v-else>______</span></span>
      </div>
    </div>
  </td>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'survivor-table-row',
  props: {
    survivor: {},
    collapsed: { default: false },
    yeeScore: 0
  },
  data: function () {
    return {
      collapsedView: this.collapsed
    }
  },
  watch: {
    collapsed: function (newVal, oldVal) {
      this.collapsedView = newVal
    }
  },
  methods: {
    ...mapActions([
      'updateSurvivor'
    ]),
    updateNumberValue (e) {
      var value = e.target.value
      if (value !== '' && !isNaN(parseFloat(value))) {
        // unpack the event
        var update = {}
        update[e.target.getAttribute('stat')] = Number(value)
        // update backend
        this.updateSurvivor({ id: this.survivor._id, update: update })
      }
    },
    huntXpSquareClass (xp, n) {
      if (n <= xp) {
        return 'square'
      } else if (n === 2 || n === 6 || n === 10 || n === 15) {
        return 'empty-square-bold'
      } else if (n === 16) {
        return 'empty-square-extra-bold'
      } else {
        return 'empty-square'
      }
    },
    courageBoldXpSquareClass (xp, n) {
      if (n <= xp) {
        return 'square'
      } else if (n === 3 || n === 9) {
        return 'empty-square-bold'
      } else {
        return 'empty-square'
      }
    },
    weaponXpSquareClass (xp, n) {
      if (n <= xp) {
        return 'square'
      } else if (n === 3 || n === 8) {
        return 'empty-square-bold'
      } else {
        return 'empty-square'
      }
    },
    setBox (e) {
      // unpack event
      var statID = e.target.getAttribute('stat')
      var n = e.target.getAttribute('n')
      var update = {}

      if (this.survivor[statID] === Number(n)) {
        update[statID] = Number(n - 1)
      } else {
        update[statID] = Number(n)
      }
      // update store
      this.updateSurvivor({ id: this.survivor._id, update: update })
    }
  }
}
</script>

<style>
td {
  display: flex;
  user-select: none;
  cursor: default;
}
.section {
  display: inline-block;
}
.basic-info {
  width: 20%;
}
.basic-info-collapsed {
  width: 30%;
  display: flex;
  flex-direction: row;
}
.stats-info {
  width: 50%;
  margin-right: auto;
}
.stats-collapsed {
  width: 70%;
}
.progress {
  width: 30%;
}
.square-row {
  height: 16px;
  line-height: 12px;
  text-align: right;
  display: flex;
  flex-direction: row;
  float: right;
  margin-top: 2px;
}
.progress .title {
  font-size: 10pt;
  font-variant-caps: small-caps;
  text-align: left;
  display: block;
  padding-top: 2px;
}
.progress .detail {
  font-size: 9pt;
  font-style: italic;
  display: block;
  text-align: left;
}
.progress-bar {
  float: right;
}
.square {
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  background: black;
  border: 1px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
.empty-square {
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  border: 1px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
.empty-square-bold {
  width: 8px;
  min-width: 8px;
  height: 8px;
  min-height: 8px;
  border: 2px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
.empty-square-extra-bold {
  width: 4px;
  min-width: 4px;
  height: 4px;
  min-height: 4px;
  border: 4px solid black;
  margin: 0px 2px;
  cursor: pointer;
}
.invisible-square {
  width: 10px;
  min-width: 10px;
  height: 10px;
  min-height: 10px;
  border: 1px solid white;
  margin: 0px 2px;
}
.name {
  display: inline-block;
  max-width: 11vw;
  font-weight: bold;
  margin-right: auto;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
}
.name-collapsed {
  display: inline-block;
  max-width: 12vw;
  font-weight: bold;
  margin-right: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.wrapper {
  display: inline-block;
}
.stats-display {
  display: flex;
  flex-direction: row;
  margin-right: 5px;
}
.stat {
  padding: 5px;
  text-align: center;
}
.stat .value {
  width: 1em;
  min-width: 1em;
  height: 1em;
  min-height: 1em;
  font-size: 18pt;
  text-align: center;
  border: 1px solid black;
  border-radius: 2px;
}
.stat .value-no-border {
  width: 1em;
  min-width: 1em;
  height: 1em;
  min-height: 1em;
  font-size: 18pt;
  text-align: center;
  border: 1px solid white;
  //padding-bottom: 0.1em;
}
.stat .title {
  font-size: 8pt;
  margin-top: 2px;
}
.sex {
  font-size: 8pt;
  text-align: center;
  padding: 3px 0 5px 0;
  float: none;
}
.xp {
  margin-left: auto;
}
.xp-bar {
  margin-left: 0;
  float: none;
}
.xp-bar .title {
  font-size: 10pt;
  font-variant-caps: small-caps;
  min-width: 6em;
  text-align: left;
}
.weapon-prof {
  text-decoration: underline;
}
.gscore {
  width: 8px;
  margin-right: 5px;
}
.gscore0 {
  background: #f4c7c3;
}
.gscore1 {
  background: #fce8b2;
}
.gscore2 {
  background: #b7e1cd;
}
.gscore3 {
  background: #03ff00;
}
.gscore4 {
  background: #00ffff;
}
.gscore5 {
  background: #b380ff;
}
@media all and (max-width: 1060px) {
  .courage-under {
    display: none;
  }
  .basic-info {
    width: auto;
    margin-right: 5px;
  }
  .name {
    width: 6vw;
  }
}
@media all and (max-width: 800px) {
  .survival-insanity {
    display: none;
  }
}
</style>
