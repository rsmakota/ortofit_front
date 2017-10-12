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
  save: function (client, callback) {
    if ('id' in client) {
      this.update(client, callback)
      return
    }
    this.create(client, callback)
  },
  create: function (client, callback) {
    Vue.http.post(AppProps.apiUrl + '/client/', client)
      .then(
        response => {
          if (response.ok) {
            callback(response.body)
          }
        }
      )
  },
  update: function (client, callback) {
    Vue.http.put(AppProps.apiUrl + '/client/', client)
      .then(
        response => {
          if (response.ok) {
            callback(response.body)
          }
        }
      )
  },
  getEmpty: function () {
    return {name: null, gender: null, msisdn: null, clientDirectionId: null, countryId: 1}
  }
}

export default clientService
