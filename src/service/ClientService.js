import Vue from 'vue'
import AppProps from '../property'

const clientService = {
  findByMsisdn: function (msisdn, callback) {
    Vue.http.get(AppProps.apiUrl + '/client/msisdn/' + msisdn)
      .then(
      response => {
        callback(((response.body) ? response.body : null))
      })
  },
  findById: function (id, callback) {
    Vue.http.get(AppProps.apiUrl + '/client/id/' + id)
      .then(
        response => {
          callback(((response.body) ? response.body : null))
        })
  },
  create: function (data, callback) {
    Vue.http.post(AppProps.apiUrl + '/client/', data)
      .then(
        response => {
          if (response.ok) {
            callback(response.body)
          }
        }
      )
  }
}

export default clientService
