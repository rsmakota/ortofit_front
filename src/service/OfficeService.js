import store from '../store'
import client from './../apiClient'

const officeService = {
  getOfficeName: function (id) {
    return store.getters['office/getOfficeById'](id).name
  },
  getAll: function () {
    return store.getters['office/getAll']
  },
  getOfficeById: function (id) {
    return store.getters['office/getOfficeById'](id)
  },
  loadAll: function (callback, errorHandler) {
    client.get('/office/', callback, errorHandler)
  }
}

export default officeService
