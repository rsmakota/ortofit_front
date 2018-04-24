<template>
  <div>
    <div class="modal-body">
      <form class="form-horizontal">

        <div class="form-group">
          <label class="col-sm-3 control-label">Email:</label>

          <div class="col-sm-9">
            <div class="input-group" v-bind:class="{'has-error': newEmailErr}">
              <div class="input-group-addon">
                <i class="fa fa-envelope-o icon20"> </i>
              </div>
              <input type="email" class="form-control" :disabled="isProcessed"
                     placeholder="Пароль" v-model="newEmail" @click="emailClick"/>
            </div>
            <span class="help-block text-red" v-if="(newEmailErr)">{{ newEmailErrText }}</span>
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
      email: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        newEmail: this.email,
        newEmailErr: false,
        newEmailErrText: '',
        isProcessed: false
      }
    },
    methods: {
      emailClick () {
        this.newEmailErr = false
        this.$emit('input')
      },
      sanitize () {
        if (this.newEmailErr === null) {
          this.newEmailErr = true
          this.newEmailErrText = 'Пустой email недопустим'
          return false
        }
        // let re = /^(([^<>()[].,;:\s@"]+(\.[^<>()[].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
        // if (!re.test(String(this.newEmailErr).toLowerCase())) {
        //   this.newEmailErr = true
        //   this.newEmailErrText = 'Такой email несуществует'
        //   return false
        // }
        return true
      },
      btnSave () {
        if (!this.sanitize()) {
          return
        }
        this.isProcessed = true
        this.$emit('save', { email: this.newEmail })
      }
    },
    computed: {
      errorText: function () {
        if (this.error === null) {
          return null
        }
        this.isProcessed = false
        this.newEmail = null
        this.passwordConf = null
        return this.error
      }
    }
  }
</script>
