<template>
  <div id="app" :class="[themeClass]">
    <router-view></router-view>
  </div>
</template>

<script>
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'twilight-archivist',
  mixins: [ThemeClass],
  mounted: function () {
    // load all db's
    this.$store.dispatch('loadSettlements')
    this.$store.dispatch('loadSurvivors')
    this.$store.dispatch('loadSnapshots')
    // load user prefs
    this.$store.dispatch('loadUserPrefs')
  }
}
</script>

<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  user-select: none;
}

/* Global CSS */
@font-face {
  font-family: "PT Sans";
  src: url('~@/assets/fonts/PT_Sans/PT_Sans-Web-Regular.ttf')
}

@font-face {
  font-family: "PT Sans";
  font-weight: bold;
  src: url('~@/assets/fonts/PT_Sans/PT_Sans-Web-Bold.ttf')
}

@font-face {
  font-family: "PT Sans";
  font-style: italic;
  src: url('~@/assets/fonts/PT_Sans/PT_Sans-Web-Italic.ttf')
}

@font-face {
  font-family: "PT Sans";
  font-style: italic;
  font-weight: bold;
  src: url('~@/assets/fonts/PT_Sans/PT_Sans-Web-BoldItalic.ttf')
}

@font-face {
  font-family: "Open Sans";
  src: url('~@/assets/fonts/Open_Sans/OpenSans-Regular.ttf')
}

@font-face {
  font-family: "Open Sans";
  font-weight: bold;
  src: url('~@/assets/fonts/Open_Sans/OpenSans-Bold.ttf')
}

@font-face {
  font-family: "Open Sans";
  font-style: italic;
  src: url('~@/assets/fonts/Open_Sans/OpenSans-Italic.ttf')
}

@font-face {
  font-family: "Open Sans";
  font-weight: bold;
  font-style: italic;
  src: url('~@/assets/fonts/Open_Sans/OpenSans-BoldItalic.ttf')
}

@font-face {
  font-family: "Gloria Hallelujah";
  src: url('~@/assets/fonts/Gloria_Hallelujah/GloriaHallelujah.ttf')
}

.flex-wrapper {
  display: flex;
  flex-direction: row;
}

.DISABLE-CLICKS-HISTORY-MODE {
  pointer-events: none;
}
</style>
