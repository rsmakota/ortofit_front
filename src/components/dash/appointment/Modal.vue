<template>
  <modal name="appointment-modal" draggable=".modal-header" height="auto" @before-open="beforeOpen" :pivotY="0.1" ref="modal">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" @click="close"> <span>×</span></button>
          <h4 id="myModalLabel" class="modal-title">{{title}}</h4>
        </div>
        <client-form v-if="(state === 'new')" ref="client"
                     @complete="clientReceived"
                     @save="saveClient"
                     @findByMsisdn="findClientByMsisdn"
                     :client="client">

        </client-form>
        <new-form v-if="(state === 'app')" v-bind:params="params"
                  :client="client"
                  :app="appointment"
                  :doctors="doctors"
                  :offices="offices"
                  :services="services"
                  @save="saveApp"
                  ref="new">

        </new-form>
        <view-form v-if="state === 'view'" v-bind:params="params" ref="view"></view-form>

      </div>

  </modal>
</template>

<script>
  import ClientForm from './../../client/ClientForm.vue'
  import New from './AppForm'
  import View from './View.vue'
  import { bus } from './../../event/bus'
  import clientService from './../../../service/ClientService'
  import appService from './../../../service/AppointmentService'

  export default {
    data () {
      return {
        title: null,
        state: null,
        params: null,
        client: null,
        appointment: null,
        doctors: null,
        offices: null,
        services: null
      }
    },
    methods: {
      beforeOpen (event) {
        this.title = event.params.title
        this.params = event.params
        this.state = event.params.state
        this.doctors = this.$store.getters['doctor/getAll']
        this.offices = this.$store.getters['office/getAll']
        this.services = this.$store.getters['service/getAll']
        this.client = {name: null, gender: null, msisdn: null, clientDirectionId: null, countryId: 1}
        this.appointment = {
          clientId: null,
          description: null,
          officeId: null,
          serviceId: null,
          dateTime: null,
          state: 1,
          duration: 15,
          userId: 3,
          forwarder: null,
          bold: false,
          flyer: false,
          phoneConfirm: false
        }
      },
      close () {
        this.$modal.hide('appointment-modal')
      },
      clientReceived: function (client) {
        this.state = 'app'
        this.appointment.clientId = client.id
        this.appointment.officeId = ('officeId' in this.params) ? this.params.officeId : null
        this.appointment.userId = ('doctorId' in this.params) ? this.params.doctorId : null
        this.appointment.dateTime = ('dateTime' in this.params) ? this.params.dateTime : null
      },
      setClient: function (client) {
        if (client === null) {
          return
        }
        this.client = client
      },
      findClientByMsisdn: function () {
        clientService.findByMsisdn(this.client.msisdn, this.setClient)
      },
      saveClient: function () {
        clientService.save(this.client, this.setClient)
      },
      saveApp: function () {
        appService.save(this.appointment, this.close, this.errorResponse)
      },
      errorResponse: function (err) {
        console.log(err)
      }
    },
    components: {
      'new-form': New,
      'view-form': View,
      'client-form': ClientForm
    },
    mounted () {
      bus.$on('appointment-modal-close', this.close)
//      bus.$on('client-received', this.clientReceived)
    }
  }
</script>
