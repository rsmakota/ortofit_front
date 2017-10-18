<template>
  <div v-if="appointment">
    <div class="modal-body">
      <div class="callout callout-info" v-if="(appointment.state === appState.APP.CLOSE)">

          <div v-for="reason in appReasons"><strong>{{ getReason(reason) }}</strong></div>

      </div>

      <table class="table table-striped">
      <tbody>
        <tr>
          <td><i class="fa fa-phone"></i></td>
          <td>Телефон:</td>
          <td>
              <a href="#" v-if="client">{{ client.msisdn }}</a>
          </td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fa fa-credit-card"></i></td>
          <td>Имя:</td>
          <td><span v-if="client">{{ client.name }}</span></td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fa fa-star"></i></td>
          <td>Услуга:</td>
          <td><span v-if="service">{{ service.name }}</span></td>
          <td>
            <span v-if="personServices" v-for="personService in personServices">
               <strong> {{ getServiceName(personService.serviceId) }} </strong> - {{ personService.number }}  &nbsp;&nbsp;&nbsp;
            </span>

          </td>
        </tr>
        <tr>
          <td><i class="fa fa-arrow-right"></i></td>
          <td>Источник:</td>
          <td><span v-if="clientDirection">{{ clientDirection.name }}</span></td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fa fa-building"></i></td>
          <td>Офис:</td>
          <td> <span v-if="office">{{ office.name }}</span></td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fa fa-calendar"></i></td>
          <td>Дата:</td>
          <td><span v-if="dateTime">{{ dateTime.format('DD/MM/YYYY') }}</span></td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fa fa-clock-o"></i></td>
          <td>Время:</td>
          <td><span v-if="dateTime">{{ dateTime.format('HH:mm') }}</span></td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fa fa-hourglass-1"></i></td>
          <td>Прием:</td>
          <td>{{ appointment.duration }} мин.</td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fa fa-user-md"></i></td>
          <td>Сотрудник:</td>
          <td><span v-if="doctor">{{ doctor.name }}</span></td>
          <td></td>
        </tr>
        <tr>
          <td><i class="fa fa-hand-o-right"></i></td>
          <td>Направил:</td>
          <td>
            <i v-if="appointment.flyer" class="fa fa-check-square-o" style="color: #00a157"></i>

            {{ appointment.forwarder }}
          </td>
          <td></td>
        </tr>

        <tr>
          <td><i class="fa fa-file-text-o"></i></td>
          <td>Заметка:</td>
          <td>{{ appointment.description }}</td>
          <td></td>
        </tr>
      </tbody>
      </table>
    </div>

    <div class="modal-footer" v-if="appointment.state === appState.APP.NEW">
      <button type="button" class="btn" @click="callApp"
              v-bind:class="{'btn-default': appointment.phoneConfirm, 'btn-warning': !appointment.phoneConfirm }">
        <i class="fa fa-phone icon20"></i> {{ appointment.phoneConfirm ? 'Отменить' : 'Звонок' }}</button>
      <button type="button" class="btn btn-danger"  @click="closeApp">Закрыть по причине</button>
      <button type="button" class="btn btn-primary" @click="editApp">Редактировать</button>
      <button type="button" class="btn btn-success" @click="issueApp">Оформить</button>
    </div>
    <div class="modal-footer" v-if="appointment.state === appState.APP.CLOSE">
      <button type="button" class="btn btn-success" @click="openApp" >Открыть</button>
    </div>

  </div>
</template>
<script>
//  import moment from 'moment'
  import appState from './AppointmentState'
  import reasonService from './../../../service/ReasonService'
  import moment from 'moment'

  export default {
    props: ['appReasons', 'appointment', 'client', 'service', 'personServices', 'appReminders', 'office', 'doctor', 'clientDirection', 'services'],
    data () {
      return {
        dateTime: null,
        appState: appState
      }
    },
    watch: {
      appointment: function () {
        if (this.appointment !== null) {
          this.dateTime = this.appointment.dateTime
        }
      }
    },
    methods: {
      closeApp: function () {
        this.$emit('closeApp')
      },
      editApp: function () {
        this.$emit('editApp')
      },
      issueApp: function () {
        this.$emit('issueApp')
      },
      openApp: function () {
        this.$emit('openApp')
      },
      callApp: function () {
        this.$emit('callApp')
      },
      getReason: function (reason) {
        let r = reasonService.getReasonById(reason.reasonId)
        return ' | ' + moment(reason.created).format('DD/MM/YYYY') + ' | Причина закрытия - ' + r.name
      },
      getServiceName (serviceId) {
        //     return state.offices.find(office => office.id === id)
        let service = this.services.find(service => service.id === serviceId)
        return service.shortName
      }
    }
  }
</script>
