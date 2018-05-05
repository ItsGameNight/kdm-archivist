<template>
  <td>
    <div class="section basic-info">
      <span id="name">{{ survivor.name }}</span>
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
    <div class="section stats">
      <div class="wrapper">
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
    </div>
    <div class="section progress">
      <div class="square-row">
        <span class="title">Hunt XP ({{ survivor.xp }}): </span>
        <div v-for="n in 16" :class="huntXpSquareClass(survivor.xp, n)" @click="setHuntXp(survivor, n)"></div>
      </div>
      <div class="square-row">
        <span class="title">Courage ({{ survivor.courage }}): </span>
        <div v-for="n in 9" :class="courageBoldXpSquareClass(survivor.courage, n)" @click="setCourage(survivor, n)"></div>
      </div>
      <div class="square-row">
        <span class="title">Understanding ({{ survivor.understanding }}): </span>
        <div v-for="n in 9" :class="courageBoldXpSquareClass(survivor.understanding, n)" @click="setUnderstanding(survivor, n)"></div>
      </div>
      <div class="square-row">
        <span class="title">Weapon Proficiency<span v-if="survivor.weaponProficiency"> ({{ survivor.weaponProficiency }}, {{ survivor.weaponProficiencyLevel }})</span>: </span>
        <div v-for="n in 8" :class="weaponXpSquareClass(survivor.weaponProficiencyLevel, n)" @click="setWeaponProficiencyLevel(survivor, n)"></div>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'survivor-table-row',
  props: [
    'survivor'
  ],
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
}
.section {
  display: inline-block;
  overflow: hidden;
}
.basic-info {
  width: 10%;
}
.stats {
  width: 35%;
}
.progress {
  width: 55%;
}
.square-row {
  height: 16px;
  line-height: 12px;
  text-align: right;
  display: flex;
  flex-direction: row;
}
.square-row .title {
  font-size: 10pt;
  margin-left: auto;
}
.square {
  width: 10px;
  height: 10px;
  background: black;
  border: 1px solid black;
  margin: 0px 2px;
}
.empty-square {
  width: 10px;
  height: 10px;
  border: 1px solid black;
  margin: 0px 2px;
}
.empty-square-bold {
  width: 8px;
  height: 8px;
  border: 2px solid black;
  margin: 0px 2px;
}
.empty-square-extra-bold {
  width: 4px;
  height: 4px;
  border: 4px solid black;
  margin: 0px 2px;
}
#name {
  font-weight: bold;
}
.wrapper {
  display: inline-block;
}
.stats-display {
  display: flex;
  flex-direction: row;
  padding-left: 10px;
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
}
.stat .title {
  font-size: 8pt;
}
.sex {
  font-size: 8pt;
  text-align: center;
  padding-top: 5px;
}
</style>
