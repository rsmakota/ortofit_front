// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import calendar from 'vue-full-calendar'
import VueStrap from 'vue-strap'
import AppProps from './property'
import VModal from 'vue-js-modal'

window.jQuery = window.$ = require('jquery')
// console.log(this.$refs)
Vue.router = router
Vue.use(VueResource)
Vue.use(VueStrap)
Vue.use(VModal)
// Vue.use(AppProps)
Vue.use(calendar)
Vue.http.options.root = AppProps.getApiUrl()
Vue.http.interceptors.push(function (request, next) {
  if (!request.url.includes('oauth/token') && store.state.auth.authenticated) {
    request.headers.set('Authorization', `Bearer ${store.state.auth.token}`)
  }
  // continue to next interceptor
  next(function (response) {
    if (response.status === 401) {
      router.push('/login')
    }
    return response
  })
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
