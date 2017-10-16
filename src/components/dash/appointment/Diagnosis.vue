<template>
  <div>
    <div class="modal-body">
      <info-panel :office="office" :dateTime="appointment.dateTime" :person="person"></info-panel>
      <form class="form-horizontal" id="diagnosisForm">

        <div class="form-group">
          <label class="col-sm-3 control-label">Заметка:</label>

          <div class="col-sm-9">
            <textarea class="form-control" rows="4" v-model="description"></textarea>
          </div>
        </div>
        <div style="height: 300px; overflow-y: scroll;">
          <div style="padding: 5px" v-for="diagnosis in diagnoses">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <strong><i class="fa fa-calendar icon20"></i>{{ diagnosis.created.format('DD/MM/YYYY') }} &nbsp;&nbsp;<i class="fa fa-clock-o icon20"></i>{{ diagnosis.created.format('HH:mm') }} </strong><br>{{ diagnosis.description }}</div>
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

  export default {
    props: ['appointment', 'office', 'client', 'diagnoses', 'person'],
    data () {
      return {
        description: null
      }
    },
    methods: {
      save () {
        console.log(this.person)
//        this.$emit('save', this.description)
      }
    },
    components: {
      'info-panel': InfoPanel
    }
  }
</script>
