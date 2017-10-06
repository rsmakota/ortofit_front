import store from '../store'

const doctorService = {
  getDoctorName: function (id) {
    return store.getters['doctor/getDoctorById'](id).name
  }
}

export default doctorService
