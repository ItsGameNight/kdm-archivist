<template>
  <modal class="BaseSurvivorModal" :modalWidth="'500'" @close="$emit('close')">
    <div slot="header">
      <h2 class="BaseSurvivorModal__title">Base Survivor Stats</h2>
      <h4 class="BaseSurvivorModal__subtitle">All new survivors inherit the properties of the settlement's base survivor.</h4>
    </div>
    <div slot="body" class="BaseSurvivorModal__body" :class="[themeClass]">
      <h5 class="BaseSurvivorModal__sectionTitle">Hunt XP</h5>
      <div class="BaseSurvivorModal__section">
      </div>
      <h5 class="BaseSurvivorModal__sectionTitle">Survival Actions</h5>
      <div class="BaseSurvivorModal__section">
        <div class="BaseSurvivorModal__survivalAction">
          <square-toggle
            :initValue="currentSettlement.baseSurvivor.dodge"
            :statDisplayName="'Dodge'"
            @update="update('dodge', $event)" />
          <p>All survivors are born with this ability.</p>
        </div>
        <div class="BaseSurvivorModal__survivalAction">
          <square-toggle
            :initValue="currentSettlement.baseSurvivor.encourage"
            :statDisplayName="'Encourage'"
            @update="update('encourage', $event)" />
          <p v-if="innovationUnlocked('language')">Unlocked by the Language innovation.</p>
        </div>
        <div class="BaseSurvivorModal__survivalAction">
          <square-toggle
            :initValue="currentSettlement.baseSurvivor.dash"
            :statDisplayName="'Dash'"
            @update="update('dash', $event)" />
          <p v-if="innovationUnlocked('paint')">Unlocked by the Paint innovation.</p>
        </div>
        <div class="BaseSurvivorModal__survivalAction">
          <square-toggle
            :initValue="currentSettlement.baseSurvivor.surge"
            :statDisplayName="'Surge'"
            @update="update('surge', $event)" />
          <p v-if="innovationUnlocked('inner lantern')">Unlocked by the Inner Lantern innovation.</p>
        </div>
        <div class="BaseSurvivorModal__survivalAction">
          <square-toggle
            :initValue="currentSettlement.baseSurvivor.endure"
            :statDisplayName="'Endure'"
            @update="update('endure', $event)" />
          <p v-if="innovationUnlocked('destiny')">Unlocked by the Destiny innovation.</p>
        </div>
      </div>
      <h5 class="BaseSurvivorModal__sectionTitle">Showdown Stats</h5>
      <div class="BaseSurvivorModal__section">
      </div>
      <h5 class="BaseSurvivorModal__sectionTitle">Development Stats</h5>
      <div class="BaseSurvivorModal__section">
      </div>
    </div>
  </modal>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/Modal'
import { SquareToggle } from '@/components/GUIComponents'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'base-survivor-modal',
  mixins: [ThemeClass],
  components: { Modal, SquareToggle },
  computed: {
    ...mapGetters([
      'inHistoryMode',
      'currentSettlement'
    ])
  },
  methods: {
    ...mapActions([
      'updateSettlement'
    ]),
    update: function (stat, value) {
      var newBase = JSON.parse(JSON.stringify(this.currentSettlement.baseSurvivor))
      newBase[stat] = value
      var update = { baseSurvivor: newBase }
      this.updateSettlement({ id: this.currentSettlement._id, update: update })
    },
    innovationUnlocked: function (inn) {
      for (var innovation of this.currentSettlement.innovations) {
        if (innovation && innovation.toLowerCase() === inn) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseSurvivorModal {
  &__title {
    margin-bottom: 0;
  }

  &__subtitle {
    margin-top: 0;
  }

  &__body {
    padding: 4px 8px;
    border-radius: 10px;
  }

  &__sectionTitle {
    margin: 2px auto;
  }

  &__section {
    margin-bottom: 10px;
  }

  &__survivalAction {
    display: flex;
    flex-direction: row;
    padding-bottom: 4px;

    p {
      margin: 0 0 0 10px;
      font-size: 9pt;
      font-style: italic;
      line-height: 10pt;
    }
  }
}
</style>