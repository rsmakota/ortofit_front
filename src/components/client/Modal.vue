<template>
  <modal name="client-modal" draggable=".modal-header" height="auto"
         @before-open="beforeOpenEventHandler"
         :pivotY="0.1" ref="modal">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" type="button" @click="closeEventHandler"> <span>×</span></button>
        <h4 id="myModalLabel" class="modal-title">{{ title }}</h4>
      </div>
      <client-form v-if="isClientForm"
                   @complete="clientFormComplete"
                   @save="clientFormSave"
                   @findByMsisdn="clientFormFindByMsisdn"
                   :client="client"
                   :mod="mod">

      </client-form>
      <client-form-overview v-if="isClientOverviewForm"
                  :client="client"
                  :persons="persons"
                  :appReports="appReports"
                  @close="clientFormComplete"
                  :mod="mod"
      >

      </client-form-overview>
    </div>
  </modal>
</template>

<script>
  import ClientForm from './ClientForm.vue'
  import clientService from './../../service/ClientService'
  import ClientFormOverview from './ClientOverviewForm'
  import appReportService from './../../service/AppointmentReportService'
  import personService from './../../service/PersonService'
  import clientConst from './ClientConst'

  export default {
    data () {
      return {
        state: null,
        params: null,
        client: null,
        persons: [],
        appReports: [],
        mod: null,
        title: ''
      }
    },
    methods: {
      beforeOpenEventHandler (event) {
        this.params = event.params
        this.mod = this.params.mod
        this.title = this.params.title
        this.client = clientService.getEmpty()
        if (this.params.client) {
          this.client = this.params.client
        }
        if (this.params.clientId) {
          clientService.findById(this.params.clientId, client => { this.client = client }, this.errorHandler)
          appReportService.findByClientId(this.params.clientId, reports => { this.appReports = reports }, this.errorHandler)
          personService.findAllByClientId(this.params.clientId, persons => { this.persons = persons }, this.errorHandler)
        }
      },
      clientFormFindByMsisdn: function () {
        clientService.findByMsisdn(this.client.msisdn, client => { this.client = client }, this.errorResponse)
      },
      clientFormSave: function () {
        clientService.save(this.client, this.closeEventHandler, this.errorResponse)
      },
      clientFormComplete: function () {
        this.$modal.hide('client-modal')
      },
      errorResponse (err) {
        console.log(err)
      },
      closeEventHandler () {
        this.$emit('close')
        this.$modal.hide('client-modal')
      }
    },
    components: {
      'client-form': ClientForm,
      'client-form-overview': ClientFormOverview
    },
    computed: {
      isClientForm: function () {
        return (this.mod !== clientConst.FORM.MOD.OVERVIEW)
      },
      isClientOverviewForm: function () {
        return (this.mod === clientConst.FORM.MOD.OVERVIEW)
      }
    }
  }
</script>
