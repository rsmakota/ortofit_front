import store from '../store'
import client from './../apiClient'

const reasonService = {
  getAll: function () {
    return store.getters['reason/getAll']
  },
  getReasonById: function (id) {
    return store.getters['reason/getReasonById'](id)
  },
  loadAll: function (callback, errorHandler) {
    client.get('/reason/', callback, errorHandler)
  }
}

export default reasonService
