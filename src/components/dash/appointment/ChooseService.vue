<template>
  <div class="modal-body">
    <info-panel></info-panel>
    <div class="row">
      <form class="form-horizontal" id="serviceForm">
        <div class="col-sm-7">
          <table class="table table-striped">
            <thead>
            <tr>
              <th colspan="2">Оказанные услуги:</th>
              <th>Кол.</th>
            </tr>
            </thead>
            <tr class="tr-service" v-for="s in services">
              <!--<td><i class="fa fa-star-o icon20"> </i></td>-->
              <td>
                <input type="checkbox" v-model="service" title="{{ s.name }}" class="chb-service" />
              </td>
              <td>{{ s.name }}</td>
              <td>
                <select size="1">
                  <option>1</option>
                  <option>2</option>
                </select>
              </td>
            </tr>
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
              <td>Направил</td>
              <td><input class="form-control pull-right active nes"
                         type="text" placeholder="Врач" v-model="appointment.forwarder"/></td>
            </tr>
            <tr>
              <td > <i class="fa fa-list-alt icon20"></i></td><td colspan="2"> Наличие направления
              <input  class="active nes" v-model="appointment.flyer" type="checkbox" style="position: absolute; right: 20px"/></td>
            </tr>

            <tr>
              <td><i class="fa fa-bell-o icon20"></i></td>
              <td>Повтор</td>
              <td><date-picker v-model="remind" class="form-control pull-right active nes"></date-picker></td>
            </tr>
            <tr>
              <td colspan="3">
                Комментарий к напоминанию
                <textarea rows="6" v-model="remindDescriptor" class="form-control nes"
                          placeholder="Комментарий к напоминанию"></textarea>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-success" id="nextButton">Оформить</button>
  </div>
</template>

<script>
  import InfoPanel from './InfoPanel'
//  import moment from 'moment'
  import 'bootstrap/dist/css/bootstrap.css'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'

  export default {
    props: ['appointment', 'office', 'client', 'person', 'services'],
    data () {
      return {
        remind: null,
        remindDescriptor: null
      }
    },
    methods: {
      save () {
//        let diagnosis = null
//        if (this.description !== null) {
//          diagnosis = {personId: this.person.id, description: this.description}
//        }
//        this.$emit('save', diagnosis)
      }
    },
    components: {
      'info-panel': InfoPanel,
      datePicker
    }
  }
</script>
