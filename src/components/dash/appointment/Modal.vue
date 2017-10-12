<template>
  <modal name="appointment-modal" draggable=".modal-header" height="auto" @before-open="beforeOpen" :pivotY="0.1" ref="modal">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" @click="close"> <span>×</span></button>
          <h4 id="myModalLabel" class="modal-title">{{title}}</h4>
        </div>
        <client-form v-if="(state === appState.NEW)" ref="client"
                     @complete="clientReceived"
                     @save="saveClient"
                     @findByMsisdn="findClientByMsisdn"
                     :client="client">

        </client-form>
        <new-form v-if="(state === appState.APP)" ref="new"
                  :client="client"
                  :app="appointment"
                  :doctors="doctors"
                  :offices="offices"
                  :services="services"
                  @save="saveApp">

        </new-form>
        <view-form v-if="(state === appState.VIEW)" ref="view"
                   :client="client"
                   :appointment="appointment"
                   :doctor="doctor"
                   :service="service"
                   :office="office"
                   :clientDirection="clientDirection"
                   :personServices="personServices">
        </view-form>
      </div>

  </modal>
</template>

<script>
  import appState from './AppointmentState'
  import ClientForm from './../../client/ClientForm.vue'
  import New from './AppForm'
  import View from './View.vue'
  import { bus } from './../../event/bus'
  import appService from './../../../service/AppointmentService'
  import clientService from './../../../service/ClientService'
  import officeService from '../../../service/OfficeService'
  import doctorService from '../../../service/DoctorService'
  import serviceService from '../../../service/ServiceService'
  import clientDirectionService from '../../../service/ClientDirectionService'

  export default {
    data () {
      return {
        title: null,
        state: null,
        params: null,
        client: null,
        doctor: null,
        office: null,
        service: null,
        doctors: null,
        offices: null,
        services: null,
        appointment: null,
        personServices: null,
        clientDirection: null,
        appState: appState
      }
    },
    methods: {
      beforeOpen (event) {
        console.log(event.params)
        this.title = event.params.title
        this.state = event.params.state
        this.params = event.params
        this.doctors = doctorService.getAll()
        this.offices = officeService.getAll()
        this.services = serviceService.getAll()
        this.client = clientService.getEmpty()
        this.appointment = appService.getEmpty()
        this.doctor = doctorService.getEmpty()
        if (this.state === appState.VIEW) {
          appService.findById(this.params.appointmentId, this.receiveFullApp)
        }
      },
      receiveFullApp: function (fullApp) {
        this.client = fullApp.client
        this.service = fullApp.service
        this.appointment = fullApp.appointment
        this.personServices = fullApp.personServices
        this.doctor = doctorService.getDoctorById(this.appointment.userId)
        this.service = serviceService.getServiceById(this.appointment.serviceId)
        this.office = officeService.getOfficeById(this.appointment.officeId)
        this.clientDirection = clientDirectionService.findById(this.client.clientDirectionId)
      },
      close () {
        bus.$emit('appointment-schedule-refresh')
        this.$modal.hide('appointment-modal')
      },
      clientReceived: function (client) {
        this.state = this.appState.APP
        this.appointment.clientId = client.id
        this.appointment.userId = ('doctorId' in this.params) ? this.params.doctorId : null
        this.appointment.officeId = ('officeId' in this.params) ? this.params.officeId : null
        this.appointment.dateTime = ('dateTime' in this.params) ? this.params.dateTime : null
      },
      setClient: function (client) {
        if (client === null) {
          return
        }
        this.client = client
      },
      findClientByMsisdn: function () {
        clientService.findByMsisdn(this.client.msisdn, this.setClient)
      },
      saveClient: function () {
        clientService.save(this.client, this.setClient)
      },
      saveApp: function () {
        appService.save(this.appointment, this.close, this.errorResponse)
      },
      errorResponse: function (err) {
        console.log(err)
      }
    },
    components: {
      'new-form': New,
      'view-form': View,
      'client-form': ClientForm
    },
    mounted () {
      bus.$on('appointment-modal-close', this.close)
    }
  }
</script>
