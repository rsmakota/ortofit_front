export default {
  getClientDirectionById: (state, getters) => (id) => {
    return state.clientDirections.find(clientDirection => clientDirection.id === id)
  },
  getAll: (state, getters) => {
    return state.clientDirections
  }
}
