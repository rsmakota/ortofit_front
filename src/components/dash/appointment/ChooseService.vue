<template>
  <div>
    <div class="modal-body">
      <info-panel :office="office" :person="person" :dateTime="appointment.dateTime"></info-panel>
      <div class="row">
        <form class="form-horizontal">
          <div class="col-sm-7">
            <table class="table table-striped">
              <thead>
              <tr>
                <th colspan="2">Оказанные услуги:</th>
                <th>Кол.</th>
              </tr>
              </thead>
              <tbody>
              <tr class="tr-service" v-for="s in preparedPersonServices">
                <!--<td><i class="fa fa-star-o icon20"> </i></td>-->
                <td>
                  <input type="checkbox" v-model="s.isChecked" title="s.service.name" />
                </td>
                <td>{{ s.service.name }}</td>
                <td>
                  <select size="1" v-model="s.number">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
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

              <tr>
                <td><i class="fa fa-bell-o icon20"></i></td>
                <td><date-picker v-model="remind" class="form-control pull-right" :config="dtConf"></date-picker></td>
                <td>Повтор</td>
              </tr>
              <tr>
                <td colspan="3">
                  Комментарий к напоминанию
                  <textarea rows="6" v-model="remindDescriptor" class="form-control" placeholder="Комментарий к напоминанию"></textarea>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" @click="save">Оформить</button>
    </div>
  </div>
</template>

<script>
  import InfoPanel from './InfoPanel'
//  import moment from 'moment'
  import 'bootstrap/dist/css/bootstrap.css'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'

  export default {
    props: ['appointment', 'office', 'person', 'preparedPersonServices'],
    data () {
      return {
        remind: null,
        remindDescriptor: null,
        dtConf: {format: 'DD/MM/YYYY', locale: 'ru'}
      }
    },
    methods: {
      save () {
        this.$emit('save')
      },
      merge (service) {
        let ps = this.preparedPersonServices.find(ps => ps.serviceId === service.id)
        ps.isChecked = true
        ps.number = service.number
        ps.id = service.id
      }
    },
    components: {
      'info-panel': InfoPanel,
      datePicker
    },
    computed: {
      personServices: function () {
        this.personServices.forEach(this.merge)
      }
    }
  }
</script>
