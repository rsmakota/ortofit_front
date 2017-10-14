import Vue from 'vue'
import AppProps from '../property'

const personService = {
  create: function (person, callback, errHandler) {
    Vue.http.post(AppProps.apiUrl + '/person/', person)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  update: function (person, callback, errHandler) {
    Vue.http.put(AppProps.apiUrl + '/person/', person)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  findAllByClientId: function (clientId, callback, errHandler) {
    Vue.http.get(AppProps.apiUrl + '/person/client_id/' + clientId)
      .then(
        response => {
          callback(((response.body) ? response.body : null))
        },
        response => {
          errHandler(response.error)
        })
  }
}

export default personService
