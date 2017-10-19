import service from './../../../service/DoctorService'

const state = {
  doctorId: null,
  doctors: {}
}

const actions = {
  loadDoctors ({commit}) {
    service.loadAll(doctors => {
      commit('initDoctors', doctors)
    }, () => {})
  }
}

const getters = {
  getDoctorById: (state, getters) => (id) => {
    return state.doctors.find(doctor => doctor.id === id)
  },
  getAll: (state) => {
    return state.doctors
  }
}

const mutations = {
  initDoctors (state, data) {
    state.doctors = data
  }
}

const doctor = {
  state: state,
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters
}

export default doctor
