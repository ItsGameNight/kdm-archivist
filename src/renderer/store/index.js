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
  },
  mutations: {
    SET_SURVIVORS (state, newObj) {
      state.survivors = newObj
    },
    SET_SETTLEMENTS (state, newObj) {
      state.settlements = newObj
    },
    SET_CURRENTSMT (state, id) {
      state.currentSmt = id
    },
    /* trying to be smart about updates -- deprecated bc doesn't cause
     * reactive updating
     * IT IS THE UI's JOB TO ORDER
    SET_SETTLEMENT_BY_ID (state, payload) {
      var idx = state.settlements.findIndex((s) => { return s._id === payload.id })
      state.settlements[idx] = payload.newObj
    },
    SET_SURVIVOR_BY_ID (state, payload) {
      var idx = state.survivors.findIndex((s) => { return s._id === payload.id })
      state.survivors[idx] = payload.newObj
    }
    */
  },
  actions: {
    setCurrentSmt ({ commit }, id) {
      commit('SET_CURRENTSMT', id)
    },
    loadSettlements ({ commit }) {
      this.$settlements.getAll((smts) => {
        commit('SET_SETTLEMENTS', smts)
      })
    },
    loadSurvivors ({ commit }) {
      this.$survivors.getAll((survs) => {
        commit('SET_SURVIVORS', survs)
      })
    },
    updateSettlement ({ commit }, payload) {
      console.log(payload)
      var id = payload.id
      var update = payload.update
      // update the smt in db
      this.$settlements.updateOne(id, update, () => {
        // get the whole new object
        this.$settlements.getMatching({ _id: id }, (s) => {
          // update store
          this.$settlements.getAll((smts) => {
            commit('SET_SETTLEMENTS', smts)
          })
        })
      })
    },
    createSettlement ({ commit }) {
      this.$settlements.createNew(() => {
        this.$settlements.getAll((smts) => {
          commit('SET_SETTLEMENTS', smts)
        })
      })
    },
    deleteSettlement ({ commit }, id) {
      this.$settlements.remove(id, () => {
        this.$settlements.getAll((smts) => {
          commit('SET_SETTLEMENTS', smts)
          commit('SET_CURRENTSMT', null)
        })
      })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
