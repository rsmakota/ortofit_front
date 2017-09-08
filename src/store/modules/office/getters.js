export default {
  getOfficeById: (state, getters) => (id) => {
    return state.offices.find(office => office.id === id)
  },
  getAll: (state, getters) => {
    return state.offices
  }
}
