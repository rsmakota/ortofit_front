<template>
  <div>
    <div class="modal-body">
      <info-panel :office="office" :client="client" :dateTime="appointment.dateTime"></info-panel>
      <table class="table table-striped">
        <tbody>
        <tr>
          <td>Самому клиенту</td> <td><i class="fa fa-credit-card"></i></td>
          <td>{{ client.name }}</td>
          <td>
            <button type="button" class="btn btn-success" @click="chooseClient"><i class="fa fa-arrow-right"></i></button>
          </td>
        </tr>

        <tr v-for="person in persons" v-if="person.isClient == false">
          <td>{{ person.familyStatus.name }}</td>
          <td><i class="fa fa-users"></i></td><td>{{ person.name }}</td>
          <td>
            <button type="button" class="btn btn-success personButton" @click="choosePerson(person)">
              <i class="fa fa-arrow-right"></i></button>
          </td>
        </tr>

        <tr>
          <td>Новому члену семьи</td><td><i class="fa fa-user-plus"></i></td>
          <td>Когда нет в списке выше</td>
          <td>
            <button type="button" class="btn btn-success" @click="newPerson(false)"><i class="fa fa-user-plus"></i></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal-footer">

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
      chooseClient () {
        let person = this.persons.find(p => p.isClient === true)
        console.log(person)
        if (person !== undefined) {
          this.choosePerson(person)
          return
        }
        this.newPerson(true)
      },
      newPerson (isClient) {
        this.$emit('new', isClient)
      },
      choosePerson (person) {
        this.$emit('choose', person)
      }
    },
    components: {
      InfoPanel,
      'info-panel': InfoPanel
    }
  }
</script>
