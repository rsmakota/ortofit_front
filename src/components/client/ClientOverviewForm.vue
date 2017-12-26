<template>
  <div>
    <div class="modal-body">
      <div class="box">
        <div class="box box-widget widget-user-2">
          <div class="widget-user-header bg-yellow">
            <div class="widget-user-image">
              <div class="close"><router-link :to="{ name: 'ClientView', params: { id: client.id }}"> <i class="fa fa-pencil edit" @click="close"></i></router-link></div>
              <img class="img-circle" alt="User Avatar" :src="clientAvatar" />
            </div>
            <h3 class="widget-user-username">{{ client.name }}</h3>
            <h5 class="widget-user-desc">{{ client.msisdn }}</h5>
          </div>
          <div class="box-footer">
            <div class="row">
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">Клиент с:</h5>
                  <span class="description-text">{{ dateFormat(client.created) }}</span>
                </div>
              </div>
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">Членов семьи:</h5>
                  <span class="description-text">{{ numPersons }}</span>
                </div>
              </div>
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">Всего визитов:</h5>
                  <span class="description-text">{{ numApps }}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <table class="table table-striped" style="text-align: center">
        <thead>
        <tr >
          <th style="text-align: center">Дата</th>
          <th style="text-align: center">Оффис</th>
          <th style="text-align: center">Врач</th>
          <th style="text-align: center">Заявка</th>
          <th style="text-align: center">Оказана</th>
          <th style="text-align: center">Оформлен</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="app in appReports">
          <td>{{ app.id }}</td>
          <td>{{ dateFormat(app.dateTime) }}</td>
          <td>{{ timeFormat(app.dateTime) }}</td>
          <td>
            {{ app.officeName }}
          </td>
          <td>
            {{ app.doctorName }}
          </td>
          <td>
            {{ app.serviceName }}
          </td>
          <td>
            <div v-for="personData in app.personData">
              ({{ personData.person.familyStatus.name }}) <strong>{{ personData.person.name }}</strong>:

              <span v-for="personService in personData.personServices">
                      {{ getServiceName(personService.serviceId) }}
                    <br>
                    </span>
            </div>
          </td>
          <td>
            <i v-if="app.state == 4" class="fa fa-check" aria-hidden="true" style="color: green"></i>
            <i v-else-if="app.state == 3" class="fa fa-close" aria-hidden="true" style="color: red"></i>
            <i v-else class="fa fa-circle-thin" aria-hidden="true" style="color: grey"></i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
  import moment from 'moment'
  import serviceService from '../../service/ServiceService'

  export default {
    props: ['client', 'persons', 'appReports'],
    data () {
      return {
        prefix: 38,
        avatarPath: '/static/img/avatar/'
      }
    },
    methods: {
      dateFormat (timestamp) {
        if (timestamp) {
          return moment(timestamp).format('DD/MM/YYYY')
        }
        return '-'
      },
      timeFormat (timestamp) {
        return moment(timestamp).format('HH:mm')
      },
      getServiceName (id) {
        let service = serviceService.getServiceById(id)
        return (typeof service !== 'undefined') ? service.name : ''
      },
      close () {
        console.log('CLOSE')
        this.$emit('close')
      }
    },
    computed: {
      clientAvatar: function () {
        if (!(this.client)) {
          return this.avatarPath + 'unknown.png'
        }
        if (this.client.gender === 'male') {
          return this.avatarPath + 'avatar5.png'
        }
        if (this.client.gender === 'female') {
          return this.avatarPath + 'avatar3.png'
        }
        return this.avatarPath + 'unknown.png'
      },
      numPersons: function () {
        return (this.persons) ? this.persons.length : 0
      },
      numApps: function () {
        return (this.appReports) ? this.appReports.length : 0
      }
    }
  }
</script>
