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
  import clientService from './../../service/ClientService'
//  import clientConst from './ClientConst'

  export default {
    data () {
      return {
        state: null,
        params: null,
        client: null,
        mod: null
      }
    },
    methods: {
      beforeOpenEventHandler (event) {
        this.params = event.params
        this.mod = this.params.mod
        if (this.params.client) {
          this.client = this.params.client
        } else {
          this.client = clientService.getEmpty()
        }
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
      },
      closeEventHandler () {
        this.$modal.hide('client-modal')
      }
    },
    components: {
      'client-form': ClientForm
    }
  }
</script>
