import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import doctor from './modules/doctor'
import office from './modules/office'
import reason from './modules/reason'
import service from './modules/service'
import clientDirection from './modules/clientDirection'
import familyStatus from './modules/familyStatus'
import insoleType from './modules/insoleType'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: {},
    doctorId: null
  },
  mutations: {
    login (state, authentication) {
      state.auth = authentication
    },
    logout (state) {
      state.auth = {}
    },
    setDoctorId (state, doctorId) {
      state.doctorId = doctorId
    }
  },
  getters: {
    getAuth: state => state.auth
  },
  modules: {
    doctor,
    office,
    service,
    clientDirection,
    reason,
    familyStatus,
    insoleType,
    user
  },
  actions: {
    loadData ({ state, getters, commit, dispatch }) {
      dispatch('doctor/loadDoctors', state.empty)
      dispatch('office/loadOffices', state.empty)
      dispatch('reason/loadReasons', state.empty)
      dispatch('service/loadServices', state.empty)
      dispatch('clientDirection/loadClientDirections', state.empty)
      dispatch('familyStatus/loadFamilyStatuses', state.empty)
      dispatch('insoleType/loadInsoleTypes', state.empty)
      dispatch('user/loadUser', state.empty)
    }
  },
  plugins: [createPersistedState({paths: ['auth', 'office.officeId', 'doctor.doctorId']})]
})
export default store
