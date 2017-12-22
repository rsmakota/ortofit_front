import apiClient from './../apiClient'

const chartService = {
  getClientsDirectionChart: function (from, to, callback, errorHandler) {
    apiClient.get('/chart/new_client_by_directions?start=' + from + '&end=' + to, callback, errorHandler)
  },
  getAppointmentsChart: function (from, to, callback, errorHandler) {
    apiClient.get('/chart/success_app_by_offices?start=' + from + '&end=' + to, callback, errorHandler)
  }
}
export default chartService
