<template>
  <div>
    <survivor-table-row v-for="surv in survivors" :survivor="surv"></survivor-table-row>
  </div>
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
            'name': 'Olympia',
            'stats': [
              { 'title': 'strength', 'value': 5 },
              { 'title': 'accuracy', 'value': 9 },
              { 'title': 'evasion', 'value': 32 },
              { 'title': 'speed', 'value': -5 },
              { 'title': 'speed', 'value': -5 }
            ]
          },
          {
            'name': 'Swamp Ass',
            'stats': [
              { 'title': 'strength', 'value': 10 },
              { 'title': 'accuracy', 'value': -34 },
              { 'title': 'evasion', 'value': -69 },
              { 'title': 'luck', 'value': -13 },
              { 'title': 'speed', 'value': -5 }
            ]
          }
        ]
      }
    }
  }
</script>

<style>
</style>
