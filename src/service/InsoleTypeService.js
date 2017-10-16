import store from '../store'
import Vue from 'vue'
import AppProps from '../property'

const insoleTypeService = {
  getAll: function () {
    return store.getters['insoleType/getAll']
  },
  getInsoleTypeById: function (id) {
    return store.getters['insoleType/getInsoleTypeById'](id)
  },
  loadAll: function (callback) {
    Vue.http.get(AppProps.apiUrl + '/insole_type/')
      .then(response => {
        callback(response.body)
      })
  }
}

export default insoleTypeService
