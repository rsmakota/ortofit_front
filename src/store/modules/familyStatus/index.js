import service from './../../../service/FamilyStatusService'

const state = {
  familyStatuses: {}
}
// getters
const getters = {
  getFamilyStatusById: (state, getters) => (id) => {
    return state.familyStatuses.find(familyStatus => familyStatus.id === id)
  },
  getFamilyStatusByAlias: (state, getters) => (alias) => {
    return state.familyStatuses.find(familyStatus => familyStatus.alias === alias)
  },
  getAll: state => state.familyStatuses
}

// actions
const actions = {
  loadFamilyStatuses ({ commit }) {
    service.loadAll(familyStatuses => {
      commit('initFamilyStatuses', familyStatuses)
    })
  }
}

// mutations
const mutations = {
  initFamilyStatuses (state, data) {
    state.familyStatuses = data
  }
}

export default {
  state: state,
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters
}
