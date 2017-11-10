<template>
  <modal name="client-modal" draggable=".modal-header" height="auto"
         @before-open="beforeOpenEventHandler"
         :pivotY="0.1" ref="modal">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" type="button" @click="closeEventHandler"> <span>×</span></button>
        <h4 id="myModalLabel" class="modal-title">Новый клиента</h4>
      </div>
      <client-form
                   @complete="clientFormComplete"
                   @save="clientFormSave"
                   @findByMsisdn="clientFormFindByMsisdn"
                   :client="client"
                   :mod="mod">

      </client-form>
    </div>
  </modal>
</template>

<script>
  import ClientForm from './ClientForm.vue'
  import appState from './../dash/appointment/AppointmentState'
  import clientService from './../../service/ClientService'

  export default {
    data () {
      return {
        state: null,
        params: null,
        client: null
      }
    },
    methods: {
      beforeOpenEventHandler (event) {
        this.mod = appState.MOD.EDIT
        this.params = event.params
        this.client = clientService.getEmpty()
      },
      clientFormFindByMsisdn: function () {
        clientService.findByMsisdn(this.client.msisdn, client => { this.client = client }, this.errorResponse)
      },
      clientFormSave: function () {
        clientService.save(this.client, this.setClient, this.errorResponse)
      },
      clientFormComplete: function () {
        this.$modal.hide('client-modal')
      },
      errorResponse (err) {
        console.log(err)
      }
    },
    components: {
      'client-form': ClientForm
    }
  }
</script>
