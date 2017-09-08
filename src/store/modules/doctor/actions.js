import Vue from 'vue'
import { bus } from './../../../components/event/bus'
export default {
  loadDoctors ({state, getters, commit, dispatch}) {
    Vue.http.get('doctor/')
      .then(response => {
        commit('initDoctors', response.body)
        bus.$emit('doctor-store-loaded')
      })
  }
}
