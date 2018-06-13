<template>
  <progress-bar
    :title="'Courage'"
    :initLevel="level"
    :maxLevel="9"
    :boldLevels="[3, 9]"
    :survivorID="survivorID"
    :stat="'courage'"
    :inline="false"
    @onChange="$emit('onChange', $event)" />
</template>

<script type="text/javascript">
import ProgressBar from './ProgressBar'

export default {
  name: 'courage-bar',
  components: { ProgressBar },
  props: {
    survivorID: { required: false, default: null },
    level: { required: true }
  }
}
</script>

<style lang="scss" scoped>

</style>