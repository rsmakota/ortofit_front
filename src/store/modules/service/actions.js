import Vue from 'vue'
import { bus } from './../../../components/event/bus'

export default {
  loadServices ({state, getters, commit, dispatch}) {
    Vue.http.get('service/')
      .then(response => {
        commit('initServices', response.body)
        bus.$emit('service-store-loaded')
      })
  }
}
