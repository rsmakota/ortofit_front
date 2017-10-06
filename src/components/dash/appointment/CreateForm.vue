<template>
  <div>
  <div class="modal-body">

    <ul class="list-group" style="text-align: center" v-if="fromCalendar">
      <li class="list-group-item list-group-item-info">

        <span v-if="doctorId"><i class="fa fa-user-md icon20" > </i> {{ getDoctorName(doctorId) }} &nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span v-if="officeId"><i class="fa fa-building icon20" ></i> {{ getOfficeName(officeId) }} &nbsp;&nbsp;&nbsp;&nbsp;</span>

        <span v-if="date"><i class="fa fa-calendar icon20" ></i> {{date.format('DD/MM/YYYY')}} &nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span v-if="time"><i class="fa fa-clock-o icon20" > </i> {{time.format('HH:mm')}}</span>
      </li>
    </ul>

    <form class="form-horizontal">
      <div class="form-group">
        <label for="msisdn" class="col-sm-3 control-label">Телефон:</label>

        <div class="col-sm-9">
          <div class="input-group" v-bind:class="{'has-success': (client !== null), 'has-error': msisdnErr}">
            <div class="input-group-addon">
              <strong class="icon20">+{{ prefix }}</strong></div>
            <!--<input type="text" class="form-control" v-model="msisdn" placeholder="067-359-42-88" id="msisdn" />-->
            <masked-input :disabled="client !== null" v-model="msisdn" mask="111-111-11-11" placeholder="Номер телефона" type="tel" class="form-control" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="clientName" class="col-sm-3 control-label">Имя:</label>

        <div class="col-sm-9">
          <div class="input-group" v-bind:class="{'has-success': (client !== null), 'has-error': clientNameErr}">
            <div class="input-group-addon">
              <i class="fa fa-credit-card icon20"> </i>
            </div>
            <input type="text" class="form-control" id="clientName" placeholder="Имя Клиента" v-model="clientName" :disabled="client !== null"/>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="gender" class="col-sm-3 control-label">Пол:</label>

        <div class="col-sm-9">
          <div class="input-group" v-bind:class="{'has-success': (client !== null), 'has-error': genderErr}">
            <div class="input-group-addon" >
              <i class="fa fa-venus-mars icon20"></i>
            </div>
            <select class="form-control" id="gender" v-model="gender" title="gender" :disabled="client !== null">
              <option value="null" disabled>Выберите пол</option>
              <option value="female">Женский</option>
              <option value="male">Мужской</option>
            </select>
          </div>

        </div>
      </div>

<div v-bind:class="{hidden: (client === null)}">

      <div class="form-group">
        <label for="serviceId" class="col-sm-3 control-label">Услуга:</label>

        <div class="col-sm-9">
          <div class="input-group" v-bind:class="{'has-error': serviceErr}">
            <div class="input-group-addon">
              <i class="fa fa-star icon20"></i>
            </div>
            <select class="form-control" id="serviceId" v-model="serviceId" title="service">
              <option value="0" disabled>Выберите услугу</option>
              <option v-for="s in services" v-bind:value="s.id">{{ s.name }}</option>
            </select>
          </div>

        </div>
      </div>


      <div class="form-group" v-if="!fromCalendar">
        <label for="officeId" class="col-sm-3 control-label">Офис:</label>
        <div class="col-sm-9">
          <div class="input-group" v-bind:class="{'has-error': officeErr}">
            <div class="input-group-addon">
              <i class="fa fa-building icon20"></i>
            </div>
            <select class="form-control" id="officeId" v-model="officeId" title="office">
              <option value="0" disabled>Выберите офис</option>
              <option v-for="o in offices" v-bind:value="o.id">{{ o.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="duration" class="col-sm-3 control-label">Прием:</label>

        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-hourglass-1 icon20"></i>
            </div>
            <select class="form-control" id="duration" v-model="duration" title="duration">
              <option v-for="i in 4" v-bind:value="i*15">{{ (i*15) }} мин.</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group" v-if="!fromCalendar">
        <label for="date" class="col-sm-3 control-label">Дата:</label>

        <div class="col-sm-9">
          <div class="input-group" v-bind:class="{'has-error': dateErr}">
            <div class="input-group-addon">
              <i class="fa fa-calendar icon20"></i>
            </div>
            <!--<input id="date" name="date" class="form-control pull-right active" type="text" />-->
            <date-picker v-model="date" :config="dtConf"></date-picker>
          </div>
        </div>
      </div>


      <div class="form-group" v-if="!fromCalendar">
        <label for="time" class="col-sm-3 control-label">Время:</label>

        <div class="col-sm-9">
          <div class="input-group" v-bind:class="{'has-error': timeErr}">
            <div class="input-group-addon">
              <i class="fa fa-clock-o icon20"></i>
            </div>
            <!--<input id="time" class="form-control pull-right active" type="text" v-model="time" />-->
            <date-picker v-model="time" :config="tConf"></date-picker>
          </div>
        </div>
      </div>


      <div class="form-group" v-if="!fromCalendar || (fromCalendar && (params.doctorId == null))">
        <label for="doctorId" class="col-sm-3 control-label">Сотрудник:</label>

        <div class="col-sm-9">
          <div class="input-group" v-bind:class="{'has-error': doctorErr}">
            <div class="input-group-addon">
              <i class="fa fa-user-md icon20"></i>
            </div>
            <select class="form-control" id="doctorId" v-model="doctorId" title="doctor" >
              <option value="0" disabled>Выберите сотрудника</option>
              <option v-for="d in doctors" v-bind:value="d.id">{{ d.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="forwarder" class="col-sm-3 control-label">Направил:</label>
        <div class="col-sm-6">
          <div class="input-group">
            <div class="input-group-addon"><i class="fa fa-hand-o-right icon20"></i></div>
            <input id="forwarder" class="form-control pull-right active" type="text"
                   placeholder="Врач направивший клиента" v-model="forwarder"/>
          </div>

        </div>
        <div class="col-sm-3">
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="flyer" id="flyer" value="1">
              Направление
            </label>
          </div>

        </div>
      </div>
      <div class="form-group">
        <label for="bold" class="col-sm-3 control-label">Выделить:</label>
        <div class="col-sm-9">
          <div class="input-group">
            <input id="bold" class="" type="checkbox" v-model="bold" value="1" />
          </div>
        </div>

      </div>
      <div class="form-group">
        <label for="description" class="col-sm-3 control-label">Заметка:</label>

        <div class="col-sm-9">
          <textarea class="form-control" rows="3" id="description" v-model="description" title="description">{{ description }}</textarea>
        </div>
      </div>
</div>
      <input type="hidden" id="appId"       v-model="appId">
      <input type="hidden" id="clientId"    v-model="clientId">
      <input type="hidden" id="directionId" v-model="directionId">

    </form>

  </div>
  <div class="modal-footer" v-bind:class="{hidden: (client !== null)}">
    <button type="button" class="btn btn-primary" v-on:click="btnSaveClient">Далее >></button>
  </div>
  <div class="modal-footer" v-bind:class="{hidden: (client === null)}">
    <button type="button" class="btn btn-default" v-on:click="btnCloseModal">Закрыть</button>
    <button type="button" class="btn btn-primary" id="saveButton" v-on:click="btnSaveApp">Сохранить</button>
  </div>
  </div>
</template>

<script>
  import moment from 'moment'
  // Import required dependencies
  import 'bootstrap/dist/css/bootstrap.css'

  // Import this component
  import datePicker from 'vue-bootstrap-datetimepicker'
  import maskedInput from 'vue-masked-input'
  // Import date picker css
  import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
  import { bus } from './../../event/bus'
  import clientService from '../../../service/ClientService'
  import appService from '../../../service/AppointmentService'

  export default {
    props: ['params'],
    data () {
      return {
        fromCalendar: false,
        doctorId: 0,
        doctorErr: false,
        officeId: 0,
        officeErr: false,
        serviceId: 0,
        serviceErr: false,
        doctors: this.$store.getters['doctor/getAll'],
        offices: this.$store.getters['office/getAll'],
        services: this.$store.getters['service/getAll'],
        date: null,
        dateErr: false,
        time: null,
        timeErr: false,
        prefix: 38,
        msisdn: null,
        msisdnErr: false,
        number: null,
        clientName: null,
        clientNameErr: null,
        gender: null,
        genderErr: false,
        duration: 15,
        forwarder: null,
        flyer: null,
        bold: null,
        description: null,
        appId: null,
        clientId: null,
        clientErr: false,
        client: null,
        directionId: null,
        dtConf: {format: 'DD/MM/YYYY', locale: 'ru'},
        tConf: {format: 'HH:mm', locale: 'ru'}
      }
    },
    watch: {
      msisdn: function (val) {
        this.msisdnErr = false
        this.number = val.replace(/[^0-9]/gim, '')
        if (this.number.length === 10) {
          clientService.findByMsisdn(this.prefix + this.number, this.setClient)
        }
      },
      clientName: function (val) {
        this.clientNameErr = false
      },
      gender: function (val) {
        this.genderErr = false
      },
      serviceId: function () {
        this.serviceErr = false
      },
      doctorId: function () {
        this.doctorErr = false
      }
    },
    methods: {
      getOfficeName: function (id) {
        return this.$store.getters['office/getOfficeById'](id).name
      },
      getDoctorName: function (id) {
        return this.$store.getters['doctor/getDoctorById'](id).name
      },
      getOfficeNameById: function (id) {
        let office = this.$store.getters['office/getOfficeById'](id)
        return ('name' in office) ? office.name : ''
      },
      getOffice: function (id) {
        return this.$store.getters['office/getOfficeById'](id)
      },
      btnCloseModal: function () {
        this.$emit('close-modal', true)
      },
      sanitizeClient: function () {
        this.msisdnErr = (this.number.length < 10) || this.number.substring(0, 1) !== '0'
        this.clientNameErr = (this.clientName === null || this.clientName.length < 1)
        this.genderErr = (this.gender === null)
        return (!this.msisdnErr && !this.clientNameErr && !this.genderErr)
      },
      sanitizeAppointment: function () {
        this.officeErr = (this.officeId === 0)
        this.doctorErr = (this.doctorId === 0)
        this.dateErr = (this.data === null)
        this.timeErr = (this.time === null)
        this.serviceErr = (this.serviceId === 0)
        return (!this.officeErr && !this.doctorErr && !this.dateErr && !this.timeErr && !this.serviceErr)
      },
      btnSaveClient: function () {
        let office = this.getOffice(this.officeId)
        let data = {msisdn: (this.prefix + this.number), name: this.clientName, gender: this.gender, countryId: office.city.country.id}
        if (!this.sanitizeClient()) {
          return
        }
        clientService.create(data, this.setClient)
      },
      successSaveApp: function (app) {
        bus.$emit('appointment-modal-close')
        bus.$emit('appointment-schedule-refresh')
      },
      failSaveApp: function (err) {
        console.log(err)
      },
      btnSaveApp: function () {
        if (!this.sanitizeAppointment()) {
          return
        }
        let data = {
          clientId: this.client.id,
          description: (this.description !== null) ? this.description : '',
          officeId: this.officeId,
          serviceId: this.serviceId,
          dateTime: moment(this.date.format('YYYY-MM-DD') + ' ' + this.time.format('HH:mm:ss')),
          duration: this.duration,
          userId: this.doctorId,
          forwarder: this.forwarder,
          bold: (this.bold !== null),
          flyer: (this.flyer !== null)
        }
        appService.create(data, this.successSaveApp, this.failSaveApp)
      },
      setClient: function (client) {
        if (client === null) {
          return
        }
        this.client = client
        this.clientName = client.name
        this.gender = client.gender
      }
    },
    mounted () {
      this.fromCalendar = ('fromCalendar' in this.params) ? this.params.fromCalendar : false
      this.officeId = ('officeId' in this.params) ? this.params.officeId : 0
      this.doctorId = (('doctorId' in this.params) && (this.params.doctorId != null)) ? this.params.doctorId : 0
      this.date = (('time' in this.params) && (this.params.time instanceof moment)) ? this.params.time : null
      this.time = (('time' in this.params) && (this.params.time instanceof moment)) ? this.params.time : null
    },
    components: {
      datePicker,
      maskedInput
    }
  }
</script>
<style>
  .icon20 {
    width:23px;
  }
</style>
