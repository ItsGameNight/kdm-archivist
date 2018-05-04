<template>
  <td>
    {{ survivor.name }}
    <span v-for="n in survivor.xp">•</span><span v-for="n in 16 - survivor.xp">○</span>
    Survival: {{ survivor.survival }}
    Mov: {{ survivor.movement }}
    Str: {{ survivor.strength }}
    Acc: {{ survivor.accuracy }}
    Eva: {{ survivor.evasion }}
    Luk: {{ survivor.luck }}
    Spd: {{ survivor.speed }}
  </td>
</template>

<script>
export default {
  name: 'survivor-table-row',
  props: [
    'survivor'
  ]
}
</script>

<style>
</style>
