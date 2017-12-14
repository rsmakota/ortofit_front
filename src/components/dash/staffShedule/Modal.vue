<template>
  <modal name="staff-schedule-modal" draggable=".modal-header" height="auto"
         @before-open="beforeOpenEventHandler"
         :pivotY="0.1" ref="modal">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" type="button" @click="closeEventHandler"> <span>×</span></button>
        <h4 id="myModalLabel" class="modal-title">{{ title }}</h4>
      </div>
      <schedule-form
                   :schedule="schedule"
                   :mod="mod"
                   :doctors="doctors"
                   @save="saveSchedule"
                   >
      </schedule-form>
    </div>
  </modal>
</template>

<script>
  import ScheduleForm from './ScheduleForm'
  import staffScheduleService from './../../../service/StaffScheduleService'
  import STAFF_SCH_CONST from './../../../const/staffScheduleConst'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        state: null,
        params: null,
        schedule: null,
        mod: null,
        title: ''
      }
    },
    methods: {
      beforeOpenEventHandler (event) {
        this.params = event.params
        this.title = this.params.title
        this.mod = this.params.mod
        if (this.mod === STAFF_SCH_CONST.MOD.NEW) {
          this.schedule = staffScheduleService.getEmpty()
          this.schedule.officeId = this.params.officeId
          this.schedule.userId = (('doctorId' in this.params) && this.params.doctorId !== 'all') ? this.params.doctorId : null
          this.schedule.startDate = this.params.dateTime
          this.schedule.endDate = this.params.dateTime.clone().add(1, 'hours')
          return
        }
        this.schedule = staffScheduleService.find(this.params.id)
      },
      saveSchedule () {
        staffScheduleService.save(this.schedule, this.closeEventHandler, this.errorResponse)
      },
      clientFormComplete () {
        this.$modal.hide('client-modal')
      },
      errorResponse (err) {
        console.log(err)
      },
      closeEventHandler () {
        this.$emit('close')
        this.$modal.hide('staff-schedule-modal')
      }
    },
    components: {
      'schedule-form': ScheduleForm
    },
    computed: {
      ...mapGetters({
        doctors: 'doctor/getAll'
      })
    }
  }
</script>
