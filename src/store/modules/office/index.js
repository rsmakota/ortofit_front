// import { bus } from './../../../components/event/bus'
import service from './../../../service/OfficeService'

// initial state
const state = {
  officeId: null,
  offices: {}
}
// getters
const getters = {
  getOfficeById: (state, getters) => (id) => {
    return state.offices.find(office => office.id === id)
  },
  getAll: state => state.offices
}

// actions
const actions = {
  loadOffices ({ commit }) {
    // Vue.http.get('office/')
    //   .then(response => {
    //     commit('initOffices', response.body)
    //     bus.$emit('office-store-loaded')
    //   })
    service.loadAll(offices => {
      commit('initOffices', offices)
      // bus.$emit('office-store-loaded')
    })
  }
}

// mutations
const mutations = {
  initOffices (state, data) {
    state.offices = data
    console.log('LOAD OFFICES', data)
  }
}

export default {
  state: state,
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters
}
