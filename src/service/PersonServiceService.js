import Vue from 'vue'
import AppProps from '../property'

const personServiceService = {
  create: function (pService, callback, errHandler) {
    Vue.http.post(AppProps.apiUrl + '/person_service/', pService)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  update: function (pService, callback, errHandler) {
    Vue.http.put(AppProps.apiUrl + '/person_service/', pService)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
  },
  save: function (pService, callback, errHandler) {
    if (('id' in pService) && (pService.id !== null)) {
      this.update(pService, callback, errHandler)
      return
    }
    this.create(pService, callback, errHandler)
  },
  findAllByPersonId: function (personId, callback, errHandler) {
    Vue.http.get(AppProps.apiUrl + '/person_service/person/' + personId)
      .then(
        response => {
          callback(((response.body) ? response.body : null))
        },
        response => {
          errHandler(response.error)
        })
  },
  findByPersonIdAndAppId (personId, appId, callback, errHandler) {
    Vue.http.get(AppProps.apiUrl + '/person_service/person_and_appointment/' + personId + '/' + appId)
      .then(
        response => {
          callback(((response.body) ? response.body : null))
        },
        response => {
          errHandler(response.error)
        })
  },
  remove: function (serviceId, callback, errHandler) {
    Vue.http.delete(AppProps.apiUrl + '/person_service/', serviceId)
      .then(
        response => {
          callback(response.body)
        },
        response => {
          errHandler(response.error)
        }
      )
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
        this.save(service)
      }
      if ((service.id !== null) && !service.isChecked) {
        this.remove(service.id, () => {}, errHandler)
      }
    })
    callback()
  }
}

export default personServiceService
