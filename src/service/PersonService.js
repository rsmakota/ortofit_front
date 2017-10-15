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
  save: function (person, callback, errHandler) {
    if ('id' in person) {
      this.update(person, callback, errHandler)
      return
    }
    this.create(person, callback, errHandler)
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
  },
  getEmpty: function (isClient) {
    return {id: null, name: null, gender: null, familyStatus: null, born: null, isClient: isClient}
  }
}

export default personService
