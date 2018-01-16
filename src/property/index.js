
const params = {
  devUrl: 'https://backend.ortofit.com.ua', // 'http://localhost:8090'
  prodUrl: 'https://backend.ortofit.com.ua',
  auth: {
    requestProps: {
      contentType: 'application/x-www-form-urlencoded',
      responseType: 'json',
      headers: {'Authorization': 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0', 'Content-Type': 'application/x-www-form-urlencoded;', 'Access-Control-Allow-Origin': '*', 'X-Requested-With': 'XMLHttpRequest'},
      'emulateJSON': true
    }
  },
  getBaseUrl: function () {
    return (process.env.NODE_ENV === 'production') ? this.prodUrl : this.devUrl
  },
  getApiUrl: function () {
    return this.getBaseUrl() + '/api'
  },
  getScheduleApiUrl: function () {
    return this.getBaseUrl() + '/api/schedule/'
  },
  getStaffScheduleApiUrl: function () {
    return this.getBaseUrl() + '/api/staff_schedule/'
  },
  getOauthTokenUrl: function () {
    return this.getBaseUrl() + '/oauth/token'
  }
}

export default params
