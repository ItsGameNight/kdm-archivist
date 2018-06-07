var themeClassMixin = {
  computed: {
    themeClass: function () {
      return this.$store.getters.theme
    }
  }
}

export { themeClassMixin as default }
