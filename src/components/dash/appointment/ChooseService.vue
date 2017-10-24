<template>
  <div>
    <div class="modal-body">
      <info-panel :office="office" :person="person" :dateTime="appointment.dateTime"></info-panel>
      <div class="row">
        <form class="form-horizontal">
          <div class="col-sm-7">
            <table class="table table-striped">
              <thead>
              <tr style="text-align: center">
                <th colspan="2">Оказанные услуги:</th>
                <th>Кол.</th>
              </tr>
              </thead>
              <tbody>
              <tr v-bind:class="{'danger': serviceErr}" v-for="s in preparedPersonServices">
                <!--<td><i class="fa fa-star-o icon20"> </i></td>-->
                <td>
                  <input type="checkbox" v-model="s.isChecked" :title="s.service.name" @click="serviceClick" />
                </td>
                <td>{{ s.service.name }}</td>
                <td>
                  <select size="1" v-model="s.number">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="col-sm-5" style="padding-left: 0;">
            <table class="table table-striped">
              <thead>
              <tr>
                <th colspan="3">Другое:</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><i class="fa fa-hand-o-right icon20"></i></td>
                <td><input class="form-control pull-right" type="text" placeholder="Врач" v-model="appointment.forwarder"/></td>
                <td>Направил</td>
              </tr>
              <tr>
                <td > <i class="fa fa-list-alt icon20"></i></td><td colspan="2"> Наличие направления
                <input v-model="appointment.flyer" type="checkbox" style="position: absolute; right: 20px"/></td>
              </tr>

              <tr v-bind:class="{'danger': remindErr}">
                <td><i class="fa fa-bell-o icon20"></i></td>
                <td><date-picker v-model="remind.dateTime" class="form-control pull-right" :config="dtConf" v-if="remind" @click="remindClick"></date-picker></td>
                <td>Повтор</td>
              </tr>
              <tr>
                <td colspan="3">
                  Комментарий к напоминанию
                  <textarea rows="6" v-model="remind.description" class="form-control" placeholder="Комментарий к напоминанию" v-if="remind"></textarea>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" @click="save">Далее</button>
    </div>
  </div>
</template>

<script>
  import InfoPanel from './InfoPanel'
  import moment from 'moment'
  import 'bootstrap/dist/css/bootstrap.css'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'

  export default {
    props: ['appointment', 'office', 'person', 'preparedPersonServices', 'personServices', 'remind'],
    data () {
      return {
        dtConf: {format: 'DD/MM/YYYY', locale: 'ru'},
        serviceErr: false,
        remindErr: false
      }
    },
    methods: {
      serviceClick () {
        this.serviceErr = false
      },
      remindClick () {
        this.remindErr = false
      },
      sanitizeServer () {
        let ps = this.preparedPersonServices.find(ps => ps.isChecked === true)
        if (ps !== undefined) {
          return true
        }
        this.serviceErr = true
      },
      sanitizeRemind () {
        let now = moment()
        if (moment.isMoment(this.remind.dateTime) && (this.remind.dateTime < now)) {
          this.remindErr = true
          return false
        }
        return true
      },
      save () {
        if (!this.sanitizeServer() || !this.sanitizeRemind()) {
          return
        }
        this.remind.appointmentId = this.appointment.id
        this.remind.personId = this.person.id
        if (this.remind.description === null) {
          this.remind.description = ''
        }
        this.$emit('save')
      },
      merge (service) {
        let ps = this.preparedPersonServices.find(ps => ps.serviceId === service.serviceId)
        if (ps === undefined) {
          return
        }
        ps.isChecked = true
        ps.number = service.number
        ps.id = service.id
      }
    },
    components: {
      'info-panel': InfoPanel,
      datePicker
    },
    watch: {
      personServices: function () {
        this.personServices.forEach(this.merge)
      },
      remind: function () {
        if ((this.remind.dateTime !== null) && !moment.isMoment(this.remind.dateTime)) {
          this.remind.dateTime = moment(this.remind.dateTime)
        }
      }
    }
  }
</script>
