import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
  plugins: [createPersistedState({paths: ['auth', 'officeId']})]
})
export default store
