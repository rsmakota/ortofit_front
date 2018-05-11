import apiClient from './../apiClient'

const groupService = {
  getCurrent (callback, errHandler) {
    apiClient.get('/group/', callback, errHandler)
  },
  getAll (callback, errHandler) {
    apiClient.get('/group/all', callback, errHandler)
  }
}

export default groupService
