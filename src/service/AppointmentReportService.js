import client from './../apiClient'

const appReportService = {
  findByClientId: function (clientId, callback, errHandler) {
    client.get('/appointment_report/client/' + clientId, callback, errHandler)
  }
}

export default appReportService
