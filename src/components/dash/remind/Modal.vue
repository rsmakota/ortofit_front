<template>
  <modal name="remind-modal" draggable=".modal-header" height="auto"
         @before-open="beforeOpenEventHandler"
         :pivotY="0.1" ref="modal">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" type="button" @click="closeEventHandler"> <span>×</span></button>
        <h4 id="myModalLabel" class="modal-title">{{ title }}</h4>
      </div>
      <remind-form
        :remindReport="remindReport"
        :office="office"
        :doctor="doctor"
        @close="closeEventHandler"
      >
      </remind-form>
    </div>
  </modal>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RemindForm from './RemindForm'

  export default {
    data () {
      return {
        state: null,
        remindReport: null,
        params: null,
        office: null,
        doctor: null,
        mod: null,
        title: ''
      }
    },
    methods: {
      beforeOpenEventHandler (event) {
        this.params = event.params
        this.mod = this.params.mod
        this.remindReport = this.params.remindReport
        this.title = this.params.title
        this.doctor = this.getDoctorById(this.remindReport.doctorId)
        this.office = this.getOfficeById(this.remindReport.officeId)
      },
      errorResponse (err) {
        console.log(err)
      },
      closeEventHandler () {
        this.$emit('close')
        this.$modal.hide('remind-modal')
      }
    },
    components: {
      RemindForm,
      'remind-form': RemindForm
    },
    computed: {
      ...mapGetters({
        getOfficeById: 'office/getOfficeById',
        getDoctorById: 'doctor/getDoctorById'
      })
    }
  }
</script>
