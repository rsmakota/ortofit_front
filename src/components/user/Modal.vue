<template>
  <modal name="user-modal" draggable=".modal-header" height="auto"
         @before-open="beforeOpenEventHandler"
         :pivotY="0.1" ref="modal">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" type="button" @click="closeEventHandler"> <span>×</span></button>
        <h4 id="myModalLabel" class="modal-title">{{ title }}</h4>
      </div>
      <user-form-password v-if="(mod === USER_CONST.ACTION.CHANGE_PASSWORD)"
                   @close="clientFormComplete"
                   @save="savePassword"
                   :user="user"
                   :mod="mod">

      </user-form-password>
      <user-form-email v-if="(mod === USER_CONST.ACTION.CHANGE_EMAIL)"
                  :user="user"
                  @save="saveEmail"
                  @close="clientFormComplete"
                  :mod="mod">
      </user-form-email>
    </div>
  </modal>
</template>

<script>
  import { bus } from './../event/bus'
  import userService from './../../service/UserService'
  import ChangeEmailForm from './ChangeEmailForm'
  import ChangePasswordForm from './ChangePasswordForm'
  import USER_CONST from './UserConst'

  export default {
    data () {
      return {
        state: null,
        params: null,
        user: null,
        mod: null,
        title: '',
        USER_CONST: USER_CONST
      }
    },
    methods: {
      beforeOpenEventHandler (event) {
        this.params = event.params
        this.mod = this.params.mod
        this.title = this.params.title
        this.user = this.params.user
      },
      savePassword (data) {
        userService.changePassword(data, this.closeEventHandler, this.errorResponse)
      },
      saveEmail (data) {
        userService.changeEmail(data, this.closeEventHandler, this.errorResponse)
      },
      errorResponse (err) {
        console.log(err)
      },
      closeEventHandler () {
        bus.$emit('user-modal-close')
        this.$emit('close')
        this.$modal.hide('user-modal')
      }
    },
    components: {
      'user-form-password': ChangePasswordForm,
      'user-form-email': ChangeEmailForm
    },
    computed: {
      //
    }
  }
</script>
