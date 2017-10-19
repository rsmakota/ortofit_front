import serviceService from './../../../service/ServiceService'

const state = {
  serviceId: null,
  services: {}
}

const actions = {
  loadServices ({commit}) {
    serviceService.loadAll(services => {
      commit('initServices', services)
    })
  }
}

const getters = {
  getServiceById: (state, getters) => (id) => {
    return state.services.find(service => service.id === id)
  },
  getAll: (state) => {
    return state.services
  }
}

const mutations = {
  initServices (state, data) {
    state.services = data
  }
}

const service = {
  state: state,
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters
}

export default service
