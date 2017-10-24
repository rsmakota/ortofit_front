<template>
  <div>
    <div class="modal-body">
      <info-panel :office="office" :person="person" :dateTime="appointment.dateTime"></info-panel>
      <form class="form-horizontal">
        <table class="table table-striped" align="center" style="width:80%">
          <thead><tr> <th>Размер</th> <th>Тип</th></tr></thead>

          <tbody>
          <tr v-for="insole in preparedInsoles">
            <td v-bind:class="{'danger': insoleErr && (!insole.size)}">
              <input type="number" placeholder="размер" class="form-control insole-size" title="Размер" min="15" max="60" size="5" v-model="insole.size" >
            </td>
            <td v-bind:class="{'danger': insoleErr && (!insole.typeId)}">
              <select class="form-control insole-type" title="Тип" v-model="insole.typeId">
                <option value="null" disabled>Выберите тип</option>
                <option v-for="insoleType in insoleTypes" v-bind:value="insoleType.id">{{ insoleType.name }}</option>
              </select>
            </td>
          </tr>
          </tbody>
        </table>

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
    props: ['appointment', 'office', 'person', 'personService', 'insoleTypes', 'preparedInsoles'],
    data () {
      return {
        insoleErr: false
      }
    },
    methods: {
      sanitize () {
        this.insoleErr = false
        this.preparedInsoles.forEach(insole => {
          if (!insole.size || !insole.typeId) {
            this.insoleErr = true
          }
        })
        return !this.insoleErr
      },
      save () {
        if (!this.sanitize()) {
          return
        }
        this.$emit('save')
      }
    },
    components: {
      'info-panel': InfoPanel
    }
  }
</script>
