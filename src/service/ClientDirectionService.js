import store from '../store'

const clientDirectionService = {
  getAll: function () {
    return store.getters['clientDirection/getAll']
  },
  findById: function (id) {
    return store.getters['clientDirection/getClientDirectionById'](id)
  }
}

export default clientDirectionService
