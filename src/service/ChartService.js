import apiClient from './../apiClient'

const chartService = {
  getClientsDirectionChapter: function (from, to, callback, errorHandler) {
    apiClient.get('/chart/new_client_by_directions?start=' + from + '&end=' + to, callback, errorHandler)
  }
}
export default chartService
