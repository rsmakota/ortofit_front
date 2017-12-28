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
        @delete="deleteHandler"
        @update="updateHandler"
      >
      </remind-form>
    </div>
  </modal>
</template>

<script>
  import { bus } from './../../event/bus'
  import { mapGetters } from 'vuex'
  import RemindForm from './RemindForm'
  import remindService from './../../../service/RemindService'

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
        bus.$emit('remind-modal-close')
        this.$emit('close')
        this.$modal.hide('remind-modal')
      },
      updateHandler (remind) {
        remindService.update(remind, this.closeEventHandler, this.errorHandler)
      },
      deleteHandler (remindId) {
        remindService.delete(remindId, this.closeEventHandler, this.errorHandler)
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
