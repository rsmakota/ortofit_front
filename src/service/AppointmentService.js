import Vue from 'vue'
import AppProps from '../property'

const appointmentService = {
  create: function (appointment, callback, errHandler) {
    Vue.http.post(AppProps.apiUrl + '/appointment/', appointment)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  update: function (appointment, callback, errHandler) {
    Vue.http.put(AppProps.apiUrl + '/appointment/', appointment)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  save: function (appointment, callback, errHandler) {
    if ('id' in appointment) {
      this.update(appointment, callback, errHandler)
      return
    }
    this.create(appointment, callback, errHandler)
  },
  findById: function (id, callback) {
    Vue.http.get(AppProps.apiUrl + '/appointment/' + id)
      .then(
        response => {
          callback(((response.body) ? response.body : null))
        })
  },
  getEmpty: function () {
    return {clientId: null, description: null, officeId: null, serviceId: null, dateTime: null, state: 1, duration: 15, userId: null, forwarder: null, bold: false, flyer: false, phoneConfirm: false}
  }
}

export default appointmentService
