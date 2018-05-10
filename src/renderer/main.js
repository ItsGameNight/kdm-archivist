import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import SurvivorsDatabase from '../db/survivors'
import SettlementsDatabase from '../db/settlements'

import { remote } from 'electron'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

console.log(remote.app.getPath('userData'))
var smts = new SettlementsDatabase(remote.app.getPath('userData'))
var survs = new SurvivorsDatabase(remote.app.getPath('userData'), smts)

Vue.prototype.$settlements = smts
Vue.prototype.$survivors = survs

store.$settlements = smts
store.$survivors = survs

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
