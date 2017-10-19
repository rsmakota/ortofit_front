import Vue from 'vue'
import AppProps from '../property'

const apiClient = {
  get: function (uri, callback, errHandler) {
    Vue.http.get(AppProps.apiUrl + uri)
      .then(
        response => {
          callback(((response.body) ? response.body : null))
        },
        response => {
          errHandler(response.error)
        })
  },
  post: function (uri, body, callback, errHandler) {
    Vue.http.post(AppProps.apiUrl + uri, body)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  put: function (uri, body, callback, errHandler) {
    Vue.http.put(AppProps.apiUrl + uri, body)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  delete: function (uri, body, callback, errHandler) {
    Vue.http.delete(AppProps.apiUrl + uri, { body: body })
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  }
}

export default apiClient
