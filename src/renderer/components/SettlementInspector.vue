<template>
  <div class="SettlementInspector">
    <h2 class="SettlementInspector__settlementName">
      {{ currentSettlement.name }}
    </h2>
    <h5 class="SettlementInspector__settlementLabel" :class="[themeClass]">
      Settlement Inspector
    </h5>
    <div class="SettlementInspector__settlementStats">
      <div class="SettlementInspector__statbox">
        <editable-stat
          :statDisplayName="'Lantern Year'"
          :initValue="currentSettlement.lanternYear"
          :minValue="0"
          large
          @update="update('lanternYear', $event)" />
      </div>
      <div class="SettlementInspector__statbox">
        <editable-stat
          :statDisplayName="'Survival Limit'"
          :initValue="currentSettlement.survivalLimit"
          :minValue="0"
          large
          @update="update('survivalLimit', $event)" />
      </div>
      <div class="SettlementInspector__statbox">
        <editable-stat
          :statDisplayName="'Survival on Depart'"
          :initValue="currentSettlement.survivalOnDepart"
          :minValue="0"
          large
          @update="update('survivalOnDepart', $event)" />
      </div>
    </div>
    <div class="SettlementInspector__topScrollFade" :class="[themeClass]" :style="titleAdjust">
    </div>
    <div class="SettlementInspector__scrollbox" :style="titleAdjust">
      <div class="SettlementInspector__populationStats">
        <collapse-group :title="'Settlement Stats'">
          <div slot="body">
            <ul class="SettlementInspector__populationList">
              <li>Population: </li>
              <li>Death Count: </li>
              <li>Male/Female Ratio: </li>
            </ul>
          </div>
        </collapse-group>
      </div>
      <div class="SettlementInspector__statlist">
        <collapse-group :title="'Principles'">
          <div slot="body" class="SettlementInspector__editableListWrapper">
            <editable-list
              :listItems="currentSettlement.principles"
              :autocompleteList="principleNames"
              :parentHeight="height"
              @update="update('principles', $event)" />
          </div>
        </collapse-group>
      </div>
      <div class="SettlementInspector__statlist">
        <collapse-group :title="'Innovations'">
          <div slot="body" class="SettlementInspector__editableListWrapper">
            <editable-list
              :listItems="currentSettlement.innovations"
              :autocompleteList="innovationNames"
              :parentHeight="height"
              @update="update('innovations', $event)" />
          </div>
        </collapse-group>
      </div>
      <div class="SettlementInspector__statlist">
        <collapse-group :title="'Milestone Story Events'">
          <div slot="body" class="SettlementInspector__editableListWrapper">
            <editable-list
              :listItems="currentSettlement.milestones"
              :parentHeight="height"
              @update="update('milestones', $event)" />
          </div>
        </collapse-group>
      </div>
      <div class="SettlementInspector__statlist">
        <collapse-group :title="'Settlement Locations'">
          <div slot="body" class="SettlementInspector__editableListWrapper">
            <editable-list
              :listItems="currentSettlement.locations"
              :autocompleteList="settlementLocationNames"
              :parentHeight="height"
              @update="update('locations', $event)" />
          </div>
        </collapse-group>
      </div>
      <div class="SettlementInspector__statlist">
        <collapse-group :title="'Quarries'">
          <div slot="body" class="SettlementInspector__editableListWrapper">
            <editable-list
              :listItems="currentSettlement.quarries"
              :autocompleteList="quarryNames"
              :parentHeight="height"
              @update="update('quarries', $event)" />
          </div>
        </collapse-group>
      </div>
      <div class="SettlementInspector__statlist">
        <collapse-group :title="'Nemesis Monsters'">
          <div slot="body" class="SettlementInspector__editableListWrapper">
            <editable-list
              :listItems="currentSettlement.nemeses"
              :parentHeight="height"
              @update="update('nemeses', $event)" />
          </div>
        </collapse-group>
      </div>
      <div class="SettlementInspector__statlist">
        <collapse-group :title="'Lantern Research Level'" :initCollapse="true">
          <div slot="body" class="SettlementInspector__editableListWrapper">
            <editable-stat
              :statDisplayName="'Lantern Research Level'"
              :initValue="0"
              :minValue="0" />
            <h4>Monster Volumes</h4>
            <editable-list
              :listItems="currentSettlement.monsterVolumes"
              :parentHeight="height"
              @update="update('monsterVolumes', $event)" />
          </div>
        </collapse-group>
      </div>
      <div class="SettlementInspector__statlist">
        <collapse-group :title="'Lost Settlements'" :initCollapse="true">
          <div slot="body" class="SettlementInspector__editableListWrapper">
            <editable-stat
              :statDisplayName="'Lost Settlement Count'"
              :initValue="0"
              :minValue="0" />
          </div>
        </collapse-group>
      </div>
      <div class="SettlementInspector__listPadding">
      </div>
    </div>
    <div class="SettlementInspector__bottomScrollFade" :class="[themeClass]">
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import { EditableList, EditableStat, CollapseGroup } from '@/components/GUIComponents'
import ThemeClass from '@/mixins/ThemeClass'
import {
  Innovations,
  Principles,
  SettlementLocations,
  Quarries
} from '../assets/StaticGameData'

export default {
  name: 'settlement-inspector',
  components: { EditableList, EditableStat, CollapseGroup },
  mixins: [ThemeClass],
  data: function () {
    return {
      height: 0,
      titleHeight: 41
    }
  },
  mounted: function () {
    this.height = this.$el.getBoundingClientRect().height + this.$el.getBoundingClientRect().top
    this.titleHeight = this.$el.querySelector('.SettlementInspector__settlementName').getBoundingClientRect().bottom
    this.$nextTick(() => {
      // Detect window resizes
      window.addEventListener('resize', (e) => {
        this.height = this.$el.getBoundingClientRect().height + this.$el.getBoundingClientRect().top
        this.titleHeight = this.$el.querySelector('.SettlementInspector__settlementName').getBoundingClientRect().bottom
      })
      // Detect scrolls
      window.addEventListener('scroll', (e) => {
        this.height = this.$el.getBoundingClientRect().height + this.$el.getBoundingClientRect().top
      })
    })
  },
  computed: {
    ...mapGetters([
      'inHistoryMode',
      'numberAliveInSettlement',
      'settlementDeathCount',
      'settlementMaleCount',
      'settlementFemaleCount',
      'currentSettlement'
    ]),
    principleNames: function () {
      return this.getNames(Principles)
    },
    innovationNames: function () {
      return this.getNames(Innovations)
    },
    settlementLocationNames: function () {
      return this.getNames(SettlementLocations)
    },
    quarryNames: function () {
      return this.getNames(Quarries)
    },
    titleAdjust: function () {
      return { top: 165 + (this.titleHeight - 41) + 'px' }
    }
  },
  methods: {
    ...mapActions([
      'updateSettlement'
    ]),
    update: function (stat, val) {
      var update = {}
      update[stat] = val
      this.updateSettlement({ id: this.currentSettlement._id, update: update })
    },
    getNames: function (obj) {
      return Object.values(obj).map((o) => { return o.name })
    }
  }
}
</script>

<style lang="scss" scoped>
.SettlementInspector {
  position: relative;
  min-width: 230px;

  &__settlementName {
    margin: 0 auto;
    text-transform: capitalize;
  }

  &__settlementLabel {
    margin: 0 auto;
    line-height: 6pt;

    &.theme-light {
      color: $light-highlight;
    }

    &.theme-dark {
      color: $dark-highlight;
    }
  }

  &__settlementStats {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }

  &__statbox {
    width: 33%;
  }

  &__topScrollFade {
    position: absolute;
    top: 165px;
    left: 0;
    right: 5px;
    height: 20px;
    z-index: 12;

    &.theme-light {
      background: linear-gradient($light-bg-alt, rgba(0,0,0,0));
    }

    &.theme-dark {
      background: linear-gradient($dark-bg-alt, rgba(0,0,0,0));
    }
  }

  &__bottomScrollFade {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 5px;
    height: 40px;
    z-index: 12;

    &.theme-light {
      background: linear-gradient(rgba(0,0,0,0), $light-bg-alt);
    }

    &.theme-dark {
      background: linear-gradient(rgba(0,0,0,0), $dark-bg-alt);
    }
  }

  &__scrollbox {
    position: absolute;
    top: 165px;
    bottom: 5px;
    right: 5px;
    left: 10px;
    padding-top: 20px;
    overflow-y: scroll;
    z-index: 11;

    &::-webkit-scrollbar { 
      display: none; 
    }
  }

  &__populationStats {
    width: 95%;
  }

  &__populationList {
    list-style-type: none;
    padding: 0;
    margin: 0 auto;
  }

  &__statlist {
    margin-top: 10px;
    width: 95%;
  }

  &__editableListWrapper {
    padding-bottom: 25px;
  }

  &__listPadding {
    height: 120px;
  }
}
</style>
