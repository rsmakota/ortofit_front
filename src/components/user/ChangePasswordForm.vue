<template>
  <div>
    <div class="modal-body">
      <form class="form-horizontal">

        <div class="form-group">
          <label class="col-sm-3 control-label">Пароль:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-error': newPasswordErr}">
              <div class="input-group-addon">
                <i class="fa fa-lock icon20"> </i>
              </div>
              <input type="password" class="form-control" :disabled="isProcessed"
                     placeholder="Пароль" v-model="newPassword" @click="passwordClick"/>
            </div>
            <span class="help-block text-red" v-if="(newPasswordErr)">{{ newPasswordErrText }}</span>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-3 control-label">Повторно:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-error': passwordConfErr}">
              <div class="input-group-addon">
                <i class="fa fa-lock icon20"> </i>
              </div>
              <input type="password" class="form-control" :disabled="isProcessed"
                     placeholder="Пароль повторно" v-model="passwordConf" @click="passwordConfClick"/>
            </div>
            <span class="help-block text-red" v-if="passwordConfErr">{{ passwordConfErrText }}</span>
          </div>
        </div>
        <div class="form-group" v-if="(errorText)">
          <label class="col-sm-3 control-label">Server Err:</label>
          <div class="col-sm-9">
            <div class="input-group has-error">
              <div class="input-group-addon">
                <i class="fa fa-server icon20"> </i>
              </div>
              <div class="form-control" >{{errorText}}</div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click="btnSave" :disabled="isProcessed">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      error: {
        type: String,
        default: null
      },
      mod: {
        type: String
      }
    },
    data () {
      return {
        newPassword: null,
        passwordConf: null,
        newPasswordErr: false,
        newPasswordErrText: '',
        passwordConfErr: false,
        passwordConfErrText: '',
        isProcessed: false
      }
    },
    methods: {
      passwordClick () {
        this.newPasswordErr = false
        this.$emit('input')
      },
      passwordConfClick () {
        this.passwordConfErr = false
        this.$emit('input')
      },
      sanitize () {
        if (this.newPassword === null) {
          this.newPasswordErr = true
          this.newPasswordErrText = 'Пустой пароль недопустим'
          return false
        }
        if (this.newPassword.length < 6) {
          this.newPasswordErr = true
          this.newPasswordErrText = 'Пароль меньше 6 символов'
          return false
        }
        if (this.passwordConf !== this.newPassword) {
          this.passwordConfErr = true
          this.passwordConfErrText = 'Пароль и подтверждение не совпадают'
          return false
        }
        return true
      },
      btnSave () {
        if (!this.sanitize()) {
          return
        }
        this.isProcessed = true
        this.$emit('save', { password: this.newPassword, passwordConfirmation: this.passwordConf })
      }
    },
    computed: {
      errorText: function () {
        if (this.error === null) {
          return null
        }
        this.isProcessed = false
        this.newPassword = null
        this.passwordConf = null
        return this.error
      }
    }
  }
</script>
