import service from './../../../service/OfficeService'

const state = {
  officeId: null,
  offices: {}
}
// getters
const getters = {
  getOfficeById: (state, getters) => (id) => {
    return state.offices.find(office => office.id === id)
  },
  getAll: state => state.offices,
  getOfficeId: state => state.officeId
}

// actions
const actions = {
  loadOffices ({ commit }) {
    service.loadAll(offices => {
      commit('initOffices', offices)
    })
  }
}

// mutations
const mutations = {
  initOffices (state, data) {
    state.offices = data
    if ((state.officeId === null) && (state.offices.length > 0)) {
      state.officeId = state.offices[0].id
    }
  },
  setOfficeId (state, officeId) {
    state.officeId = officeId
    console.log('officeId', officeId)
  }
}

export default {
  state: state,
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters
}
