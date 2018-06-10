var themeSwitchMixin = {
  methods: {
    setThemeByIndex: function (index) {
      if (index === 0) {
        this.$store.dispatch('setTheme', 'theme-light')
      } else if (index === 1) {
        this.$store.dispatch('setTheme', 'theme-dark')
      }
    }
  }
}

export { themeSwitchMixin as default }
