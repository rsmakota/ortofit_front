<template>
  <modal name="appointment-modal" draggable=".modal-header" height="auto" @before-open="beforeOpenEventHandler" :pivotY="0.1" ref="modal">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" @click="closeEventHandler"> <span>×</span></button>
          <h4 id="myModalLabel" class="modal-title">{{title}}</h4>
        </div>
        <client-form v-if="(state === appState.FLOW.NEW)" ref="client"
                     @complete="clientCompleteEventHandler"
                     @save="saveClientEventHandler"
                     @findByMsisdn="findClientByMsisdnEventHandler"
                     :client="client"
                     :mod="mod">

        </client-form>
        <new-form v-if="(state === appState.FLOW.APP)" ref="new"
                  :client="client"
                  :app="appointment"
                  :doctors="doctors"
                  :offices="offices"
                  :services="services"
                  @save="saveAppEventHandler">

        </new-form>
        <view-form v-if="(state === appState.FLOW.VIEW)" ref="view"
                   :client="client"
                   :appointment="appointment"
                   :doctor="doctor"
                   :service="service"
                   :office="office"
                   :clientDirection="clientDirection"
                   :personServices="personServices"
                   :appReasons="appReasons"
                   @closeApp="closeAppEventHandler"
                   @editApp="editAppEventHandler"
                   @issueApp="issueAppEventHandler"
                   @openApp="openAppEventHandler">
        </view-form>
        <reason-form v-if="(state === appState.FLOW.CLOSE)"
                     :reasons="reasons"
                     :appointment="appointment"
                     @submit="closeAppByReasonEventHandler">
        </reason-form>
        <choose-person v-if="(state === appState.FLOW.CHOOSE_PERSON)"
                       :appointment="appointment"
                       :office="office"
                       :client="client"
                       :persons="persons"
                       @newPerson="newPersonEventHandler"
                       @choosed="choosedPersonEventHandler">

        </choose-person>
      </div>

  </modal>
</template>

<script>
  import { mapGetters } from 'vuex'
  import appState from './AppointmentState'
  import ClientForm from './../../client/ClientForm'
  import New from './AppForm'
  import View from './View'
  import CloseReason from './CloseReason'
  import ChoosePerson from './ChoosePerson'
  import { bus } from './../../event/bus'
  import appService from './../../../service/AppointmentService'
  //  import reasonService from './../../../service/ReasonService'
  import clientService from './../../../service/ClientService'
  import officeService from './../../../service/OfficeService'
  import doctorService from './../../../service/DoctorService'
  import serviceService from './../../../service/ServiceService'
  import appReasonService from './../../../service/AppointmentReasonService'
  import clientDirectionService from './../../../service/ClientDirectionService'
  import personService from './../../../service/PersonService'
//  import familyStatus from './../../../service/FamilyStatusService'

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
        appointment: null,
        personServices: null,
        clientDirection: null,
        persons: null,
        appReasons: null,
        mod: appState.MOD.EDIT,
        appState: appState
      }
    },
    methods: {
      beforeOpenEventHandler (event) {
        this.mod = appState.MOD.EDIT
        this.title = event.params.title
        this.state = event.params.state
        this.params = event.params
        this.client = clientService.getEmpty()
        this.appointment = appService.getEmpty()
        this.doctor = doctorService.getEmpty()
        if (this.state === appState.FLOW.VIEW) {
          appService.findById(this.params.appointmentId, this.receiveFullApp)
          appReasonService.findAllByAppId(this.params.appointmentId, reasons => { this.appReasons = reasons }, this.errorResponse)
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
      closeEventHandler () {
        bus.$emit('appointment-schedule-refresh')
        this.$modal.hide('appointment-modal')
      },
      clientCompleteEventHandler: function (client) {
        this.state = (this.mod === appState.MOD.EDIT) ? appState.FLOW.APP : appState.FLOW.CHOOSE_PERSON
        if (this.state === appState.FLOW.CHOOSE_PERSON) {
          personService.findAllByClientId(this.client.id, persons => { this.persons = persons })
          return
        }
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
      findClientByMsisdnEventHandler: function () {
        clientService.findByMsisdn(this.client.msisdn, this.setClient)
      },
      saveClientEventHandler: function () {
        clientService.save(this.client, this.setClient)
      },
      saveAppEventHandler: function () {
        appService.save(this.appointment, this.closeEventHandler, this.errorResponse)
      },
      /** VUEW Action handler **/
      closeAppEventHandler: function () {
        this.state = appState.FLOW.CLOSE
      },
      editAppEventHandler: function () {
        this.state = appState.FLOW.APP
      },
      issueAppEventHandler: function () {
        this.mod = appState.MOD.ISSUE
        this.state = (this.client.direction === null) ? appState.FLOW.NEW : appState.FLOW.CHOOSE_PERSON
      },
      openAppEventHandler: function () {
        this.appointment.state = appState.APP.NEW
        appService.update(this.appointment, this.closeEventHandler, this.errorResponse)
      },
      closeAppByReasonEventHandler: function (reason) {
        this.appointment.state = appState.APP.CLOSE
        appReasonService.create(reason, () => {}, this.errorResponse)
        appService.update(this.appointment, this.closeEventHandler, this.errorResponse)
      },
      errorResponse: function (err) {
        console.log(err)
      }
    },
    components: {
      'new-form': New,
      'view-form': View,
      'client-form': ClientForm,
      'reason-form': CloseReason,
      'choose-person': ChoosePerson
    },
    mounted () {
      bus.$on('appointment-modal-close', this.closeEventHandler)
    },
    computed: {
      ...mapGetters({
        doctors: 'doctor/getAll',
        offices: 'office/getAll',
        services: 'service/getAll',
        reasons: 'reason/getAll',
        familyStatuses: 'familyStatus/getAll'
      })
    }
  }
</script>
