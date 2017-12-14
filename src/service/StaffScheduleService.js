import client from './../apiClient'

const StaffScheduleService = {
  create: function (schedule, callback, errHandler) {
    client.post('/staff_schedule/', schedule, callback, errHandler)
  },
  update: function (schedule, callback, errHandler) {
    client.put('/staff_schedule/', schedule, callback, errHandler)
  },
  save: function (schedule, callback, errHandler) {
    if (('id' in schedule) && (schedule.id !== null)) {
      this.update(schedule, callback, errHandler)
      return
    }
    this.create(schedule, callback, errHandler)
  },
  delete: function (scheduleId, callback, errHandler) {
    client.delete('/staff_schedule/', scheduleId, callback, errHandler)
  },
  find: function (scheduleId, callback, errHandler) {
    client.get('/staff_schedule/' + scheduleId, callback, errHandler)
  },
  getEmpty: function () {
    return { id: null, userId: null, officeId: null, startDate: null, endDate: null }
  }
}

export default StaffScheduleService
