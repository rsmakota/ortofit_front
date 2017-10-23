<template>
  <div>
  <div class="modal-body">

    <ul class="list-group" style="text-align: center">
      <li class="list-group-item list-group-item-info">
        <span v-if="app.officeId"><i class="fa fa-building icon20" ></i> {{ getOfficeName(app.officeId) }} &nbsp;&nbsp;&nbsp;</span>
        <span v-if="date"><i class="fa fa-calendar icon20" ></i> {{date.format('DD/MM/YYYY')}} &nbsp;&nbsp;&nbsp;</span>
        <span v-if="time"><i class="fa fa-clock-o icon20" > </i> {{time.format('HH:mm')}} &nbsp;&nbsp;&nbsp;</span>
        <span v-if="client"><i class="fa fa-credit-card icon20" > </i> {{client.name}} </span>
      </li>
    </ul>

    <form class="form-horizontal">
      <div class="form-group">
        <label for="serviceId" class="col-sm-3 control-label">Услуга:</label>
        <div class="col-sm-9">
          <div class="input-group" v-bind:class="{'has-error': serviceErr}">
            <div class="input-group-addon">
              <i class="fa fa-star icon20"></i>
            </div>
            <select class="form-control" id="serviceId" v-model="app.serviceId" title="service" @click="serviceClick">
              <option value="null" disabled>Выберите услугу</option>
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
            <select class="form-control" id="officeId" v-model="app.officeId" title="office" @click="officeClick">
              <option value="null" disabled>Выберите офис</option>
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
            <select class="form-control" id="duration" v-model="app.duration" title="duration">
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
            <date-picker v-model="date" :config="dtConf" id="date" ></date-picker>
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
            <date-picker v-model="time" :config="tConf" id="time"></date-picker>
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
            <select class="form-control" id="doctorId" v-model="app.userId" title="doctor" @click="userClick">
              <option value="null" disabled>Выберите сотрудника</option>
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
                   placeholder="Врач направивший клиента" v-model="app.forwarder"/>
          </div>

        </div>
        <div class="col-sm-3">
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="app.flyer" id="flyer">
              Направление
            </label>
          </div>

        </div>
      </div>
      <div class="form-group">
        <label for="bold" class="col-sm-3 control-label">Выделить:</label>
        <div class="col-sm-9">
          <div class="input-group">
            <input id="bold" class="" type="checkbox" v-model="app.bold" value="1" />
          </div>
        </div>

      </div>
      <div class="form-group">
        <label for="description" class="col-sm-3 control-label">Заметка:</label>
        <div class="col-sm-9">
          <textarea class="form-control" rows="3" id="description" v-model="app.description" title="description">{{ app.description }}</textarea>
        </div>
      </div>
    </form>

  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary" id="saveButton" v-on:click="btnSaveApp">Сохранить</button>
  </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import 'bootstrap/dist/css/bootstrap.css'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'

  export default {
    props: ['app', 'client', 'doctors', 'offices', 'services'],
    data () {
      return {
        fromCalendar: false,
        doctorErr: false,
        officeErr: false,
        serviceErr: false,
        date: null,
        dateErr: false,
        time: null,
        timeErr: false,
        forwarder: null,
        clientErr: false,
        dtConf: {format: 'DD/MM/YYYY', locale: 'ru'},
        tConf: {format: 'HH:mm', locale: 'ru'}
      }
    },
    watch: {
      date: function () {
        this.dateErr = false
      },
      time: function () {
        this.timeErr = false
      }
    },
    methods: {
      serviceClick: function () {
        this.serviceErr = false
      },
      userClick: function () {
        this.doctorErr = false
      },
      officeClick: function () {
        this.officeErr = false
      },
      getOfficeName: function (id) {
        return this.$store.getters['office/getOfficeById'](id).name
      },
      getDoctorName: function (id) {
        return this.$store.getters['doctor/getDoctorById'](id).name
      },
      sanitizeAppointment: function () {
        this.officeErr = (this.app.officeId === null)
        this.doctorErr = (this.app.userId === null)
        this.dateErr = (this.date === null)
        this.timeErr = (this.time === null)
        this.serviceErr = (this.app.serviceId === null)
        this.app.description = (this.app.description === null) ? '' : this.app.description
        return (!this.officeErr && !this.doctorErr && !this.dateErr && !this.timeErr && !this.serviceErr)
      },
      failSaveApp: function (err) {
        console.log(err)
      },
      btnSaveApp: function () {
        if (!this.sanitizeAppointment()) {
          return
        }
        this.app.dateTime = moment(this.date.format('YYYY-MM-DD') + ' ' + this.time.format('HH:mm:ss'))
        this.$emit('save')
      }
    },
    mounted () {
      this.date = (('dateTime' in this.app) && moment.isMoment(this.app.dateTime)) ? this.app.dateTime : null
      this.time = (('dateTime' in this.app) && moment.isMoment(this.app.dateTime)) ? this.app.dateTime : null
    },
    components: {
      datePicker
    }
  }
</script>

