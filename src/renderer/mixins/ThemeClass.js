var themeClassMixin = {
  computed: {
    themeClass: function () {
      return this.$store.getters.theme
    },
    altColor: function () {
      return 'alt'
    },
    inverseAltColor: function () {
      return 'inverseAlt'
    },
    highlightColor: function () {
      return 'highlight'
    },
    hoverHighlight: function () {
      return 'hoverHighlight'
    },
    topScrollFade: function () {
      return 'topScrollFade'
    },
    bottomScrollFade: function () {
      return 'bottomScrollFade'
    },
    dropdownItem: function () {
      return 'dropdownItem'
    },
    noEffect: function () {
      return 'noEffect'
    },
    toggleColor: function () {
      return 'toggle'
    },
    alert: function () {
      return 'alert'
    }
  }
}

export { themeClassMixin as default }
