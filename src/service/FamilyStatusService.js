import store from '../store'
import Vue from 'vue'
import AppProps from '../property'

const familyStatusService = {
  getAll: function () {
    return store.getters['familyStatus/getAll']
  },
  getFamilyStatusById: function (id) {
    return store.getters['familyStatus/getFamilyStatusById'](id)
  },
  getFamilyStatusClient: function () {
    return store.getters['familyStatus/getFamilyStatusByAlias']('self')
  },
  loadAll: function (callback) {
    Vue.http.get(AppProps.apiUrl + '/family_status/')
      .then(response => {
        callback(response.body)
      })
  }
}

export default familyStatusService
