<template>
  <div>
    <div class="modal-body">
      <ul class="list-group" style="text-align: center">
        <li class="list-group-item list-group-item-info" v-if="remindReport">
          <span><strong> Прошлый визит №{{ remindReport.appointmentId }}: </strong>&nbsp;</span>
          <span v-if="doctor"><i class="fa fa-user-md icon20"> </i> {{ doctor.name }} &nbsp;</span>
          <span v-if="office"><i class="fa fa-building icon20"></i> {{ office.name }} &nbsp;</span>
          <span><i class="fa fa-calendar icon20"></i> {{ dateFormat(remindReport.appointmentDateTime) }}</span>
          <span><i class="fa fa-clock-o icon20"></i>{{ timeFormat(remindReport.appointmentDateTime) }}</span>
        </li>
      </ul>
      <form class="form-horizontal">

        <div class="form-group">
          <label class="col-sm-3 control-label">Клиент:</label>

          <div class="col-sm-9">
            <div class="input-group">
              <div class="input-group-addon" >
                <i class="fa fa-credit-card icon20"></i>
              </div>

              <div class="form-control pull-right" disabled>
                {{ remindReport.clientName }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label">Услуги:</label>

          <div class="col-sm-9">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-star icon20"></i>
              </div>
              <div class="form-control pull-right" disabled>
                {{ remindReport.serviceNameList }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label">Дата:</label>

          <div class="col-sm-9">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-calendar icon20"></i>
              </div>
              <date-picker v-model="date" :config="dtConf"></date-picker>
            </div>
          </div>
        </div>


        <div class="form-group">
          <label class="col-sm-3 control-label">Текст:</label>

          <div class="col-sm-9">
            <textarea class="form-control" rows="3" v-model="description">{{ description }}</textarea>
          </div>
        </div>

      </form>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-danger" @click="btnDelete">Удалить</button>
      <button type="button" class="btn btn-primary" @click="btnUpdate">Редактировать</button>
    </div>
  </div>
</template>


<script>
  import moment from 'moment'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'

  export default {
    props: ['remindReport', 'mod', 'doctor', 'office'],
    data () {
      return {
        dtConf: {format: 'DD/MM/YYYY', locale: 'ru'},
        date: null,
        description: ''
      }
    },
    methods: {
      sanitizeClient: function () {
        return false
      },
      getDateTime () {
        return moment(this.date.format('YYYY-MM-DD') + ' 00:00:00')
      },
      dateFormat (timestamp) {
        return moment(timestamp).format('DD/MM/YYYY')
      },
      timeFormat (timestamp) {
        return moment(timestamp).format('HH:mm')
      },
      btnDelete () {
        this.$emit('delete', this.remindReport.id)
      },
      btnUpdate () {
        this.$emit('update', {
          id: this.remindReport.id,
          dateTime: this.getDateTime(),
          description: this.description,
          appointmentId: this.remindReport.appointmentId,
          personId: this.remindReport.personId,
          processed: this.remindReport.processed
        })
      }
    },
    components: {
      datePicker
    },
    mounted () {
      this.date = moment(this.remindReport.dateTime)
      this.description = this.remindReport.description
      console.log(this.$modal)
    }
  }
</script>

<style>
  .icon20 {
    width:23px;
  }
</style>
