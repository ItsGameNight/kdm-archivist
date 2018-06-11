<template>
  <progress-bar
    :title="'Weapon Proficiency'"
    :initLevel="level"
    :maxLevel="8"
    :boldLevels="[3, 8]"
    :paddingSquares="1"
    :survivorID="survivorID"
    :stat="'weaponProficiencyLevel'"
    :inline="false" />
</template>

<script type="text/javascript">
import ProgressBar from './ProgressBar'

export default {
  name: 'weapon-proficiency-bar',
  components: { ProgressBar },
  props: {
    survivorID: { required: true },
    level: { required: true }
  }
}
</script>

<style lang="scss" scoped>

</style>