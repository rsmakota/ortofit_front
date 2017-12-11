export default {
  apiUrl: 'http://localhost:8090/api',
  scheduleApiUrl: 'http://localhost:8090/api/schedule/',
  staffScheduleApiUrl: 'http://localhost:8090/api/staff_schedule/',
  auth: {
    url: 'http://localhost:8090/oauth/token',
    requestProps: {
      contentType: 'application/x-www-form-urlencoded',
      responseType: 'json',
      headers: {'Authorization': 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0', 'Content-Type': 'application/x-www-form-urlencoded;', 'Access-Control-Allow-Origin': '*', 'X-Requested-With': 'XMLHttpRequest'},
      'emulateJSON': true
    }
  }
}
