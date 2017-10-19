import service from './../../../service/ReasonService'

const state = {
  reasons: {}
}

const actions = {
  loadReasons ({commit}) {
    service.loadAll(reasons => {
      commit('initReasons', reasons)
    }, () => {})
  }
}

const getters = {
  getAll: (state) => {
    return state.reasons
  },
  getReasonById: (state, getters) => (id) => {
    return state.reasons.find(reason => reason.id === id)
  }
}

const mutations = {
  initReasons (state, data) {
    state.reasons = data
  }
}

const reason = {
  state: state,
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters
}

export default reason
