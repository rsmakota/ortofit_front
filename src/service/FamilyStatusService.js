import store from '../store'
import client from './../apiClient'

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
  loadAll: function (callback, errorHandler) {
    client.get('/family_status/', callback, errorHandler)
  }
}

export default familyStatusService
