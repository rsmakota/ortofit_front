export default {
  getDoctorById: (state, getters) => (id) => {
    return state.doctors.find(doctor => doctor.id === id)
  },
  getAll: (state, getters) => {
    return state.doctors
  }
}
