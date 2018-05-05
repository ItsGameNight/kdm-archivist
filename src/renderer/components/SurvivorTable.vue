<template>
  <div>
    <div class="collapse-toggle">
      <span>Collapsed:</span>
      <label class="switch">
        <input type="checkbox" v-model="collapsedState">
        <span class="slider"></span>
      </label>
    </div>
    <div class="table-scroll">
      <table>
        <tr v-for="surv in survivors"><survivor-table-row :survivor="surv" :key='surv._id' :collapsed="collapsedState"></survivor-table-row></tr>
      </table>
    </div>
  </div>
</template>

<script>
import SurvivorTableRow from './SurvivorTableRow'

export default {
  name: 'survivor-table',
  components: { SurvivorTableRow },
  data () {
    return {
      collapsedState: true,
      survivors: [
        {
          '_id': 1,
          'name': 'Olympia',
          'sex': 'f',
          'survival': 4,
          'movement': 5,
          'strength': 3,
          'accuracy': 4,
          'evasion': 2,
          'luck': 3,
          'speed': 1,
          'insanity': 6,
          'xp': 4,
          'courage': 5,
          'boldSkill': 'Prepared',
          'understanding': 4,
          'insightSkill': 'Tinker',
          'weaponProficiency': 'Sword',
          'weaponProficiencyLevel': 2,
          'fightingArts': [ 'Mighty Strike', 'Last Man Standing' ],
          'disorders': [],
          'abilities': [],
          'impairments': [],
          'nickname': 'Wise Fool of the Lantern'
        },
        {
          '_id': 2,
          'name': 'Swamp Ass',
          'sex': 'm',
          'survival': 0,
          'movement': 4,
          'strength': 10,
          'accuracy': -3,
          'evasion': -6,
          'luck': 0,
          'speed': 0,
          'insanity': 13,
          'xp': 1,
          'courage': 0,
          'boldSkill': null,
          'understanding': 0,
          'insightSkill': null,
          'weaponProficiency': null,
          'weaponProficiencyLevel': 0,
          'fightingArts': [],
          'disorders': [],
          'abilities': [],
          'impairments': [],
          'nickname': null
        },
        {
          '_id': 3,
          'name': 'Character With An Unreasonably Long Name For Testing Purposes',
          'sex': 'm',
          'survival': 3,
          'movement': 5,
          'strength': 0,
          'accuracy': 0,
          'evasion': 0,
          'luck': 0,
          'speed': 0,
          'insanity': 0,
          'xp': 0,
          'courage': 0,
          'boldSkill': null,
          'understanding': 0,
          'insightSkill': null,
          'weaponProficiency': null,
          'weaponProficiencyLevel': 0,
          'fightingArts': [],
          'disorders': [],
          'abilities': [],
          'impairments': [],
          'nickname': null
        },
        {
          '_id': 3,
          'name': 'Carol',
          'sex': 'f',
          'survival': 3,
          'movement': 5,
          'strength': 0,
          'accuracy': 0,
          'evasion': 0,
          'luck': 0,
          'speed': 0,
          'insanity': 0,
          'xp': 0,
          'courage': 0,
          'boldSkill': null,
          'understanding': 0,
          'insightSkill': null,
          'weaponProficiency': null,
          'weaponProficiencyLevel': 0,
          'fightingArts': [],
          'disorders': [],
          'abilities': [],
          'impairments': [],
          'nickname': null
        },
        {
          '_id': 3,
          'name': 'Jon',
          'sex': 'm',
          'survival': 3,
          'movement': 5,
          'strength': 0,
          'accuracy': 0,
          'evasion': 0,
          'luck': 0,
          'speed': 0,
          'insanity': 0,
          'xp': 0,
          'courage': 0,
          'boldSkill': null,
          'understanding': 0,
          'insightSkill': null,
          'weaponProficiency': null,
          'weaponProficiencyLevel': 0,
          'fightingArts': [],
          'disorders': [],
          'abilities': [],
          'impairments': [],
          'nickname': null
        }
      ]
    }
  }
}
</script>

<style>
table {
  width: 98%;
  border-spacing: 0em 0.5em;
}
td {
  border: 1px solid black;
  padding: 5px;
}
.table-scroll {
  height: 580px;
  overflow-y: scroll;
}
.switch {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 12px;
}
.switch input {
  display: none;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(8px);
  transform: translateX(8px);
}
</style>
