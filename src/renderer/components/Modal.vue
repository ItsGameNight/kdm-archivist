<template>
  <transition name="modal">
    <div class="Modal__mask" @click="$emit('close')">
      <div class="Modal__wrapper">
        <div class="Modal__container" :style="{ width: modalWidth + 'px'}" :class="[themeClass]" @click.stop>
          <div class="Modal__header">
            <slot name="header">
              Default header.
            </slot>
          </div>
          <div class="Modal__body">
            <slot name="body">
              Default body.
            </slot>
          </div>
          <div class="Modal__footer">
            <slot name="footer">
              <button class="Modal__defaultButton"
                :class="[themeClass]"
                @click="$emit('okay'); $emit('close')">
                Okay
              </button>
              <button class="Modal__defaultButton"
                :class="[themeClass]"
                @click="$emit('cancel'); $emit('close')">
                Cancel
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'modal',
  mixins: [ThemeClass],
  props: {
    modalWidth: { required: true }
  }
}
</script>

<style lang="scss" scoped>
.Modal {
  &__mask {
    display: table;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
  }

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    margin: 0 auto;
    padding: 0 30px 20px 30px;
    border-width: 1px;
    border-style: solid;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;

    &.theme-light {
      background-color: $light-bg;
      border-color: $light-border;
    }

    &.theme-dark {
      background-color: $dark-bg;
      border-color: $dark-border;
    }
  }

  &__header {
    margin-top: 0;
    padding: 0;
  }

  &__body {
    margin: 20px 0;
  }

  &__footer {
    padding-bottom: 15px;
  }

  &__defaultButton {
    float: right;
    margin-left: 5px;
  }
}

// Transition styles
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .Modal__container,
.modal-leaver-active .Modal__container {
  -webkit-transform: scale(0.6);
  transform: scale(0.6);
}
</style>