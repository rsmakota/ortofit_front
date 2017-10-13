import store from '../store'
import Vue from 'vue'

const officeService = {
  getOfficeName: function (id) {
    return store.getters['office/getOfficeById'](id).name
  },
  getAll: function () {
    return store.getters['office/getAll']
  },
  getOfficeById: function (id) {
    return store.getters['office/getOfficeById'](id)
  },
  loadAll: function (callback) {
    Vue.http.get('office/')
      .then(response => {
        callback(response.body)
      })
  }
}

export default officeService
