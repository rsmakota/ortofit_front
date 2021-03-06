import client from './../apiClient'

const appReportService = {
  findByClientId: function (clientId, callback, errHandler) {
    client.get('/appointment_report/client/' + clientId, callback, errHandler)
  },
  findTotal: function (request, callback, errHandler) {
    client.get('/appointment_report/total?from=' + request.from + '&to=' + request.to + '&officeId=' + request.officeId, callback, errHandler)
  },
  findSettlement: function (request, callback, errHandler) {
    client.get('/appointment_report/settlement?from=' + request.from + '&to=' + request.to, callback, errHandler)
  }
}

export default appReportService
