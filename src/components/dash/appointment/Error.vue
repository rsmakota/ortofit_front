<template>
  <div>
    <div class="modal-body">
      <h1 style="font-weight: bold; padding-top: 10px; text-align: center; color: red">
        Произошла ошибка! <br>
        Оформление прервано.
      </h1>
    </div>

    <div class="modal-footer">
<br>
<br>
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
