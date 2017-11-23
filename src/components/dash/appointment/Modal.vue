<template>
  <modal name="appointment-modal" draggable=".modal-header" height="auto"
         @before-open="beforeOpenEventHandler"
         @before-close="beforeClose"
         :pivotY="0.1" ref="modal">
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
                     :mod="clientFormMod">

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
                        :remind="remind"
                        @save="chooseServicesSave"
        >
        </choose-service>
        <insole v-if="(state === appState.FLOW.INSOLE)"
                :appointment="appointment"
                :office="office"
                :person="person"
                :insoleTypes="insoleTypes"
                :preparedInsoles="preparedInsoles"
                @save="insoleSave"
        ></insole>
        <rewind v-if="(state === appState.FLOW.REWIND)"
                @rewind="rewindRewind"
                @finish="rewindFinish"
        ></rewind>
        <error v-if="(state === appState.FLOW.ERROR)"></error>
      </div>

  </modal>
</template>

<script>
  import moment from 'moment'
  import { mapGetters } from 'vuex'
  import APP_CONST from './AppointmentConst'
  import CLIENT_CONST from './../../client/ClientConst'
  import ClientForm from './../../client/ClientForm'
  import New from './AppForm'
  import View from './View'
  import CloseReason from './CloseReason'
  import ChoosePerson from './ChoosePerson'
  import PersonForm from './../../person/PersonForm'
  import ChooseService from './ChooseService'
  import Diagnosis from './Diagnosis'
  import Insole from './Insole'
  import Rewind from './Rewind'
  import Error from './Error'
  import { bus } from './../../event/bus'
  import appService from './../../../service/AppointmentService'
  import clientService from './../../../service/ClientService'
  import officeService from './../../../service/OfficeService'
  import doctorService from './../../../service/DoctorService'
  import appReasonService from './../../../service/AppointmentReasonService'
  import clientDirectionService from './../../../service/ClientDirectionService'
  import personService from './../../../service/PersonService'
  import familyStatusService from './../../../service/FamilyStatusService'
  import diagnosisService from './../../../service/DiagnosisService'
  import personServiceService from './../../../service/PersonServiceService'
  import remindService from './../../../service/RemindService'
  import insoleService from './../../../service/InsoleService'

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
        remind: null,
        insoles: null,
        massages: null,
        preparedInsoles: null,
        preparedMassages: null,
        mod: APP_CONST.MOD.EDIT,
        clientFormMod: CLIENT_CONST.FORM.MOD.SHORT,
        appState: APP_CONST
      }
    },
    methods: {
      beforeOpenEventHandler (event) {
        this.mod = APP_CONST.MOD.EDIT
        this.title = event.params.title
        this.state = event.params.state
        this.params = event.params
        this.client = clientService.getEmpty()
        this.appointment = appService.getEmpty()
        this.doctor = doctorService.getEmpty()
        this.clean()
        if (this.state === APP_CONST.FLOW.VIEW) {
          appService.findById(this.params.appointmentId, this.receiveFullApp)
          appReasonService.findAllByAppId(this.params.appointmentId, reasons => { this.appReasons = reasons }, this.errorResponse)
        }
      },
      beforeClose () {
        bus.$emit('appointment-schedule-refresh')
      },
      clean () {
        this.office = null
        this.service = null
        this.personServices = null
        this.preparedPersonServices = null
        this.persons = null
        this.person = null
        this.appReasons = null
        this.diagnoses = null
        this.remind = null
        this.insoles = null
        this.massages = null
        this.preparedInsoles = null
        this.preparedMassages = null
        this.clientFormMod = CLIENT_CONST.FORM.MOD.SHORT
      },
      receiveFullApp: function (fullApp) {
        this.client = fullApp.client
        this.service = fullApp.service
        this.appointment = fullApp.appointment
        this.personServices = fullApp.personServices
        this.doctor = doctorService.getDoctorById(this.appointment.userId)
        this.office = officeService.getOfficeById(this.appointment.officeId)
        this.clientDirection = clientDirectionService.findById(this.client.clientDirectionId)
      },
      loadPersonServices: function () {
        personServiceService.findByPersonIdAndAppId(this.person.id, this.appointment.id, (personServices) => { this.personServices = personServices }, this.errorResponse)
      },
      errorResponse: function (err) {
        this.state = APP_CONST.FLOW.ERROR
        console.log('ERROR: ', err)
      },
      closeEventHandler () {
        this.$modal.hide('appointment-modal')
      },
      clientFormComplete: function (client) {
        this.state = (this.mod === APP_CONST.MOD.EDIT) ? APP_CONST.FLOW.APP : APP_CONST.FLOW.CHOOSE_PERSON
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
        this.state = APP_CONST.FLOW.CLOSE
      },
      viewEditApp: function () {
        this.state = APP_CONST.FLOW.APP
      },
      viewIssueApp: function () {
        this.mod = APP_CONST.MOD.ISSUE
        this.clientFormMod = CLIENT_CONST.FORM.MOD.ABSOLUTELY
        personService.findAllByClientId(this.client.id, persons => {
          this.persons = persons
          this.state = (this.client.clientDirectionId === null) ? APP_CONST.FLOW.NEW : APP_CONST.FLOW.CHOOSE_PERSON
        })
      },
      viewOpenApp: function () {
        this.appointment.state = APP_CONST.APP.NEW
        appService.update(this.appointment, () => { this.closeEventHandler() }, this.errorResponse)
      },
      viewCloseAppByReason: function (reason) {
        this.appointment.state = APP_CONST.APP.CLOSE
        appReasonService.create(reason, () => {
          appService.update(this.appointment, this.closeEventHandler, this.errorResponse)
        }, this.errorResponse)
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
        this.state = APP_CONST.FLOW.NEW_PERSON
      },
      chPersonChoose: function (person) {
        this.person = person
        diagnosisService.findAllByPersonId(person.id, (diagnoses) => {
          this.diagnoses = diagnoses
          this.state = APP_CONST.FLOW.DIAGNOSIS
        }, this.errorResponse)
      },
      /*********************************************************************************************
       *                        component PERSON action handlers                                   *
       ********************************************************************************************/
      personFormSave: function () {
        personService.save(this.person, (person) => {
          this.person = person
          this.state = APP_CONST.FLOW.DIAGNOSIS
        }, this.errorResponse)
      },
      /*********************************************************************************************
       *                        component DIAGNOSIS action handlers                                *
       ********************************************************************************************/
      diagnosisSave: function (diagnosis) {
        this.preparedPersonServices = personServiceService.getAllEmptyServices(this.services, this.appointment, this.client, this.person)
        if (diagnosis !== null) {
          diagnosisService.create(diagnosis, () => {
            this.state = APP_CONST.FLOW.CHOOSE_SERVICE
          }, this.errorResponse)
        } else {
          this.state = APP_CONST.FLOW.CHOOSE_SERVICE
        }
        this.loadPersonServices()
        remindService.findByPersonIdAndAppId(this.person.id, this.appointment.id, (reminds) => {
          this.remind = (reminds.length > 0) ? reminds[0] : remindService.getEmpty()
        }, this.errorResponse)
      },
      /*********************************************************************************************
       *                        component CHOOSE_SERVICE action handlers                           *
       ********************************************************************************************/
      chooseServicesSave: function () {
        personServiceService.saveGroup(this.preparedPersonServices, this.loadPersonServices, this.errorResponse)
        if (moment.isMoment(this.remind.dateTime)) {
          remindService.save(this.remind, () => {}, this.errorResponse)
        }
        appService.update(this.appointment, () => {}, this.errorResponse)
        let insolePersonService = this.preparedPersonServices.find(pService => pService.service.alias === 'insoles_manufacturing')
        if (insolePersonService.isChecked) {
          this.preparedInsoles = insoleService.getPreparedInsoles(this.appointment.id, this.person.id, insolePersonService.number)
          this.state = APP_CONST.FLOW.INSOLE
          return
        }
//        let massage = this.preparedPersonServices.find(pService => pService.service.alias === 'massage')
//        if (massage.isChecked) {
//          this.state = APP_CONST.FLOW.MASSAGE
//          return
//        }
        this.state = APP_CONST.FLOW.REWIND
      },
      /*********************************************************************************************
       *                              component INSOLE action handlers                             *
       ********************************************************************************************/
      insoleSave: function () {
        insoleService.saveGroup(this.preparedInsoles, () => {
          this.state = APP_CONST.FLOW.REWIND
        }, this.errorResponse)
      },
      /*********************************************************************************************
       *                               component REWIND action handlers                            *
       ********************************************************************************************/
      rewindRewind: function () {
        this.preparedPersonServices = null
        this.person = null
        this.diagnoses = null
        this.remind = null
        this.insoles = null
        this.massages = null
        this.preparedInsoles = null
        this.preparedMassages = null
        this.state = APP_CONST.FLOW.CHOOSE_PERSON
      },
      rewindFinish: function () {
        this.appointment.state = APP_CONST.APP.SUCCESS
        appService.save(this.appointment, () => {
          this.closeEventHandler()
        }, this.errorResponse)
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
      'choose-service': ChooseService,
      'insole': Insole,
      'rewind': Rewind,
      'error': Error
    },
    computed: {
      ...mapGetters({
        doctors: 'doctor/getAll',
        offices: 'office/getAll',
        services: 'service/getAll',
        reasons: 'reason/getAll',
        familyStatuses: 'familyStatus/getAll',
        insoleTypes: 'insoleType/getAll'
      })
    }
  }
</script>
