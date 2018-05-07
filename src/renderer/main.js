import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import SurvivorsDatabase from './survivors'
import SettlementsDatabase from './settlements'

import { remote } from 'electron'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

console.log(remote.app.getPath('userData'))
var smts = new SettlementsDatabase(remote.app.getPath('userData'))
Vue.prototype.$settlements = smts
Vue.prototype.$survivors = new SurvivorsDatabase(remote.app.getPath('userData'), smts)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
