<template>
  <modal name="appointment-modal" draggable=".modal-header" height="auto" @before-open="beforeOpen">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" @click="$modal.hide('appointment-modal')"> <span>×</span></button>
          <h4 id="myModalLabel" class="modal-title">{{title}}</h4>
        </div>
        <new-form v-if="state === 'new'" v-bind:params="params"></new-form>
      </div>

  </modal>
</template>

<script>
  import New from './CreateForm'

  export default {
    data () {
      return {
        title: null,
        state: null,
        params: null
      }
    },
    methods: {
      beforeOpen (event) {
        this.title = event.params.title
        this.params = event.params
        this.state = event.params.state
//        console.log(New.methods.setDoctorId(12))
//        New.$set('params', this.params)
      }
    },
    components: {
      'new-form': New
    }
  }
</script>
