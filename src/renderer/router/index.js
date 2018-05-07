import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'kdm-app',
      component: require('@/components/KDMApp').default
    }
  ]
})
