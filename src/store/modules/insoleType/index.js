// import { bus } from './../../../components/event/bus'
import service from './../../../service/InsoleTypeService'

// initial state
const state = {
  insoleTypes: {}
}
// getters
const getters = {
  getInsoleTypeById: (state, getters) => (id) => {
    return state.insoleTypes.find(insoleType => insoleType.id === id)
  },
  getAll: state => state.insoleTypes
}

// actions
const actions = {
  loadInsoleTypes ({ commit }) {
    service.loadAll(offices => {
      commit('initInsoleTypes', offices)
    })
  }
}

// mutations
const mutations = {
  initInsoleTypes (state, data) {
    state.insoleTypes = data
  }
}

export default {
  state: state,
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters
}
