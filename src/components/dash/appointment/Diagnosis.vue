<template>
  <div>
    <div class="modal-body">
      <info-panel :office="office" :dateTime="appointment.dateTime" :person="person"></info-panel>
      <form class="form-horizontal" id="diagnosisForm">

        <div class="form-group">
          <label class="col-sm-3 control-label">Диагноз(Заметка):</label>

          <div class="col-sm-9">
            <textarea class="form-control" rows="4" v-model="description"></textarea>
          </div>
        </div>
        <div style="height: 300px; overflow-y: scroll;">
          <div style="padding: 5px" v-for="diagnosis in diagnoses">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <strong><i class="fa fa-calendar icon20"></i>{{ toDate(diagnosis.created) }} &nbsp;&nbsp;<i class="fa fa-clock-o icon20"></i>{{ toTime(diagnosis.created) }} </strong><br>{{ diagnosis.description }}</div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" @click="save">Далее</button>
    </div>
  </div>
</template>

<script>
  import InfoPanel from './InfoPanel'
  import moment from 'moment'

  export default {
    props: ['appointment', 'office', 'client', 'diagnoses', 'person'],
    data () {
      return {
        description: null
      }
    },
    methods: {
      save () {
        let diagnosis = null
        if (this.description !== null) {
          diagnosis = {personId: this.person.id, description: this.description}
        }
        this.$emit('save', diagnosis)
      },
      toDate (timestamp) {
        return moment(timestamp).format('DD/MM/YYYY')
      },
      toTime (timestamp) {
        return moment(timestamp).format('HH:mm')
      }
    },
    components: {
      'info-panel': InfoPanel
    }
  }
</script>
