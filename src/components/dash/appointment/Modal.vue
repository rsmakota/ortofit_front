<template>
  <modal name="appointment-modal" draggable=".modal-header" height="auto" @before-open="beforeOpen" :pivotY="0.1" ref="modal">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" @click="close"> <span>×</span></button>
          <h4 id="myModalLabel" class="modal-title">{{title}}</h4>
        </div>
        <client-form v-if="(state === 'new')" ref="client" v-on:complete="clientReceived"></client-form>
        <new-form v-if="(state === 'app')" v-bind:params="params" ref="new"></new-form>
        <view-form v-if="state === 'view'" v-bind:params="params" ref="view"></view-form>

      </div>

  </modal>
</template>

<script>
  import ClientForm from './../../client/ClientForm.vue'
  import New from './CreateForm'
  import View from './View.vue'
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
      },
      clientReceived: function (client) {
        this.state = 'app'
        this.params.client = client
      }
    },
    components: {
      'new-form': New,
      'view-form': View,
      'client-form': ClientForm
    },
    mounted () {
      bus.$on('appointment-modal-close', this.close)
//      bus.$on('client-received', this.clientReceived)
    }
  }
</script>
