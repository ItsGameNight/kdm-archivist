<template>
  <progress-bar
    :title="'Understanding'"
    :initLevel="level"
    :maxLevel="9"
    :boldLevels="[3, 9]"
    :survivorID="survivorID"
    :stat="'understanding'"
    :inline="false"
    @onChange="$emit('onChange', $event)" />
</template>

<script type="text/javascript">
import ProgressBar from './ProgressBar'

export default {
  name: 'understanding-bar',
  components: { ProgressBar },
  props: {
    survivorID: { required: false, default: null },
    level: { required: true }
  }
}
</script>

<style lang="scss" scoped>

</style>