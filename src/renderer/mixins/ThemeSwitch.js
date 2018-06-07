var themeSwitchMixin = {
  methods: {
    switchTheme: function () {
      if (this.$store.getters.theme === 'theme-light') {
        this.$store.dispatch('setTheme', 'theme-dark')
      } else {
        this.$store.dispatch('setTheme', 'theme-light')
      }
    }
  }
}

export { themeSwitchMixin as default }
