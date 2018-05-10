<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" :style="{ width: modalWidth + 'px'}">
          <div class="modal-header">
            <slot name="header">
              Default header.
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              Default body.
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('okay'); $emit('close')">
                Okay
              </button>
              <button class="modal-default-button" @click="$emit('cancel'); $emit('close')">
                Cancel
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: {
    modalWidth: { required: true }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  margin: 0px auto;
  padding: 0px 30px 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid black;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal-header {
  margin-top: 0;
  padding: 0;
}
.modal-body {
  margin: 20px 0;
}
.modal-footer {
  min-height: 10px;
}
.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leaver-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>