import service from './../../../service/ClientDirectionService'

const state = {
  clientDirections: {}
}

const getters = {
  getClientDirectionById: (state, getters) => (id) => {
    return state.clientDirections.find(clientDirection => clientDirection.id === id)
  },
  getAll: state => state.clientDirections
}

const actions = {
  loadClientDirections ({ commit }) {
    service.loadAll(clientDirections => {
      commit('initClientDirections', clientDirections)
    }, () => {})
  }
}

const mutations = {
  initClientDirections (state, data) {
    state.clientDirections = data
  }
}

const clientDirection = {
  state: state,
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters
}

export default clientDirection
