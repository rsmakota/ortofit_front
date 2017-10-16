import Vue from 'vue'
import AppProps from '../property'

const personServiceService = {
  create: function (person, callback, errHandler) {
    Vue.http.post(AppProps.apiUrl + '/person_service/', person)
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
    Vue.http.put(AppProps.apiUrl + '/person_service/', person)
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
  findAllByPersonId: function (personId, callback, errHandler) {
    Vue.http.get(AppProps.apiUrl + '/person_service/person/' + personId)
      .then(
        response => {
          callback(((response.body) ? response.body : null))
        },
        response => {
          errHandler(response.error)
        })
  },
  getEmpty: function (clientId, personId, appointmentId) {
    return { id: null, clientId: clientId, personId: personId, appointmentId: appointmentId, serviceId: null, date: null, number: null }
  }
}

export default personServiceService
