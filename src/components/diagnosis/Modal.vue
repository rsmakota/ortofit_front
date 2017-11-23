<template>
  <modal name="diagnosis-modal" draggable=".modal-header" height="auto"
         @before-open="beforeOpenEventHandler"
         :pivotY="0.1" ref="modal">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" type="button" @click="closeEventHandler"> <span>×</span></button>
        <h4 id="myModalLabel" class="modal-title">{{ title }}</h4>
      </div>
      <diagnosis-form
        @complete="closeEventHandler"
        @save="diagnosisFormSave"
        :diagnosis="diagnosis"
        >

      </diagnosis-form>
    </div>
  </modal>
</template>

<script>
  import diagnosisService from '../../service/DiagnosisService'
  import DiagnosisForm from './DiagnosisForm'

  export default {
    data () {
      return {
        params: null,
        person: null,
        diagnosis: null,
        title: ''
      }
    },
    methods: {
      beforeOpenEventHandler (event) {
        this.params = event.params
        this.title = this.params.title
        this.person = this.params.person
        if (this.params.diagnosis) {
          this.diagnosis = this.params.diagnosis
        } else {
          this.diagnosis = diagnosisService.getEmpty(this.person.id)
        }
      },
      diagnosisFormSave () {
        diagnosisService.save(this.diagnosis, this.closeEventHandler, this.errorResponse)
      },
      errorResponse (err) {
        console.log(err)
      },
      closeEventHandler () {
        this.$modal.hide('diagnosis-modal')
        this.$emit('close')
      }
    },
    components: {
      'diagnosis-form': DiagnosisForm
    }
  }
</script>
