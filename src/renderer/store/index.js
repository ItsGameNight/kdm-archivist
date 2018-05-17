import Vue from 'vue'
import Vuex from 'vuex'
import goodnessFunction from '../../db/goodness.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    survivors: [],
    settlements: [],
    snapshots: [],
    currentSmt: null,
    currentSnap: null
  },
  getters: {
    snapshotSurvivors: (state) => {
      if (state.currentSnap == null) { return [] }
      var snap = state.snapshots.find((s) => { return s._id === state.currentSnap })
      return snap.survivors
    },

    // OUTWARD FACING -- takes into account snapshot (which overrides currentSmt)
    survivorsInSettlement: (state, getters) => {
      if (state.currentSnap == null) {
        return state.survivors.filter((s) => { return s.settlementID === state.currentSmt })
      } else {
        return getters.snapshotSurvivors
      }
    },

    survivorsInSettlementGScores: (state, getters) => {
      var survs = getters.survivorsInSettlement
      return survs.map((s) => { return goodnessFunction(s) })
    },

    snapshotSettlement: (state) => {
      if (state.currentSnap == null) { return {} }
      var snap = state.snapshots.find((s) => { return s._id === state.currentSnap })
      return snap.settlement
    },

    // OUTWARD FACING -- takes into account snapshot (which overrides currentSmt)
    currentSettlement: (state, getters) => {
      if (state.currentSnap == null) {
        return state.settlements.find((s) => { return s._id === state.currentSmt })
      } else {
        return getters.snapshotSettlement
      }
    },

    numberAliveInSettlement: (state, getters) => {
      return getters.survivorsInSettlement.filter((s) => { return s.alive === true }).length
    },

    settlementDeathCount: (state, getters) => {
      return getters.survivorsInSettlement.filter((s) => { return s.alive === false }).length
    },

    settlementMaleCount: (state, getters) => {
      return getters.survivorsInSettlement.filter((s) => { return s.sex === 'm' }).length
    },

    settlementFemaleCount: (state, getters) => {
      return getters.survivorsInSettlement.filter((s) => { return s.sex === 'f' }).length
    },

    snapshotsForCurrentSettlement: (state) => {
      return state.snapshots.filter((s) => { return s.settlement._id === state.currentSmt })
    }
  },
  mutations: {
    SET_SURVIVORS (state, newObj) {
      state.survivors = newObj
    },
    SET_SETTLEMENTS (state, newObj) {
      state.settlements = newObj
    },
    SET_SNAPSHOTS (state, newObj) {
      state.snapshots = newObj
    },
    SET_CURRENTSMT (state, id) {
      state.currentSmt = id
    },
    SET_CURRENTSNAP (state, id) {
      state.currentSnap = id
    },
    // Needs Vue.set --> https://vuejs.org/v2/guide/list.html#Caveats
    SET_SETTLEMENT_BY_ID (state, payload) {
      var idx = state.settlements.findIndex((s) => { return s._id === payload.id })
      Vue.set(state.settlements, idx, payload.newObj)
    },
    SET_SURVIVOR_BY_ID (state, payload) {
      var idx = state.survivors.findIndex((s) => { return s._id === payload.id })
      Vue.set(state.survivors, idx, payload.newObj)
    }
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

    loadSnapshots ({ commit }) {
      this.$snapshots.getAll((snaps) => {
        commit('SET_SNAPSHOTS', snaps)
      })
    },

    updateSettlement ({ state, commit }, payload) {
      // ignore if in snapshot mode!
      // TODO: decide if wanna handle this way!
      if (state.currentSnap != null) { return }
      var id = payload.id
      var update = payload.update
      // update the smt in db
      this.$settlements.updateOne(id, update, () => {
        // get the whole new object
        this.$settlements.getMatching({ _id: id }, (s) => {
          // update store
          commit('SET_SETTLEMENT_BY_ID', { id: s[0]._id, newObj: s[0] })
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
    },

    dropAllSurvivors ({ commit }) {
      this.$survivors.dropAll(() => {
        this.$survivors.getAll((survs) => {
          commit('SET_SURVIVORS', survs)
        })
      })
    },

    addNewSurvivor ({ commit }, smtID) {
      console.log(smtID)
      this.$survivors.addBase(smtID, { name: 'Test' }, () => {
        this.$survivors.getAll((survs) => {
          commit('SET_SURVIVORS', survs)
        })
      })
    },

    updateSurvivor ({ state, commit }, payload) {
      if (state.currentSnap != null) { return }
      var id = payload.id
      var update = payload.update
      this.$survivors.updateOne(id, update, () => {
        this.$survivors.getMatching({ _id: id }, (s) => {
          commit('SET_SURVIVOR_BY_ID', { id: s[0]._id, newObj: s[0] })
        })
      })
    },

    createSnapshot ({ commit }, smtID) {
      this.$snapshots.createNew(smtID, () => {
        this.$snapshots.getAll((snaps) => {
          commit('SET_SNAPSHOTS', snaps)
        })
      })
    },

    setCurrentSnap ({ commit }, id) {
      commit('SET_CURRENTSNAP', id)
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
