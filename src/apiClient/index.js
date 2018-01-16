import Vue from 'vue'
import AppProps from '../property'

const apiClient = {
  getRaw: function (uri, callback, errHandler) {
    Vue.http.get(AppProps.getApiUrl() + uri)
      .then(
        response => {
          console.log('Response', response)
          callback(response)
        },
        response => {
          errHandler(response.error)
        })
  },
  get: function (uri, callback, errHandler) {
    Vue.http.get(AppProps.getApiUrl() + uri)
      .then(
        response => {
          callback(((response.body) ? response.body : null))
        },
        response => {
          errHandler(response.error)
        })
  },
  post: function (uri, body, callback, errHandler) {
    Vue.http.post(AppProps.getApiUrl() + uri, body)
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
    Vue.http.put(AppProps.getApiUrl() + uri, body)
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
    Vue.http.delete(AppProps.getApiUrl() + uri, { body: body })
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
