import client from './../apiClient'

const insoleService = {
  create: function (insole, callback, errHandler) {
    client.post('/insole/', insole, callback, errHandler)
  },
  update: function (insole, callback, errHandler) {
    client.put('/insole/', insole, callback, errHandler)
  },
  save: function (insole, callback, errHandler) {
    if (('id' in insole) && (insole.id !== null)) {
      this.update(insole, callback, errHandler)
      return
    }
    this.create(insole, callback, errHandler)
  },
  findByAppIdAndPersonId (appId, personId, callback, errHandler) {
    client.get('/appointment/' + appId + '/person/' + personId, callback, errHandler)
  },
  getPreparedInsoles: function (appointmentId, personId, num) {
    let insoles = []
    for (let i = 0; i < num; i++) {
      insoles.push({id: null, personId: personId, appointmentId: appointmentId, typeId: null, size: null})
    }
    return insoles
  },
  saveGroup: function (group, callback, errHandler) {
    client.post('/insole/group', group, callback, errHandler)
  }
}

export default insoleService
