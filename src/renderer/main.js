import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import SurvivorsDatabase from '../db/survivors'
import SettlementsDatabase from '../db/settlements'
import SnapshotsDatabase from '../db/snapshots'

import { remote } from 'electron'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

console.log(remote.app.getPath('userData'))
var smts = new SettlementsDatabase(remote.app.getPath('userData'))
var survs = new SurvivorsDatabase(remote.app.getPath('userData'), smts)
var snaps = new SnapshotsDatabase(remote.app.getPath('userData'), smts, survs)

Vue.prototype.$settlements = smts
Vue.prototype.$survivors = survs
Vue.prototype.$snapshots = snaps

store.$settlements = smts
store.$survivors = survs
store.$snapshots = snaps

// Add long press directive
var longpress = require('vue-long-press-directive')
Vue.use(longpress, { duration: 500 })

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
