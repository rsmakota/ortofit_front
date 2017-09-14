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
          <div class="input-group">
            <div class="input-group-addon"><strong class="icon20">+{{ prefix }}</strong></div>
            <!--<input type="text" class="form-control" v-model="msisdn" placeholder="067-359-42-88" id="msisdn" />-->
            <masked-input v-model="msisdn" mask="111-111-11-11" placeholder="Номер телефона" type="tel" class="form-control" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="clientName" class="col-sm-3 control-label">Имя:</label>

        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-credit-card icon20"> </i>
            </div>
            <input type="text" class="form-control" id="clientName" placeholder="Имя Клиента" v-model="clientName"/>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="gender" class="col-sm-3 control-label">Пол:</label>

        <div class="col-sm-9">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-venus-mars icon20"></i>
            </div>
            <select class="form-control" id="gender" v-model="gender" title="gender">
              <option value="female">Женский</option>
              <option value="male">Мужской</option>
            </select>
          </div>

        </div>
      </div>



      <div class="form-group">
        <label for="serviceId" class="col-sm-3 control-label">Услуга:</label>

        <div class="col-sm-9">
          <div class="input-group">
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
          <div class="input-group">
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
          <div class="input-group">
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
          <div class="input-group">
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
          <div class="input-group">
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

      <input type="hidden" id="appId"       v-model="appId">
      <input type="hidden" id="clientId"    v-model="clientId">
      <input type="hidden" id="directionId" v-model="directionId">

    </form>

  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-default" v-on:click="closeModal">Закрыть</button>
    <button type="button" class="btn btn-primary" id="saveButton" v-on:click="save">Сохранить</button>
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
  export default {
    props: ['params'],
    data () {
      return {
        fromCalendar: false,
        doctorId: 0,
        officeId: 0,
        serviceId: 0,
        doctors: this.$store.getters['doctor/getAll'],
        offices: this.$store.getters['office/getAll'],
        services: this.$store.getters['service/getAll'],
        date: null,
        time: null,
        prefix: 38,
        msisdn: null,
        clientName: null,
        gender: 'female',
        duration: 15,
        forwarder: null,
        flyer: null,
        bold: null,
        description: null,
        appId: null,
        clientId: null,
        directionId: null,
        dtConf: {format: 'DD/MM/YYYY', locale: 'ru'},
        tConf: {format: 'HH:mm', locale: 'ru'}
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
      closeModal: function () {
        this.$emit('close-modal', true)
      },
      save: function () {
        console.log('MSISDN', this.msisdn)
      }
    },
    mounted () {
      this.fromCalendar = ('fromCalendar' in this.params) ? this.params.fromCalendar : false
      this.officeId = ('officeId' in this.params) ? this.params.officeId : 0
      this.doctorId = (('doctorId' in this.params) && (this.params.doctorId != null)) ? this.params.doctorId : 0
      this.date = (('time' in this.params) && (this.params.time instanceof moment)) ? this.params.time : null
      this.time = (('time' in this.params) && (this.params.time instanceof moment)) ? this.params.time : null
      console.log(this.params)
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
