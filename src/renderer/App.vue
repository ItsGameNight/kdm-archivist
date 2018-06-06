<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'twilight-archivist',
  mounted: function () {
    // load all db's
    this.$store.dispatch('loadSettlements')
    this.$store.dispatch('loadSurvivors')
    this.$store.dispatch('loadSnapshots')
  }
}
</script>

<style>
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

.DISABLE-CLICKS-HISTORY-MODE {
  pointer-events: none;
}
</style>
