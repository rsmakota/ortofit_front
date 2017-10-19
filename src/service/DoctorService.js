import store from '../store'
import client from './../apiClient'

const doctorService = {
  getDoctorName: function (id) {
    return store.getters['doctor/getDoctorById'](id).name
  },
  getAll: function () {
    return store.getters['doctor/getAll']
  },
  getDoctorById: function (id) {
    return store.getters['doctor/getDoctorById'](id)
  },
  getEmpty: function () {
    return {name: null, id: null}
  },
  loadAll: function (callback, errorHandler) {
    client.get('/doctor/', callback, errorHandler)
  }
}

export default doctorService
