import store from '../store'
import client from './../apiClient'

const clientDirectionService = {
  getAll: function () {
    return store.getters['clientDirection/getAll']
  },
  findById: function (id) {
    return store.getters['clientDirection/getClientDirectionById'](id)
  },
  loadAll: function (callback, errorHandler) {
    client.get('/client_direction/', callback, errorHandler)
  }
}

export default clientDirectionService
