<template>
  <td @dblclick="collapsedView = !collapsedView">
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
        <div class="value-no-border">{{ survivor.xp }}</div>
        <div class="title">XP</div>
      </div>
    </div>
    <div :class="['section', collapsedView ? 'stats-collapsed' : 'stats-info']">
      <div v-if="!collapsedView" class="square-row xp-bar">
        <span class="title">Hunt XP ({{ survivor.xp }}): </span>
        <div v-for="n in 16" :class="huntXpSquareClass(survivor.xp, n)" @click="setHuntXp(survivor, n)" @dblclick.stop></div>
      </div>
      <div class="wrapper survival-insanity">
        <div class="stats-display">
          <div class="stat">
            <div class="value">{{ survivor.survival }}</div>
            <div class="title">SUR</div>
          </div>
          <div class="stat">
            <div class="value">{{ survivor.insanity }}</div>
            <div class="title">INS</div>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div class="stats-display">
          <div class="stat">
            <div class="value">{{ survivor.movement }}</div>
            <div class="title">MOV</div>
          </div>
          <div class="stat">
            <div class="value">{{ survivor.strength }}</div>
            <div class="title">STR</div>
          </div>
          <div class="stat">
            <div class="value">{{ survivor.accuracy }}</div>
            <div class="title">ACC</div>
          </div>
          <div class="stat">
            <div class="value">{{ survivor.evasion }}</div>
            <div class="title">EVA</div>
          </div>
          <div class="stat">
            <div class="value">{{ survivor.luck }}</div>
            <div class="title">LCK</div>
          </div>
          <div class="stat">
            <div class="value">{{ survivor.speed }}</div>
            <div class="title">SPD</div>
          </div>
        </div>
      </div>
      <div v-if="collapsedView" class="wrapper courage-under">
        <div class="stats-display">
          <div class="stat">
            <div class="value-no-border">{{ survivor.courage }}</div>
            <div class="title">CRG</div>
          </div>
          <div class="stat">
            <div class="value-no-border">{{ survivor.understanding }}</div>
            <div class="title">UND</div>
          </div>
          <div class="stat">
            <div class="value-no-border">{{ survivor.weaponProficiencyLevel }}</div>
            <div class="title">WPN</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!collapsedView" class="section progress">
      <div class="progress-bar">
        <span class="title">Courage ({{ survivor.courage }}): </span>
        <div class="square-row">
          <div v-for="n in 9" :class="courageBoldXpSquareClass(survivor.courage, n)" @click="setCourage(survivor, n)" @dblclick.stop></div>
        </div>
      </div>
      <div class="progress-bar">
        <span class="title">Understanding ({{ survivor.understanding }}): </span>
        <div class="square-row">
          <div v-for="n in 9" :class="courageBoldXpSquareClass(survivor.understanding, n)" @click="setUnderstanding(survivor, n)" @dblclick.stop></div>
        </div>
      </div>
      <div class="progress-bar">
        <span class="title">Weapon Proficiency ({{ survivor.weaponProficiencyLevel }}): </span>
        <div class="square-row">
          <div v-for="n in 8" :class="weaponXpSquareClass(survivor.weaponProficiencyLevel, n)" @click="setWeaponProficiencyLevel(survivor, n)" @dblclick.stop></div><div class="invisible-square"></div>
        </div>
        <span class="detail">Weapon Type: <span class="weapon-prof" v-if="survivor.weaponProficiency">{{ survivor.weaponProficiency }}</span><span v-else>______</span></span>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'survivor-table-row',
  props: {
    survivor: {},
    collapsed: { default: false }
  },
  data: function () {
    return {
      collapsedView: this.collapsed
    }
  },
  mounted: function () {
  },
  watch: {
    collapsed: function (newVal, oldVal) {
      this.collapsedView = newVal
    }
  },
  methods: {
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
    setHuntXp (survivor, n) {
      if (survivor.xp === n) {
        survivor.xp = n - 1
      } else {
        survivor.xp = n
      }
    },
    setCourage (survivor, n) {
      if (survivor.courage === n) {
        survivor.courage = n - 1
      } else {
        survivor.courage = n
      }
    },
    setUnderstanding (survivor, n) {
      if (survivor.understanding === n) {
        survivor.understanding = n - 1
      } else {
        survivor.understanding = n
      }
    },
    setWeaponProficiencyLevel (survivor, n) {
      if (survivor.weaponProficiencyLevel === n) {
        survivor.weaponProficiencyLevel = n - 1
      } else {
        survivor.weaponProficiencyLevel = n
      }
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