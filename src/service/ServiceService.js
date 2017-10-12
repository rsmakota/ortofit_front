import store from '../store'

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
  }
}

export default serviceService
