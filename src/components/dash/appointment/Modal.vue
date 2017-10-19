<template>
  <modal name="appointment-modal" draggable=".modal-header" height="auto" @before-open="beforeOpenEventHandler" :pivotY="0.1" ref="modal">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" @click="closeEventHandler"> <span>×</span></button>
          <h4 id="myModalLabel" class="modal-title">{{title}}</h4>
        </div>
        <client-form v-if="(state === appState.FLOW.NEW)" ref="client"
                     @complete="clientFormComplete"
                     @save="clientFormSave"
                     @findByMsisdn="clientFormFindByMsisdn"
                     :client="client"
                     :mod="mod">

        </client-form>
        <new-form v-if="(state === appState.FLOW.APP)" ref="new"
                  :client="client"
                  :app="appointment"
                  :doctors="doctors"
                  :offices="offices"
                  :services="services"
                  @save="appFormSave">

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
                   :services="services"
                   @closeApp="viewCloseApp"
                   @editApp="viewEditApp"
                   @issueApp="viewIssueApp"
                   @callApp="viewCallApp"
                   @openApp="viewOpenApp">
        </view-form>
        <reason-form v-if="(state === appState.FLOW.CLOSE)"
                     :reasons="reasons"
                     :appointment="appointment"
                     @submit="viewCloseAppByReason">
        </reason-form>
        <choose-person v-if="(state === appState.FLOW.CHOOSE_PERSON)"
                       :appointment="appointment"
                       :office="office"
                       :client="client"
                       :persons="persons"
                       @new="chPersonNewPerson"
                       @choose="chPersonChoose">

        </choose-person>
        <person-form v-if="(state === appState.FLOW.NEW_PERSON)"
                     :familyStatuses="familyStatuses"
                     :person="person"
                     :client="client"
                     @save="personFormSave">
        </person-form>
        <diagnosis v-if="(state === appState.FLOW.DIAGNOSIS)"
          :appointment="appointment"
          :office="office"
          :client="client"
          :diagnoses="diagnoses"
          :person="person"
          @save="diagnosisSave"></diagnosis>
        <choose-service v-if="(state === appState.FLOW.CHOOSE_SERVICE)"
                        :appointment="appointment"
                        :office="office"
                        :personServices="personServices"
                        :person="person"
                        :preparedPersonServices="preparedPersonServices"
                        @save="chooseServicesSave"
        >
        </choose-service>
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
  import PersonForm from './../../person/PersonForm'
  import ChooseService from './ChooseService'
  import Diagnosis from './Diagnosis'
  import { bus } from './../../event/bus'
  import appService from './../../../service/AppointmentService'
  import clientService from './../../../service/ClientService'
  import officeService from './../../../service/OfficeService'
  import doctorService from './../../../service/DoctorService'
//  import serviceService from './../../../service/ServiceService'
  import appReasonService from './../../../service/AppointmentReasonService'
  import clientDirectionService from './../../../service/ClientDirectionService'
  import personService from './../../../service/PersonService'
  import familyStatusService from './../../../service/FamilyStatusService'
  import diagnosisService from './../../../service/DiagnosisService'
  import personServiceService from './../../../service/PersonServiceService'

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
        preparedPersonServices: null,
        clientDirection: null,
        persons: null,
        person: null,
        appReasons: null,
        diagnoses: null,
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
//        this.service = serviceService.getServiceById(this.appointment.serviceId)
        this.office = officeService.getOfficeById(this.appointment.officeId)
        this.clientDirection = clientDirectionService.findById(this.client.clientDirectionId)
      },
      closeEventHandler () {
        bus.$emit('appointment-schedule-refresh')
        this.$modal.hide('appointment-modal')
      },
      clientFormComplete: function (client) {
        this.state = (this.mod === appState.MOD.EDIT) ? appState.FLOW.APP : appState.FLOW.CHOOSE_PERSON
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
      clientFormFindByMsisdn: function () {
        clientService.findByMsisdn(this.client.msisdn, this.setClient)
      },
      clientFormSave: function () {
        clientService.save(this.client, this.setClient, this.errorResponse)
      },
      appFormSave: function () {
        appService.save(this.appointment, this.closeEventHandler, this.errorResponse)
      },
      /*********************************************************************************************
       *                               component VIEW action handlers                              *
       ********************************************************************************************/
      viewCallApp: function () {
        this.appointment.phoneConfirm = !this.appointment.phoneConfirm
        appService.update(this.appointment, this.closeEventHandler, this.errorResponse)
      },
      viewCloseApp: function () {
        this.state = appState.FLOW.CLOSE
      },
      viewEditApp: function () {
        this.state = appState.FLOW.APP
      },
      viewIssueApp: function () {
        this.mod = appState.MOD.ISSUE
        personService.findAllByClientId(this.client.id, persons => { this.persons = persons })
        this.state = (this.client.direction === null) ? appState.FLOW.NEW : appState.FLOW.CHOOSE_PERSON
      },
      viewOpenApp: function () {
        this.appointment.state = appState.APP.NEW
        appService.update(this.appointment, this.closeEventHandler, this.errorResponse)
      },
      viewCloseAppByReason: function (reason) {
        this.appointment.state = appState.APP.CLOSE
        appReasonService.create(reason, () => {}, this.errorResponse)
        appService.update(this.appointment, this.closeEventHandler, this.errorResponse)
      },
      /*********************************************************************************************
       *                        component CLOSE_REASON action handlers                             *
       ********************************************************************************************/
      chPersonNewPerson: function (isClient) {
        this.person = personService.getEmpty(this.client.id, isClient)
        if (isClient) {
          this.person.name = this.client.name
          this.person.gender = this.client.gender
          this.person.familyStatus = familyStatusService.getFamilyStatusClient()
        }
        this.state = appState.FLOW.NEW_PERSON
      },
      chPersonChoose: function (person) {
        this.person = person
        diagnosisService.findAllByPersonId(person.id, (diagnoses) => { this.diagnoses = diagnoses }, this.errorResponse)
        this.state = appState.FLOW.DIAGNOSIS
      },
      personFormSave: function () {
        personService.save(this.person, (person) => {
          this.state = appState.FLOW.DIAGNOSIS
          this.person = person
        }, this.errorResponse)
      },
      diagnosisSave: function (diagnosis) {
        if (diagnosis !== null) {
          diagnosisService.create(diagnosis, () => {}, this.errorResponse)
        }
        this.loadPersonServices()
        this.preparedPersonServices = personServiceService.getAllEmptyServices(this.services, this.appointment, this.client, this.person)
        this.state = appState.FLOW.CHOOSE_SERVICE
        console.log(this.preparedPersonServices)
      },
      chooseServicesSave: function () {
        personServiceService.saveGroup(this.preparedPersonServices, this.loadPersonServices, this.errorResponse)
      },
      loadPersonServices: function () {
        personServiceService.findByPersonIdAndAppId(this.person.id, this.appointment.id, (personServices) => { this.personServices = personServices }, this.errorResponse)
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
      'choose-person': ChoosePerson,
      'person-form': PersonForm,
      'diagnosis': Diagnosis,
      'choose-service': ChooseService
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
