<template>
  <div>
    <div class="modal-body">
      <form class="form-horizontal" id="diagnosisForm">

        <div class="form-group">
          <label class="col-sm-3 control-label">Диагноз(Заметка):</label>

          <div class="col-sm-9">
            <textarea class="form-control" rows="4" v-model="diagnosis.description"></textarea>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" @click="save">Сохранить</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['diagnosis'],
    methods: {
      save () {
        this.$emit('save')
      }
    }
  }
</script>
