<template>
  <modal name="appointment-modal" draggable=".modal-header" height="auto" @before-open="beforeOpen" :pivotY="0.1" ref="modal">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" @click="close"> <span>×</span></button>
          <h4 id="myModalLabel" class="modal-title">{{title}}</h4>
        </div>
        <new-form v-if="state === 'new'" v-bind:params="params" ref="new"></new-form>
      </div>

  </modal>
</template>

<script>
  import New from './CreateForm'
  import { bus } from './../../event/bus'
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
      },
      close () {
        this.$modal.hide('appointment-modal')
      }
    },
    components: {
      'new-form': New
    },
    mounted () {
      bus.$on('appointment-modal-close', this.close)
    }
  }
</script>
