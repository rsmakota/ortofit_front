<template>
  <modal name="user-modal" draggable=".modal-header" height="auto"
         @before-open="beforeOpenEventHandler"
         :pivotY="0.1" ref="modal">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" type="button" @click="closeEvent"> <span>×</span></button>
        <h4 id="myModalLabel" class="modal-title">{{ title }}</h4>
      </div>
      <user-form-password v-if="(mod === USER_CONST.ACTION.CHANGE_PASSWORD)"
                   @close="closeEventHandler"
                   @save="savePassword"
                   @input="cleanError"
                   :mod="mod"
                   :error="error"
      >
      </user-form-password>

      <user-form-email v-if="(mod === USER_CONST.ACTION.CHANGE_EMAIL)"
                  @save="saveEmail"
                  @close="closeEventHandler"
                  :error="error"
                  :email="user.email"
      >
      </user-form-email>
    </div>
  </modal>
</template>

<script>
  // import { bus } from './../event/bus'
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
        USER_CONST: USER_CONST,
        error: null
      }
    },
    methods: {
      beforeOpenEventHandler (event) {
        this.params = event.params
        this.mod = this.params.mod
        this.title = this.params.title
        this.user = this.params.user
        this.error = null
      },
      savePassword (data) {
        // console.log('Data', password)
        userService.changePassword({ id: this.user.id, password: data.password, passwordConfirmation: data.passwordConfirmation }, this.closeEventHandler, this.errorResponse)
      },
      saveEmail (data) {
        userService.changeEmail({id: this.user.id, email: data.email}, this.closeEventHandler, this.errorResponse)
      },
      errorResponse (err) {
        console.log(err)
      },
      closeEventHandler (response) {
        if (response.success) {
          this.$modal.hide('user-modal')
          this.error = null
          return
        }
        this.error = response.message
      },
      closeEvent () {
        this.$modal.hide('user-modal')
      },
      cleanError () {
        this.error = null
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
