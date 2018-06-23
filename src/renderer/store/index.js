import Vue from 'vue'
import Vuex from 'vuex'
import goodnessFunction from '../../db/goodness.js'
import { BaseTimeline } from '../assets/StaticGameData'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    survivors: [],
    settlements: [],
    snapshots: [],
    currentSmt: null,
    currentSnap: null,
    theme: null,
    userPrefs: {
      theme: 'theme-light',
      assistantEnabled: true
    }
  },
  getters: {
    snapshotSurvivors: (state, getters) => {
      if (!getters.inHistoryMode) {
        return []
      }
      var snap = state.snapshots.find((s) => { return s._id === state.currentSnap })
      return snap.survivors
    },

    // OUTWARD FACING -- takes into account snapshot (which overrides currentSmt)
    survivorsInSettlement: (state, getters) => {
      if (!getters.inHistoryMode) {
        return state.survivors.filter((s) => { return s.settlementID === state.currentSmt })
      } else {
        return getters.snapshotSurvivors
      }
    },

    survivorsInSettlementGScores: (state, getters) => {
      var survs = getters.survivorsInSettlement
      return survs.map((s) => { return goodnessFunction(s) })
    },

    snapshotSettlement: (state, getters) => {
      if (!getters.inHistoryMode) { return {} }
      var snap = state.snapshots.find((s) => { return s._id === state.currentSnap })
      return snap.settlement
    },

    // OUTWARD FACING -- takes into account snapshot (which overrides currentSmt)
    currentSettlement: (state, getters) => {
      if (!getters.inHistoryMode) {
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
      return getters.survivorsInSettlement.filter((s) => {
        return s.sex === 'm' && s.alive === true
      }).length
    },

    settlementFemaleCount: (state, getters) => {
      return getters.survivorsInSettlement.filter((s) => {
        return s.sex === 'f' && s.alive === true
      }).length
    },

    settlementDepartingCount: (state, getters) => {
      return getters.survivorsInSettlement.filter((s) => { return s.departing }).length
    },

    snapshotsForCurrentSettlement: (state) => {
      return state.snapshots.filter((s) => { return s.settlement._id === state.currentSmt })
    },

    inHistoryMode: (state) => {
      return state.currentSnap != null
    },

    theme: (state) => {
      return state.userPrefs.theme
    },

    assistantEnabled: (state) => {
      return state.userPrefs.assistantEnabled
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
    },
    LOAD_USER_PREF (state, payload) {
      state.userPrefs[payload.name] = payload.val
    },
    SET_USER_PREF (state, payload) {
      state.userPrefs[payload.name] = payload.val
      this.$userPrefs.set(payload.name, payload.val)
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

    loadUserPrefs ({ state, commit }) {
      for (var pref in state.userPrefs) {
        if (this.$userPrefs.has(pref)) {
          commit('LOAD_USER_PREF', { name: pref, val: this.$userPrefs.get(pref) })
        }
      }
    },

    updateSettlement ({ state, commit, getters }, payload) {
      // ignore if in snapshot mode!
      if (getters.inHistoryMode) { return }
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

    createNamedSettlement ({ commit }, name) {
      this.$settlements.createNew((newDoc) => {
        this.$settlements.updateOne(newDoc._id, { name: name, timeline: BaseTimeline.years }, () => {
          this.$settlements.getAll((smts) => {
            commit('SET_SETTLEMENTS', smts)
          })
        })
      })
    },

    deleteSettlement ({ commit }, id) {
      // remove the settlement
      this.$settlements.remove(id, () => {
        this.$settlements.getAll((smts) => {
          commit('SET_SETTLEMENTS', smts)
          commit('SET_CURRENTSMT', null)
        })
      })

      // remove all associated survivors (doesn't need to be sync)
      this.$survivors.removeAllByCondition({ settlementID: id }, () => {
        this.$survivors.getAll((survs) => {
          commit('SET_SURVIVORS', survs)
        })
      })

      // remove all associated snapshots
      this.$snapshots.removeAllByCondition({ 'settlement._id': id }, () => {
        this.$snapshots.getAll((snaps) => {
          commit('SET_SNAPSHOTS', snaps)
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

    addNewSurvivor ({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        this.$survivors.addBase(payload.smtID, { birthYear: payload.birthYear }, (newSurv) => {
          this.$survivors.getAll((survs) => {
            commit('SET_SURVIVORS', survs)
            resolve(newSurv._id)
          })
        })
      })
    },

    updateSurvivor ({ state, commit, getters }, payload) {
      if (getters.inHistoryMode) { return }
      var id = payload.id
      var update = payload.update
      this.$survivors.updateOne(id, update, () => {
        this.$survivors.getMatching({ _id: id }, (s) => {
          commit('SET_SURVIVOR_BY_ID', { id: s[0]._id, newObj: s[0] })
        })
      })
    },

    updateAllSurvivorsInSettlement ({ state, commit, getters }, payload) {
      if (getters.inHistoryMode) { return }
      var update = payload.update
      this.$survivors.updateSettlement(state.currentSmt, update, () => {
        this.$survivors.getAll((survs) => {
          commit('SET_SURVIVORS', survs)
        })
      })
    },

    createSnapshot ({ commit }, ids) {
      this.$snapshots.createNew(ids.smtID, ids.noteID, () => {
        this.$snapshots.getAll((snaps) => {
          commit('SET_SNAPSHOTS', snaps)
        })
      })
    },

    setCurrentSnap ({ commit }, id) {
      commit('SET_CURRENTSNAP', id)
    },

    leaveHistoryMode ({ commit }) {
      commit('SET_CURRENTSNAP', null)
    },

    setCurrentSnapByLanternYearAndNoteID ({ getters, commit }, ids) {
      var snaps = getters.snapshotsForCurrentSettlement.filter((s) => {
        return s.noteID === ids.noteID && s.settlement.lanternYear === ids.ly
      })

      if (snaps.length > 0) {
        commit('SET_CURRENTSNAP', snaps[0]._id)
      } else {
        commit('SET_CURRENTSNAP', null)
      }
    },

    setCurrentSnapByLanternYear ({ getters, commit }, ly) {
      var snapsOfLY = getters.snapshotsForCurrentSettlement.filter((s) => {
        return s.settlement.lanternYear === ly
      })

      if (snapsOfLY.length > 0) {
        commit('SET_CURRENTSNAP', snapsOfLY[0]._id)
      } else {
        commit('SET_CURRENTSNAP', null)
      }
    },

    deleteSurvivor ({ commit }, payload) {
      var id = payload.id
      this.$survivors.remove(id, () => {
        this.$survivors.getAll((survs) => {
          commit('SET_SURVIVORS', survs)
        })
      })
    },

    setUserPref ({ commit }, payload) {
      commit('SET_USER_PREF', payload)
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
