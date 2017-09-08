import Vue from 'vue'
import { bus } from './../../../components/event/bus'

export default {
  loadOffices ({ state, getters, commit, dispatch }) {
    Vue.http.get('office/')
      .then(response => {
        commit('initOffices', response.body)
        bus.$emit('office-store-loaded')
      })
  }
}
