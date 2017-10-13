import Vue from 'vue'
import AppProps from '../property'

const appReasonService = {
  create: function (appReason, callback, errHandler) {
    Vue.http.post(AppProps.apiUrl + '/appointment_reason/', appReason)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  findAllByAppId: function (appId, callback, errHandler) {
    Vue.http.get(AppProps.apiUrl + '/appointment_reason/appointment/' + appId)
      .then(
        response => {
          callback(((response.body) ? response.body : null))
        })
  }
}

export default appReasonService
