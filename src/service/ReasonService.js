import store from '../store'

const reasonService = {
  getAll: function () {
    return store.getters['reason/getAll']
  },
  getReasonById: function (id) {
    return store.getters['reason/getReasonById'](id)
  }
}

export default reasonService
