import client from './../apiClient'

const personService = {
  create: function (person, callback, errHandler) {
    client.post('/person/', person, callback, errHandler)
  },
  update: function (person, callback, errHandler) {
    client.put('/person/', person, callback, errHandler)
  },
  save: function (person, callback, errHandler) {
    if (('id' in person) && (person.id !== null)) {
      this.update(person, callback, errHandler)
      return
    }
    this.create(person, callback, errHandler)
  },
  findAllByClientId: function (clientId, callback, errHandler) {
    client.get('/person/client_id/' + clientId, callback, errHandler)
  },
  getEmpty: function (clientId, isClient) {
    return {id: null, clientId: clientId, name: null, gender: null, familyStatus: null, born: null, isClient: isClient}
  }
}

export default personService
