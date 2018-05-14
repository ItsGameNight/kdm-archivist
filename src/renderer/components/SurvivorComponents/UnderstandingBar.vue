<template>
  <progress-bar :title="'Understanding'" :initLevel="level" :maxLevel="9" :boldLevels="[3, 9]" :survivorID="survivorID" :stat="'understanding'" :inline="false" />
</template>

<script>
import ProgressBar from './ProgressBar'

export default {
  name: 'understanding-bar',
  components: { ProgressBar },
  props: {
    survivorID: { required: true },
    level: { required: true }
  }
}
</script>

<style>

</style>