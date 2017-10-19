import client from './../apiClient'

const DiagnosisService = {
  create: function (diagnosis, callback, errHandler) {
    client.post('/diagnosis/', diagnosis, callback, errHandler)
  },
  update: function (diagnosis, callback, errHandler) {
    client.put('/diagnosis/', diagnosis, callback, errHandler)
  },
  save: function (diagnosis, callback, errHandler) {
    if (('id' in diagnosis) && (diagnosis.id !== null)) {
      this.update(diagnosis, callback, errHandler)
      return
    }
    this.create(diagnosis, callback, errHandler)
  },
  findAllByPersonId: function (personId, callback, errHandler) {
    client.get('/diagnosis/person/' + personId, callback, errHandler)
  },
  getEmpty: function (personId) {
    return { id: null, personId: personId, description: null }
  }
}

export default DiagnosisService
