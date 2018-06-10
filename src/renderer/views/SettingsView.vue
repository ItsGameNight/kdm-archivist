<template>
  <div class="SettingsView">
    <header>
      <button class="SettingsView__backButton" :class="[themeClass]"
        @click="$router.go(-1)">
        <font-awesome-icon :icon="backIcon" />
      </button>
      <h1>Settings</h1>
    </header>
    <div class="SettingsView__settings">
      <div class="SettingsView__setting">
        <span>Theme:</span>
        <dropdown
          :options="['Light', 'Dark']"
          :width="100"
          :initSelected="themeClass==='theme-light' ? 0 : 1"
          @selected="setThemeByIndex($event)"/>
      </div>
    </div>
    <div class="SettingsView__info">
      <h4>Twilight Archivist is an unofficial companion app for Kingdom Death: Monster and is in no way affiliated with or endorsed by Adam Poots or Adam Poots Games LLC.</h4>
      <h3>Twilight Archivist is an open source project!</h3>
      <button :class="[themeClass]" @click="github()">Fork us on Github!</button>
      <p>Got a cool idea for a new feature? Found a fix for a bug? We'd love your help!</p>
      <h4>Lead Developers:</h4>
      <div style="display: flex; flex-direction: row;">
        <button :class="themeClass" @click="alex()">Alex Karle</button>
        <button :class="themeClass" style="margin-left: 10px;" @click="makenzie()">Makenzie Schwartz</button>
      </div>
      <h5>Hit location icons and timeline icons provided by <a @click="icons8()">https://icons8.com</a>. All other icons provided by <a @click="fontawesome()">https://fontawesome.com</a>.</h5>
    </div>
    <footer>
      <span>Kingdom Death, Monster, and associated materials copyright (c) 2018 Adam Poots. Twilight Archivist (the application) copyright (c) 2018 Alexander Karle & Makenzie Schwartz.</span>
    </footer>
  </div>
</template>

<script type="text/javascript">
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/fontawesome-free-solid'
import { Dropdown } from '@/components/GUIComponents'
import ThemeClass from '@/mixins/ThemeClass'
import ThemeSwitch from '@/mixins/ThemeSwitch'

const shell = require('electron').remote.shell

export default {
  name: 'settings-view',
  components: { FontAwesomeIcon, Dropdown },
  mixins: [ThemeClass, ThemeSwitch],
  computed: {
    backIcon: function () {
      return faArrowAltCircleLeft
    }
  },
  methods: {
    github: function () {
      shell.openExternal('https://github.com/ItsGameNight/kdm-archivist/')
    },
    alex: function () {
      shell.openExternal('https://github.com/akarle')
    },
    makenzie: function () {
      shell.openExternal('https://github.com/mws96')
    },
    icons8: function () {
      shell.openExternal('https://icons8.com')
    },
    fontawesome: function () {
      shell.openExternal('https://fontawesome.com')
    }
  }
}
</script>

<style lang="scss" scoped>
.SettingsView {
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  header {
    position: relative;
    width: 100%;
    border-bottom: 2px solid;
  }

  h1 {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 16px;
    padding-left: 56px;
    padding-bottom: 6px;
  }

  &__backButton {
    position: absolute;
    top: 24px;
    left: 8px;
    font-size: 14pt;
    border: none;
  }

  &__settings {
    display: inline-block;
    width: 40%;
    margin: 12px;
    padding: 18px 24px;
  }

  &__setting {
    display: flex;
    flex-direction: row;
    padding-bottom: 18px;

    span {
      margin-right: 8px;
    }
  }

  &__info {
    display: inline-block;
    width: 40%;
    margin-left: 75px;
    vertical-align: top;
  }

  footer {
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    font-size: 9pt;
    text-align: center;
  }
}
</style>