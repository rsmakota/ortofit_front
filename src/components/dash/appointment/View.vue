<template>
  <div v-if="appointment">
    <div class="modal-body">
      <div class="callout callout-info" v-if="(appointment.state == 3)">
        <!--need app reasons-->
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
               <strong> {{ personService.service.shortName }} </strong> - {{ personService.number }}  &nbsp;&nbsp;&nbsp;
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

    <div class="modal-footer">

      <button type="button" class="btn btn-danger"  id="reasonButton">Закрыть по причине</button>
      <button type="button" class="btn btn-primary" id="editButton">Редактировать</button>
      <button type="button" class="btn btn-success" id="orderButton">Оформить</button>
      <button v-if="(appointment.state == 3)" type="button" class="btn btn-success" id="openButton">Открыть</button>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'

  export default {
    props: ['appointment', 'client', 'service', 'personServices', 'appReminders', 'office', 'doctor', 'clientDirection'],
    data () {
      return {
        dateTime: null
      }
    },
    watch: {
      appointment: function () {
        if (this.appointment !== null) {
          this.dateTime = moment(this.appointment.dateTime)
        }
      }
    }
  }
</script>
