<template>
  <!--<div>User  $route.params.id </div>-->
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        Пользовательские настройки
      </h1>
      <ol class="breadcrumb">
        <li class="active">Пользовательские настройки</li>
      </ol>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-md-3">
          <div class="box box-primary">
            <div class="box-body box-profile">
              <img class="profile-user-img img-responsive img-circle" alt="User profile picture" :src="userAvatar">
              <h3 class="profile-username text-center"><strong>Имя:</strong> {{ user.name }}</h3>
              <p class="text-muted text-center"><strong>Логин:</strong> {{ user.username }}</p>
              <p class="text-muted text-center"><strong>Email:</strong> {{ user.email }}</p>
              <p class="text-muted text-center"><strong>Группы:</strong> <span v-for="group in groups">{{group.name}} </span></p>
              <ul class="list-group list-group-unbordered">


              </ul>
              <div class="text-center">
                <button class="btn btn-default" type="button" @click="changeEmail"><span>Сменить </span><i class="fa fa-envelope"></i></button>
                <button class="btn btn-adn" type="button" @click="changePassword"><span>Сменить </span> <i class="fa fa-lock"></i></button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <user-modal></user-modal>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import UserModal from './Modal'
  import USER_CONST from './UserConst'

  export default {
    data () {
      return {
        avatarPath: '/static/img/avatar/'
      }
    },
    methods: {
      errorResponse (err) {
        console.log(err)
      },
      changeEmail () {
        this.$modal.show('user-modal', {title: 'Изменить Emil', mod: USER_CONST.ACTION.CHANGE_EMAIL, user: this.user})
      },
      changePassword () {
        this.$modal.show('user-modal', {title: 'Смена пароля', mod: USER_CONST.ACTION.CHANGE_PASSWORD, user: this.user})
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser',
        groups: 'user/getGroups'
      }),
      userAvatar () {
        return this.avatarPath + 'user.png'
      }
    },
    components: {
      'user-modal': UserModal
    }
  }
</script>
