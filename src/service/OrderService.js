import apiClient from './../apiClient'

const orderService = {
  findAll (limit, callback, errHandler) {
    apiClient.get('/order/?limit=' + limit, callback, errHandler)
  },
  process (id, callback, errHandler) {
    apiClient.get('/order/process/' + id, callback, errHandler)
  }
}

export default orderService
