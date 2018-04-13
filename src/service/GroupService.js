import apiClient from './../apiClient'

const groupService = {
  getCurrent (callback, errHandler) {
    apiClient.get('/group/', callback, errHandler)
  }
}

export default groupService
