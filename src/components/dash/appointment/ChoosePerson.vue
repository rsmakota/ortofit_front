<template>
  <div>
    <div class="modal-body">
      <info-panel :office="office" :client="client" :dateTime="appointment.dateTime"></info-panel>
      <table class="table table-striped">
        <tr>
          <td>Самому клиенту</td>
          <td><i class="fa fa-credit-card"></i></td>
          <td>{{ client.name }}</td>
          <td><button type="button" class="btn btn-success" id="clientButton"> <i class="fa  fa-arrow-right"></i> </button></td>
        </tr>

        <tr v-for="person in persons" v-if="person.isClient == false">
          <td>{{ person.familyStatus.name }}</td>
          <td>
            <i class="fa fa-users"></i>
          </td>
          <td>{{ person.name }}</td>
          <td><button type="button" class="btn btn-success personButton"> <i class="fa fa-arrow-right"></i> </button></td>

        </tr>

        <tr>
          <td>Новому члену семьи</td>
          <td><i class="fa fa-user-plus"></i></td>
          <td>Когда нет в списке выше</td>
          <td>
            <button type="button" class="btn btn-success"><i class="fa fa-user-plus"></i></button>
          </td>
        </tr>

      </table>
    </div>

  <div class="modal-footer">
    <!--<button type="button" class="btn btn-success" @click="btnSave" :disabled="(reasonId == null)">Дальше</button>-->
  </div>
  </div>
</template>

<script>
  import InfoPanel from './InfoPanel.vue'

  export default {
    props: ['appointment', 'office', 'client', 'persons'],
    data () {
      return {
//        reasonId: null
      }
    },
    methods: {
      //
    },
    components: {
      InfoPanel,
      'info-panel': InfoPanel
    }
  }
</script>
