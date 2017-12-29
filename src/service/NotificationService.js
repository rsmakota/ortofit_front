import client from './../apiClient'

const notificationService = {
  findAll: function (callback, errHandler) {
    client.get('/notification/all', callback, errHandler)
  }
}

export default notificationService
