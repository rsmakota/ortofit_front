import client from './../apiClient'

const personServiceService = {
  create: function (pService, callback, errHandler) {
    client.post('/person_service/', pService, callback, errHandler)
  },
  update: function (pService, callback, errHandler) {
    client.put('/person_service/', pService, callback, errHandler)
  },
  save: function (pService, callback, errHandler) {
    if (('id' in pService) && (pService.id !== null)) {
      this.update(pService, callback, errHandler)
      return
    }
    this.create(pService, callback, errHandler)
  },
  findAllByPersonId: function (personId, callback, errHandler) {
    client.get('/person_service/person/' + personId, callback, errHandler)
  },
  findByPersonIdAndAppId (personId, appId, callback, errHandler) {
    client.get('/person_service/person_and_appointment/' + personId + '/' + appId, callback, errHandler)
  },
  remove: function (service, callback, errHandler) {
    client.delete('/person_service/', service, callback, errHandler)
  },
  getEmpty: function (clientId, personId, appointmentId) {
    return { id: null, clientId: clientId, personId: personId, appointmentId: appointmentId, serviceId: null, date: null, number: null }
  },
  getAllEmptyServices (services, appointment, client, person) {
    let personServices = []
    services.forEach((service, i, services) => {
      let pService = {
        id: null,
        clientId: client.id,
        personId: person.id,
        appointmentId: appointment.id,
        serviceId: service.id,
        number: 1,
        isChecked: false,
        service: service
      }
      personServices.push(pService)
    })
    return personServices
  },
  saveGroup: function (group, callback, errHandler) {
    group.forEach((service, i, group) => {
      if (service.isChecked) {
        this.save(service, () => {}, errHandler)
      }
      if ((service.id !== null) && !service.isChecked) {
        this.remove(service, () => {}, errHandler)
      }
    })
    callback()
  }
}

export default personServiceService
