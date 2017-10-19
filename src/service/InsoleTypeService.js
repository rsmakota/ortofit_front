import store from '../store'
import client from './../apiClient'

const insoleTypeService = {
  getAll: function () {
    return store.getters['insoleType/getAll']
  },
  getInsoleTypeById: function (id) {
    return store.getters['insoleType/getInsoleTypeById'](id)
  },
  loadAll: function (callback, errorHandler) {
    client.get('/insole_type/', callback, errorHandler)
  }
}

export default insoleTypeService
