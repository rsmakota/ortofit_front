import Vue from 'vue'
import AppProps from '../property'

const appointmentService = {
  create: function (data, callback, errHandler) {
    Vue.http.post(AppProps.apiUrl + '/appointment/', data)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  findById: function (id, callback) {
    Vue.http.get(AppProps.apiUrl + '/appointment/' + id)
      .then(
        response => {
          callback(((response.body) ? response.body : null))
        })
  }
}

export default appointmentService
