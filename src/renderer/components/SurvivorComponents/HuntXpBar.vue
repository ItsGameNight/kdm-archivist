<template>
  <progress-bar
    :title="'Hunt XP'"
    :initLevel="level"
    :maxLevel="16"
    :boldLevels="[2, 6, 10, 15]"
    :extraBoldLevels="[16]"
    :survivorID="survivorID"
    :stat="'xp'" />
</template>

<script type="text/javascript">
import ProgressBar from './ProgressBar'

export default {
  name: 'hunt-xp-bar',
  components: { ProgressBar },
  props: {
    survivorID: { required: true },
    level: { required: true }
  }
}
</script>

<style lang="scss" scoped>

</style>