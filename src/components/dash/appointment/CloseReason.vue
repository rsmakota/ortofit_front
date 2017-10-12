<template>
  <div>
    <div class="modal-body">
      <form class="form-horizontal" id="reasonForm">
        <table class="table table-striped">

          <tr v-for="reason in reasons">
            <td class="col-sm-2">&nbsp;</td>
            <td>
              <label class="radio">
                <input type="radio" id="reasonId" v-model="reasonId" value="reason.id"/> {{ reason.name }}
              </label>
            </td>
          </tr>
        </table>
      </form>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-success" @click="btnSave" :disabled="(reasonId == null)">Сохранить</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['reasons'],
    data () {
      return {
        reasonId: null
      }
    },
    methods: {
      btnSave: function () {
        this.$emit('submit', this.reasonId)
      }
    }
  }
</script>
