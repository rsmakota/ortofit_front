<template>
  <!--<div>User  $route.params.id </div>-->
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        Клиент
      </h1>
      <ol class="breadcrumb">
        <li><router-link to="/client_list" ><i class="fa fa-users"></i>Список клиентов</router-link>
        </li>
        <li class="active">Клиент</li>
      </ol>
    </section>

    <section class="content">

      <div class="row">
        <div class="col-md-3">
          <div class="box box-primary">
            <div class="box-body box-profile">
              <img class="profile-user-img img-responsive img-circle" alt="User profile picture" :src="clientAvatar">
              <h3 class="profile-username text-center">{{ client.name }}</h3>
              <p class="text-muted text-center">{{ client.msisdn }}</p>
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <b>Клиент с:</b>
                  <span class="pull-right"> {{ dateFormat(client.created) }} </span>
                </li>
                <li class="list-group-item">
                  <b>Членов семьи:</b>
                  <span class="pull-right"> {{ persons.length }} </span>
                </li>
                <li class="list-group-item">
                  <b>Последний визит:</b>
                  <span class="pull-right"> {{ lastAppDateTime }} </span>
                </li>

              </ul>
              <div class="text-center">
                <button class="btn btn-primary" type="button" @click="showPersonModal(client)"><i class="fa fa-user-plus"></i> <span>Член семьи</span></button>
                <button class="btn btn-primary" type="button" @click="showModal(client)"><i class="fa fa-pencil"></i> <span>Редактировать</span></button>

              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="nav-tabs-custom">
            <ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
              <li v-for="person in persons" v-bind:class="{'active': (activePersonId == person.id)}"><a href="javascript:void(0);" @click="changePerson(person.id)">{{ person.name }}</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" v-if="activePersonId">
                <div class="post">
                  <div class="user-block">
                    <img class="img-circle img-bordered-sm" alt="user image" :src="personAvatar(activePerson)">
                    <span class="username"> <a href="javascript:void(0);">{{ activePerson.name }} </a></span>
                    <span class="description"> {{ activePerson.familyStatus.name }}  ( {{ getAge(activePerson.born) }}  лет)</span>
                  </div>
                  <button class="btn btn-primary person-diagnosis" type="button" @click="showDiagnosis(null)"><i class="fa fa-plus"></i> <span>Диагноз</span></button>
                  <button class="btn btn-primary person-edit" type="button" @click="showPersonModal(client, activePerson)"><i class="fa fa-pencil"></i> <span>Редактировать</span></button>
                  <h5><strong>Диагноз:</strong></h5>

                  <p v-for="diagnos in activeDiagnoses">
                    <i><strong>  {{ dateFormat(diagnos.created) }}  </strong></i> <a href="javascript:void(0);" @click="showDiagnosis(diagnos)"><i class="fa fa-pencil"></i></a><br>
                       {{ diagnos.description }}
                  </p>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="box box-primary">
            <table class="table table-striped" style="text-align: center">
              <thead>
              <tr >
                <th style="text-align: center">№</th>
                <th style="text-align: center">Дата</th>
                <th style="text-align: center">Время</th>
                <th style="text-align: center">Оффис</th>
                <th style="text-align: center">Врач</th>
                <th style="text-align: center">Заявка</th>
                <th style="text-align: center">Оказана</th>
                <th style="text-align: center">Оформлен</th>
                <th style="text-align: center">Причина</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="app in appReports">
                <td>{{ app.id }}</td>
                <td>{{ dateFormat(app.dateTime) }}</td>
                <td>{{ timeFormat(app.dateTime) }}</td>
                <td>
                  {{ app.officeName }}
                </td>
                <td>
                  {{ app.doctorName }}
                </td>
                <td>
                  {{ app.serviceName }}
                </td>
                <td>
                  <div v-for="personData in app.personData">
                    ({{ personData.person.familyStatus.name }}) <strong>{{ personData.person.name }}</strong>:

                    <span v-for="personService in personData.personServices">
                      {{ getServiceName(personService.serviceId) }}
                    <br>
                    </span>
                  </div>
                </td>
                <td>
                  <i v-if="app.state == 4" class="fa fa-check" aria-hidden="true" style="color: green"></i>
                  <i v-else-if="app.state == 3" class="fa fa-close" aria-hidden="true" style="color: red"></i>
                  <i v-else class="fa fa-circle-thin" aria-hidden="true" style="color: grey"></i>
                </td>
                <td>
                  <div v-for="reason in app.reasons">{{ getReasonName(reason.reasonId) }}</div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    <client-modal @close="loadData"></client-modal>
    <person-modal  @close="loadData"></person-modal>
    <diagnosis-modal @close="reloadDiagnosis"></diagnosis-modal>
  </div>
</template>

<script>
  import clientService from './../../service/ClientService'
  import personService from './../../service/PersonService'
  import appReportService from './../../service/AppointmentReportService'
  import appService from './../../service/AppointmentService'
  import moment from 'moment'
  import reasonService from './../../service/ReasonService'
  import serviceService from './../../service/ServiceService'
  import ClientModal from './../client/Modal.vue'
  import CLIENT_CONST from './../client/ClientConst'
  import PersonModal from './../person/Modal.vue'
  import diagnosisService from './../../service/DiagnosisService'
  import DiagnosisModal from './../diagnosis/Modal'
  import Vue from 'vue'

  export default {
    data () {
      return {
        client: clientService.getEmpty(),
        persons: [],
        avatarPath: '/static/img/avatar/',
        appReports: [],
        lastApp: appService.getEmpty(),
        activePersonId: null,
        activeDiagnoses: [],
        activePerson: personService.getEmpty(),
        diagnoses: []
      }
    },
    computed: {
      clientAvatar: function () {
        if (this.client.gender === 'male') {
          return this.avatarPath + 'avatar5.png'
        }
        if (this.client.gender === 'female') {
          return this.avatarPath + 'avatar3.png'
        }
        return this.avatarPath + 'unknown.png'
      },
      lastAppDateTime: function () {
        return this.dateFormat(this.lastApp.dateTime)
      }
    },
    methods: {
      getPersonDiagnoses (personId) {
        let result = this.diagnoses.find(diagnoses => diagnoses.personId === personId)
        return (result) ? result.diagnoses : []
      },
      getAge (timestamp) {
        return moment.duration(moment().format('x') - timestamp).years()
      },
      changePerson (personId) {
        this.activePersonId = personId
        this.activePerson = this.persons.find(person => person.id === personId)
        this.activeDiagnoses = this.getPersonDiagnoses(personId)
      },
      reloadDiagnosis () {
        diagnosisService.findAllByPersonId(this.activePersonId, diagnoses => {
          let i = this.diagnoses.findIndex(item => item.personId === this.activePersonId)
          let newItem = { personId: this.activePersonId, diagnoses: diagnoses }
          Vue.set(this.diagnoses, i, newItem)
          this.activeDiagnoses = diagnoses
        }, this.errorResponse)
      },
      loadDiagnosis (persons) {
        for (let i = 0; i < persons.length; i++) {
          diagnosisService.findAllByPersonId(persons[i].id, diagnoses => {
            this.diagnoses.push({ personId: persons[i].id, diagnoses: diagnoses })
            if (this.activePersonId === persons[i].id) {
              this.activeDiagnoses = diagnoses
            }
          }, this.errorResponse)
        }
      },
      loadAppReports (clientId) {
        appReportService.findByClientId(clientId, reports => { this.appReports = reports }, this.errorResponse)
      },
      loadPersons (clientId) {
        personService.findAllByClientId(clientId, persons => {
          this.persons = persons
          if (persons.length > 0) {
            this.activePersonId = persons[0].id
            this.activePerson = persons[0]
            this.loadDiagnosis(persons)
          }
        }, this.errorResponse)
      },
      loadClient (clientId) {
        clientService.findById(clientId, client => { this.client = client }, this.errorResponse)
      },
      loadLastApp (clientId) {
        appService.findLastSuccessByClientId(clientId, app => { this.lastApp = app }, this.errorResponse)
      },
      dateFormat (timestamp) {
        if (timestamp) {
          return moment(timestamp).format('DD/MM/YYYY')
        }
        return '-'
      },
      timeFormat (timestamp) {
        return moment(timestamp).format('HH:mm')
      },
      getReasonName (id) {
        return reasonService.getReasonById(id).name
      },
      getServiceName (id) {
        let service = serviceService.getServiceById(id)
        return (typeof service !== 'undefined') ? service.name : ''
      },
      personAvatar (person) {
        if (person.familyStatus.alias === 'self') {
          if (this.client.gender === 'male') {
            return this.avatarPath + 'avatar5.png'
          }
          if (this.client.gender === 'female') {
            return this.avatarPath + 'avatar3.png'
          }
          return this.avatarPath + 'unknown.png'
        }
        return this.avatarPath + 'avatar-' + person.familyStatus.alias + '.png'
      },
      errorResponse (err) {
        console.log(err)
      },
      showModal (client) {
        this.$modal.show('client-modal', {title: (client) ? ' Редактирование клиента' : 'Новый клиент', mod: CLIENT_CONST.FORM.MOD.ABSOLUTELY, time: moment(), client: client})
      },
      showPersonModal (client, person) {
        this.$modal.show('person-modal', {title: (person) ? ' Редактирование члена семьи' : 'Новый член семьи', time: moment(), client: client, person: person})
      },
      showDiagnosis (diagnosis) {
        this.$modal.show('diagnosis-modal', {title: (diagnosis) ? ' Редактирование диагноза(заметки)' : 'Новый диагноз(заметка)', person: this.activePerson, diagnosis: diagnosis})
      },
      loadData () {
        this.loadLastApp(this.$route.params.id)
        this.loadAppReports(this.$route.params.id)
        this.loadClient(this.$route.params.id)
        this.loadPersons(this.$route.params.id)
      }
    },
    mounted () {
      this.loadData()
    },
    components: {
      'client-modal': ClientModal,
      'person-modal': PersonModal,
      'diagnosis-modal': DiagnosisModal
    }
  }
</script>
