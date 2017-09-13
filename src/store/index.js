import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import doctor from './modules/doctor'
import office from './modules/office'
import service from './modules/service'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: {},
    officeId: null,
    doctorId: null
  },
  mutations: {
    login (state, authentication) {
      state.auth = authentication
    },
    logout (state) {
      state.auth = {}
    },
    setOfficeId (state, officeId) {
      state.officeId = officeId
    },
    setDoctorId (state, doctorId) {
      state.doctorId = doctorId
    }
  },
  modules: {
    doctor,
    office,
    service
  },
  actions: {
    loadData ({ state, getters, commit, dispatch }) {
      dispatch('doctor/loadDoctors', state.empty)
      dispatch('office/loadOffices', state.empty)
      dispatch('service/loadServices', state.empty)
      // console.log(state)
    }
  },
  plugins: [createPersistedState({paths: ['auth', 'officeId']})]
})
export default store
