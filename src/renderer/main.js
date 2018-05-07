import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import * as survivors from '../db/survivors'
import * as settlements from '../db/settlements'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

Vue.prototype.$survivors = survivors
Vue.prototype.$settlements = settlements
