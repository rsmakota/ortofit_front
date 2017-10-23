<template>
  <div>
    <div class="modal-body">
      <info-panel :office="office" :person="person" :dateTime="appointment.dateTime"></info-panel>
      <form class="form-horizontal" >
        <table class="table table-striped" align="center" style="width:80%">
          <thead>
          <tr>
            <th>Размер</th>
            <th>Тип</th>
          </tr>
          </thead>
          <tbody>

          <tr class="form-group" v-for="massage in preparedMassages" v-bind:class="{'danger': insoleErr}">
            <td>
              <input type="text" class="form-control insole-size" title="Размер" size="5" >
            </td>
            <td>
              <select class="form-control insole-type" title="Тип" v-model="massage">
                <option value="null" disabled>Выберите тип</option>
                <option v-for="massageType in massageTypes" v-bind:value="massageType.id">{{ massageType.name }}</option>
              </select>
            </td>
          </tr>
          </tbody>
        </table>

      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" :click="save">Далее</button>
    </div>
  </div>
</template>

<script>
  import InfoPanel from './InfoPanel'

  export default {
    props: ['appointment', 'office', 'person', 'preparedMassages', 'massageTypes'],
    data () {
      return {
        insoleErr: false
      }
    },
    methods: {
      sanitize () {
        //
      },
      save () {
        if (!this.sanitize()) {
          return
        }
      }
    },
    components: {
      'info-panel': InfoPanel
    }
  }
</script>
