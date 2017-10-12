import store from '../store'

const reasonService = {
  getAll: function () {
    return store.getters['reason/getAll']
  }
}

export default reasonService
