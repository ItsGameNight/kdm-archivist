<template>
  <div class="WelcomeView" :class="[]">
    <header>
      <h1>Twilight Archivist</h1>
      <h4>A Kingdom Death: Monster Companion App</h4>
    </header>
    <div class="WelcomeView__settlementTable">
      <settlement-table />
    </div>
    <button
      class="WelcomeView__playButton"
      :class="[themeClass]"
      @click="playButtonPressed()">
        Play
    </button>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
import SettlementTable from '@/components/SettlementTable'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'welcome-view',
  mixins: [ThemeClass],
  components: { SettlementTable },
  computed: {
    ...mapState(['currentSmt'])
  },
  methods: {
    playButtonPressed: function () {
      if (!this.currentSmt) {
        alert('Please select a settlement to play!')
      } else {
        this.$router.push({ name: 'main' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.WelcomeView {
  header {
    padding-top: 20px;
    padding-bottom: 15px;

    h1, h4 {
      text-align: center;
    }
  }

  &__settlementTable {
    margin: auto;
    width: 33%;
  }

  &__playButton {
    margin-top: 10px;
    margin-left: 33%;
    width: 33%;
  }
}
</style>
