<template>
  <modal class="BaseSurvivorModal" :modalWidth="'500'" noFooter @close="$emit('close')">
    <div slot="header">
      <h2 class="BaseSurvivorModal__title">Base Survivor Stats</h2>
      <h4 class="BaseSurvivorModal__subtitle">All new survivors inherit the properties of the settlement's base survivor.</h4>
    </div>
    <div slot="body" class="BaseSurvivorModal__body" :class="[themeClass]">
      <div class="BaseSurvivorModal__scrollWrapper">
        <h5 class="BaseSurvivorModal__sectionTitle">Hunt XP</h5>
        <div class="BaseSurvivorModal__section">
          <hunt-xp-bar
            :level="currentSettlement.baseSurvivor.xp"
            @onChange="update('xp', $event)" />
          <p v-if="innovationUnlocked('saga')">+2 from the Saga innovation.</p>
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
          <div class="BaseSurvivorModal__showdownWrapper">
            <editableStat
              :initValue="currentSettlement.baseSurvivor.movement"
              :statDisplayName="'MOV'"
              @update="update('movement', $event)" />
            <editableStat
              :initValue="currentSettlement.baseSurvivor.accuracy"
              :statDisplayName="'ACC'"
              @update="update('accuracy', $event)" />
            <editableStat
              :initValue="currentSettlement.baseSurvivor.strength"
              :statDisplayName="'STR'"
              @update="update('strength', $event)" />
            <editableStat
              :initValue="currentSettlement.baseSurvivor.evasion"
              :statDisplayName="'EVA'"
              @update="update('evasion', $event)" />
            <editableStat
              :initValue="currentSettlement.baseSurvivor.luck"
              :statDisplayName="'LCK'"
              @update="update('luck', $event)" />
            <editableStat
              :initValue="currentSettlement.baseSurvivor.speed"
              :statDisplayName="'SPD'"
              @update="update('speed', $event)" />
          </div>
          <p v-if="principleUnlocked('barbaric')">+1 STR from the Barbaric principle.</p>
          <p v-if="principleUnlocked('survival of the fittest')">+1 STR, +1 EVA from the Survival of the Fittest principle.</p>
          <p v-if="innovationUnlocked('clan of death')">+1 ACC, +1 STR, +1 EVA from the Clan of Death innovation.</p>
        </div>
        <h5 class="BaseSurvivorModal__sectionTitle">Development Stats</h5>
        <div class="BaseSurvivorModal__section">
          <div class="BaseSurvivorModal__devWrapper first">
            <weapon-proficiency-bar
              :level="currentSettlement.baseSurvivor.weaponProficiencyLevel"
              @onChange="update('weaponProficiencyLevel', $event)" />
          </div>
          <div class="BaseSurvivorModal__devWrapper">
            <div class="BaseSurvivorModal__flexWrapper">
              <courage-bar
                :level="currentSettlement.baseSurvivor.courage"
                @onChange="update('courage', $event)" />
              <div class="BaseSurvivorModal__inputWrapper">
                <editable-text-input
                  :textValue="currentSettlement.baseSurvivor.boldSkill"
                  :textStyle="{ fontSize: '10pt' }"
                  :placeholder="'Base Bold Skill'"
                  @update="update('boldSkill', $event)" />
              </div>
            </div>
            <p v-if="innovationUnlocked('saga')">+2 from the Saga innovation.</p>
          </div>
          <div class="BaseSurvivorModal__devWrapper">
            <div class="BaseSurvivorModal__flexWrapper">
              <understanding-bar
                :level="currentSettlement.baseSurvivor.understanding"
                @onChange="update('understanding', $event)" />
              <div class="BaseSurvivorModal__inputWrapper">
                <editable-text-input
                  :textValue="currentSettlement.baseSurvivor.insightSkill"
                  :textStyle="{ fontSize: '10pt' }"
                  :placeholder="'Base Insight Skill'"
                  @update="update('insightSkill', $event)" />
              </div>
            </div>
            <p v-if="principleUnlocked('graves')">+1 from the Graves principle.</p>
            <p v-if="innovationUnlocked('saga')">+2 from the Saga innovation.</p>
          </div>
          <div class="BaseSurvivorModal__scrollPadding"></div>
        </div>
      </div>
      <div class="BaseSurvivorModal__scrollFadeBottom"></div>
    </div>
    <div slot="footer" style="display: none;"></div>
  </modal>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/Modal'
import {
  SquareToggle,
  EditableTextInput,
  EditableStat
} from '@/components/GUIComponents'
import {
  HuntXpBar,
  CourageBar,
  UnderstandingBar,
  WeaponProficiencyBar
} from '@/components/SurvivorComponents'
import ThemeClass from '@/mixins/ThemeClass'

export default {
  name: 'base-survivor-modal',
  mixins: [ThemeClass],
  components: {
    Modal,
    SquareToggle,
    EditableTextInput,
    EditableStat,
    HuntXpBar,
    CourageBar,
    UnderstandingBar,
    WeaponProficiencyBar },
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
    principleUnlocked: function (princ) {
      for (var principle of this.currentSettlement.principles) {
        if (principle && principle.toLowerCase() === princ) {
          return true
        }
      }
      return false
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
    position: relative;
    padding: 4px 8px;
    border-radius: 10px;
  }

  &__scrollWrapper {
    max-height: 440px;
    overflow: auto;
  }

  &__scrollPadding {
    height: 10px;
  }

  &__scrollFadeBottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    border-radius: 0 0 10px 10px;
    background: linear-gradient(rgba(0,0,0,0), $light-bg);
  }

  &__sectionTitle {
    margin: 2px auto;
  }

  &__section {
    margin-bottom: 10px;

    p {
      margin: 0 0 0 10px;
      font-size: 9pt;
      font-style: italic;
      line-height: 10pt;
    }
  }

  &__survivalAction {
    display: flex;
    flex-direction: row;
    padding-bottom: 4px;
  }

  &__devWrapper {
    padding-top: 8px;

    &.first {
      padding-top: 0;
    }
  }

  &__showdownWrapper {
    display: flex;
    flex-direction: row;
    padding-left: 10px;
    padding-bottom: 5px;
  }

  &__flexWrapper {
    display: flex;
    flex-direction: row;
    height: 35px;
  }

  &__inputWrapper {
    width: 10em;
    height: 1.3em;
    margin-top: 10px;
    margin-left: 50px;
    border-bottom: 1px dotted;
  }
}
</style>