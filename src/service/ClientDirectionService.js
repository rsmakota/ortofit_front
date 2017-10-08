import store from '../store'

const clientDirectionService = {
  getAll: function () {
    return store.getters['clientDirection/getAll']
  }
}

export default clientDirectionService
