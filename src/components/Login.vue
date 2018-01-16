<template>
  <!--<form v-on:submit.prevent="login()">-->
    <!--<input v-model="username" type="text" placeholder="Username" class="" /><br>-->
    <!--<input v-model="password" type="password" placeholder="Password" class="" /><br>-->
    <!--<button type="submit" class="">Login</button>-->
  <!--</form>-->
  <div class="container container-table">
  <div class="login-box">
    <div class="login-logo">
      <a href=""><b>Office</b>Ortofit</a>
    </div><!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>
      <form v-on:submit.prevent="login()">
        <div class="form-group has-feedback">
          <input v-model="username" class="form-control" placeholder="Login">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" v-model="password" class="form-control" placeholder="Password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
              <label>
                <input type="checkbox"> Remember Me
              </label>
            </div>
          </div><!-- /.col -->
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
          </div><!-- /.col -->
        </div>
      </form>

      <div class="text-center">
        <!--{% if error %}-->
        <div class="text-danger" v-if="error">
          Ошибка авторизации
        </div>
        <!--{% endif %}-->
      </div>

      <a href="#">I forgot my password</a><br>
      <a href="#" class="text-center">Register a new membership</a>

    </div><!-- /.login-box-body -->
  </div><!-- /.login-box -->
  </div>
</template>

<script>
//  import JWT from 'jwt-decode'
  import AppProps from '../property'

  export default {
    name: 'Login',
    data () {
      return {
        username: (process.env.NODE_ENV === 'production') ? null : 'j_rodion',
        password: (process.env.NODE_ENV === 'production') ? null : '123456',
        error: false
      }
    },
    methods: {
      login () {
        this.$http.post(AppProps.getOauthTokenUrl(),
          {
            grant_type: 'password',
            username: this.username,
            password: this.password
          },
          AppProps.auth.requestProps).then(
          response => {
            if (response.ok) {
              this.$store.commit('login', {
                authenticated: true,
                token: response.body.access_token
              })
              this.$router.replace('/')
            }
          },
          response => {
            this.error = true
          })
      }
    }
  }
</script>
