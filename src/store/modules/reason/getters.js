export default {
  getAll: (state, getters) => {
    return state.reasons
  },
  getReasonById: (state, getters) => (id) => {
    return state.reasons.find(reason => reason.id === id)
  }
}
