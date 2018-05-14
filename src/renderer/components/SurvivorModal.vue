<template>
  <div @dblclick.stop>
    <modal @close="$emit('close')" :modalWidth="600">
      <div slot="header" style="display: none;"></div>
      <div slot="body">
        <span>{{ survivor.name }}</span>
        <hunt-xp-bar :survivorID="survivor._id" :xp="survivor.xp"></hunt-xp-bar>
        <hr />
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal'
import HuntXpBar from './SurvivorComponents/HuntXpBar'

export default {
  name: 'survivor-modal',
  components: { Modal, HuntXpBar },
  props: {
    survivor: { required: true }
  }
}
</script>

<style>
  
</style>