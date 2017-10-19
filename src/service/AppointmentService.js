import Vue from 'vue'
import AppProps from '../property'
import moment from 'moment'
import client from './../apiClient'

const appointmentService = {
  create: function (appointment, callback, errHandler) {
    client.post('/appointment/', appointment, callback, errHandler)
  },
  update: function (appointment, callback, errHandler) {
    client.put('/appointment/', appointment, callback, errHandler)
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
          let app = (response.body) ? response.body : null
          if (app) {
            app.appointment.dateTime = moment(app.appointment.dateTime)
          }
          callback(app)
        })
  },
  getEmpty: function () {
    return {clientId: null, description: null, officeId: null, serviceId: null, dateTime: null, state: 1, duration: 15, userId: null, forwarder: null, bold: false, flyer: false, phoneConfirm: false}
  }
}

export default appointmentService
