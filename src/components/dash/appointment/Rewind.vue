<template>
  <div>
    <div class="modal-body">
      <div style="font-weight: bold; padding-top: 10px; text-align: center ">
        Визит был успешно оформлен! <br> Завершите оформнение или оформите еще одного члена семьи.
      </div>
    </div>

    <div class="modal-footer">
      <form class="form-horizontal">
        <button type="button" class="btn btn-info"    @click="rewind"><i class="fa fa-reply-all"></i> Оформить еще</button>
        <button type="button" class="btn btn-success" @click="finish"  >Завершить</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
//    props: ['appointment', 'office', 'person', 'service'],
    data () {
      return {}
    },
    methods: {
      finish () {
        this.$emit('finish')
      },
      rewind () {
        this.$emit('rewind')
      }
    }
  }
</script>
