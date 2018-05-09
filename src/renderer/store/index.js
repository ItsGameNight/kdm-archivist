import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    survivors: [],
    settlements: [],
    currentSmt: null
  },
  getters: {
    SET_SURVIVORS (state, newObj) {
      state.survivors = newObj
    },
    SET_SETTLEMENTS (state, newObj) {
      state.settlements = newObj
    },
    SET_CURRENTSMT (state, id) {
      state.currentSmt = id
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production'
})
