import Vue from 'vue'
import AppProps from '../property'

const DiagnosisService = {
  create: function (person, callback, errHandler) {
    Vue.http.post(AppProps.apiUrl + '/diagnosis/', person)
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
    Vue.http.put(AppProps.apiUrl + '/diagnosis/', person)
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
    Vue.http.get(AppProps.apiUrl + '/diagnosis/person/' + personId)
      .then(
        response => {
          callback(((response.body) ? response.body : null))
        },
        response => {
          errHandler(response.error)
        })
  },
  getEmpty: function (personId) {
    return { id: null, personId: personId, description: null }
  }
}

export default DiagnosisService
