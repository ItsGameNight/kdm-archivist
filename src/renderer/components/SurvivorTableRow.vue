<template>
  <div>
    <h3>{{ survivor.name }}</h3>
    <ul><li v-for="stat in survivor.stats">{{ stat.title }} : {{ stat.value }}</li></ul>
  </div>
</template>

<script>
  export default {
    name: 'survivor-table-row',
    props: [
      'survivor'
    ]
  }
</script>
