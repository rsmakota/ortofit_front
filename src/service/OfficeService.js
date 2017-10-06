import store from '../store'

const officeService = {
  getOfficeName: function (id) {
    return store.getters['office/getOfficeById'](id).name
  }
}

export default officeService
