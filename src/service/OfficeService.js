import store from '../store'

const officeService = {
  getOfficeName: function (id) {
    return store.getters['office/getOfficeById'](id).name
  },
  getAll: function () {
    return store.getters['office/getAll']
  },
  getOfficeById: function (id) {
    return store.getters['office/getOfficeById'](id)
  }
}

export default officeService
