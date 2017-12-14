<template>
  <div>
    <div class="modal-body">
      <ul class="list-group" style="text-align: center">
        <li class="list-group-item list-group-item-info">
          <i class="fa fa-calendar icon20" ></i> {{ schedule.startDate.format('DD/MM/YYYY') }} &nbsp;&nbsp;&nbsp;
          <i class="fa fa-building icon20" ></i> {{ getOfficeById(schedule.officeId).name }} &nbsp;&nbsp;&nbsp;
          <span v-if="schedule.userId"><i class="fa fa-credit-card icon20" > </i> {{ getDoctorById(schedule.userId).name }} </span>
        </li>
      </ul>

      <form class="form-horizontal">
        <div class="form-group">
          <label for="doctorId" class="col-sm-3 control-label">Сотрудник:</label>

          <div class="col-sm-9">
            <div class="input-group" :class="{'has-error': doctorErr}">
              <div class="input-group-addon">
                <i class="fa fa-user-md icon20"></i>
              </div>
              <select class="form-control" id="doctorId" v-model="schedule.userId" title="doctor" @click="userClick">
                <option value="null" disabled>Выберите сотрудника</option>
                <option v-for="d in doctors" :value="d.id">{{ d.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">Начало:</label>
          <div class="col-sm-9">
            <div class="input-group" :class="{'has-error': startErr}">
              <div class="input-group-addon">
                <i class="fa fa-clock-o icon20"></i>
              </div>
              <date-picker v-model="schedule.startDate" :config="tConf"></date-picker>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">Окончание:</label>

          <div class="col-sm-9">
            <div class="input-group" :class="{'has-error': endErr}">
              <div class="input-group-addon">
                <i class="fa fa-clock-o icon20"></i>
              </div>
              <date-picker v-model="schedule.endDate" :config="tConf"></date-picker>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click="btnSave"> Сохранить </button>
    </div>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import moment from 'moment'
  import 'bootstrap/dist/css/bootstrap.css'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'

  export default {
    props: ['schedule', 'doctors'],
    data () {
      return {
        tConf: {format: 'HH:mm', locale: 'ru'},
        startErr: false,
        endErr: false,
        doctorErr: false
      }
    },
    methods: {
      userClick () {
        this.doctorErr = false
      },
      sanitizeClient () {
        if (!this.schedule.userId) {
          this.doctorErr = true
          return false
        }
        return true
      },
      btnSave () {
        if (!this.sanitizeClient()) {
          return
        }
        this.schedule.startDate = moment(this.schedule.startDate.format('YYYY-MM-DD') + ' ' + this.schedule.startDate.format('HH:mm:ss'))
        this.schedule.endDate = moment(this.schedule.endDate.format('YYYY-MM-DD') + ' ' + this.schedule.endDate.format('HH:mm:ss'))
        this.$emit('save')
      }
    },
    components: {
      datePicker
    },
    mounted () {},
    computed: {
      ...mapGetters({
        getOfficeById: 'office/getOfficeById',
        getDoctorById: 'doctor/getDoctorById'
      })
    }
  }
</script>

