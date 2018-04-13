import apiClient from './../apiClient'

const userService = {
  getCurrent (callback, errHandler) {
    apiClient.get('/user/', callback, errHandler)
  },
  getCurrentGroups (callback, errHandler) {
    apiClient.get('/user/group', callback, errHandler)
  }
}

export default userService
