import client from './../apiClient'

const appReasonService = {
  create: function (appReason, callback, errHandler) {
    client.post('/appointment_reason/', appReason, callback, errHandler)
  },
  findAllByAppId: function (appId, callback, errHandler) {
    client.get('/appointment_reason/appointment/' + appId, callback, errHandler)
  }
}

export default appReasonService
