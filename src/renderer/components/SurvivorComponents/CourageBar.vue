<template>
  <progress-bar :title="'Courage'" :initLevel="level" :maxLevel="9" :boldLevels="[3, 9]" :survivorID="survivorID" :stat="'courage'" />
</template>

<script>
import ProgressBar from './ProgressBar'

export default {
  name: 'courage-bar',
  components: { ProgressBar },
  props: {
    survivorID: { required: true },
    level: { required: true }
  }
}
</script>

<style>

</style>