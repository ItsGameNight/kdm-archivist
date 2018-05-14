<template>
  <progress-bar :title="'Hunt XP'" :initLevel="xp" :maxLevel="16" :boldLevels="[2, 6, 10, 15]" :extraBoldLevels="[16]" :survivorID="survivorID" :stat="'xp'" />
</template>

<script>
import ProgressBar from './ProgressBar'

export default {
  name: 'hunt-xp-bar',
  components: { ProgressBar },
  props: {
    survivorID: { required: true },
    xp: { required: true }
  }
}
</script>

<style>

</style>