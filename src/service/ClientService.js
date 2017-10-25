import apiClient from './../apiClient'

const clientService = {
  findByMsisdn: function (msisdn, callback, errorHandler) {
    apiClient.get('/client/msisdn/' + msisdn, callback, errorHandler)
  },
  findById: function (id, callback, errorHandler) {
    apiClient.get('/client/id/' + id, callback, errorHandler)
  },
  save: function (client, callback) {
    if (('id' in client) && (client.id !== null)) {
      this.update(client, callback)
      return
    }
    this.create(client, callback)
  },
  create: function (client, callback, errorHandler) {
    apiClient.post('/client/', client, callback, errorHandler)
  },
  update: function (client, callback, errorHandler) {
    apiClient.put('/client/', client, callback, errorHandler)
  },
  getEmpty: function () {
    return {id: null, name: null, gender: null, msisdn: null, clientDirectionId: null, countryId: 1}
  },
  findAll: function (page, callback, errorHandler) {
    apiClient.get('/client/list?sort=id&msisdn', callback, errorHandler)
  }
}

export default clientService
