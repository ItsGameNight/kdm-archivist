<template>
  <table>
    <tr v-for="surv in survivors"><survivor-table-row :survivor="surv" :key='surv._id'></survivor-table-row></tr>
  </table>
</template>

<script>
import SurvivorTableRow from './SurvivorTableRow'

export default {
  name: 'survivor-table',
  components: { SurvivorTableRow },
  data () {
    return {
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
          'fightingArts': [],
          'disorders': [],
          'abilities': [],
          'impairments': [],
          'nickname': null
        },
        {
          '_id': 3,
          'name': 'Nugget',
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
  width: 100%;
  border-spacing: 0em 0.5em;
}
td {
  border: 1px solid black;
  padding: 5px;
}
</style>
