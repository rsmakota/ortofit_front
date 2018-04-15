import apiClient from './../apiClient'

const userService = {
  getCurrent (callback, errHandler) {
    apiClient.get('/user/', callback, errHandler)
  },
  getCurrentGroups (callback, errHandler) {
    apiClient.get('/user/group', callback, errHandler)
  },
  changePassword (request, callback, errHandler) {
    apiClient.put('/user/change_password', request, callback, errHandler)
  },
  changeEmail (request, callback, errHandler) {
    apiClient.put('/user/change_email', request, callback, errHandler)
  }
}

export default userService
