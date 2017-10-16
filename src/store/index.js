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
    service,
    clientDirection,
    reason,
    familyStatus,
    insoleType
  },
  actions: {
    loadData ({ state, getters, commit, dispatch }) {
      dispatch('doctor/loadDoctors', state.empty)
      dispatch('office/loadOffices', state.empty)
      dispatch('reason/loadReasons', state.empty)
      dispatch('service/loadServices', state.empty)
      dispatch('clientDirection/loadClientDirections', state.empty)
      dispatch('familyStatus/loadFamilyStatuses', state.empty)
      dispatch('insoleTypes/loadInsoleTypes', state.empty)
    }
  },
  plugins: [createPersistedState({paths: ['auth', 'officeId']})]
})
export default store
