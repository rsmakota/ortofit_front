import Vue from 'vue'
import { bus } from './../../../components/event/bus'

export default {
  loadReasons ({ state, getters, commit, dispatch }) {
    Vue.http.get('reason/')
      .then(response => {
        commit('initReasons', response.body)
        bus.$emit('reason-store-loaded')
      })
  }
}
