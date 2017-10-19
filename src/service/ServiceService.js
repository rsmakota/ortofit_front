import store from '../store'
import client from './../apiClient'

const serviceService = {
  getServiceName: function (id) {
    return store.getters['service/getServiceById'](id).name
  },
  getAll: function () {
    return store.getters['service/getAll']
  },
  getServiceById: function (id) {
    return store.getters['service/getServiceById'](id)
  },
  getEmpty: function () {
    return {name: null, id: null}
  },
  loadAll: function (callback, errorHandler) {
    client.get('/service/', callback, errorHandler)
  }
}

export default serviceService
