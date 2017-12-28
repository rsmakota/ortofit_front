import apiClient from './../apiClient'

const remindService = {
  create: function (remind, callback, errHandler) {
    apiClient.post('/remind/', remind, callback, errHandler)
  },
  update: function (remind, callback, errHandler) {
    apiClient.put('/remind/', remind, callback, errHandler)
  },
  delete: function (remindId, callback, errHandler) {
    apiClient.delete('/remind/', remindId, callback, errHandler)
  },
  save: function (remind, callback, errHandler) {
    if (('id' in remind) && (remind.id !== null)) {
      this.update(remind, callback, errHandler)
      return
    }
    this.create(remind, callback, errHandler)
  },
  findByPersonIdAndAppId (personId, appId, callback, errHandler) {
    apiClient.get('/remind/appointment/' + appId + '/person/' + personId, callback, errHandler)
  },

  getEmpty: function () {
    return { id: null, personId: null, appointmentId: null, dateTime: null, description: null }
  },
  findAll: function (request, callback, errorHandler) {
    let query = '?page=' + request.page + '&size=' + request.size
    if (request.msisdn) {
      query += '&msisdn=' + request.msisdn
    }
    for (let i in request.sort) {
      query += '&sort=' + request.sort[i]
    }
    apiClient.get('/remind/list' + query, callback, errorHandler)
  }
}

export default remindService
