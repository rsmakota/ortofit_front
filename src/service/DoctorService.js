import store from '../store'

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
  }
}

export default doctorService
