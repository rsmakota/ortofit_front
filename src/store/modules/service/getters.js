export default {
  getServiceById: (state, getters) => (id) => {
    return state.services.find(service => service.id === id)
  },
  getAll: (state, getters) => {
    return state.services
  }
}
