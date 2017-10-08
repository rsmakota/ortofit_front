import Vue from 'vue'
import { bus } from './../../../components/event/bus'
export default {
  loadClientDirections ({state, getters, commit, dispatch}) {
    Vue.http.get('client_direction/')
      .then(response => {
        commit('initClientDirections', response.body)
        bus.$emit('client_direction-store-loaded')
      })
  }
}
