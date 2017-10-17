import Vue from 'vue'
import AppProps from '../property'

const DiagnosisService = {
  create: function (diagnosis, callback, errHandler) {
    Vue.http.post(AppProps.apiUrl + '/diagnosis/', diagnosis)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  update: function (diagnosis, callback, errHandler) {
    Vue.http.put(AppProps.apiUrl + '/diagnosis/', diagnosis)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  save: function (diagnosis, callback, errHandler) {
    if ('id' in diagnosis) {
      this.update(diagnosis, callback, errHandler)
      return
    }
    this.create(diagnosis, callback, errHandler)
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
