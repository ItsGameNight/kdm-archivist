<template>
  <div @dblclick.stop>
    <modal @close="$emit('close')" :modalWidth="600">
      <div slot="header" style="display: none;"></div>
      <div slot="body">
        <h3>{{ survivor.name }}</h3>
        <hr />
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'survivor-modal',
  components: { Modal },
  props: {
    survivor: { required: true }
  }
}
</script>

<style>
  
</style>