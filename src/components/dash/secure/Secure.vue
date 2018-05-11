<template>
  <div class="content-wrapper" style="min-height: 846px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Управление пользователями
      </h1>
      <ol class="breadcrumb">
        <li><a href="javascript:;"><i class="fa fa-home"></i>Управление пользователями</a></li>
      </ol>
    </section>
    <!-- content -->
    <section class="invoice">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">

          </div>
        </div><!-- /.col -->
      </div><!-- /.row -->
      <div class="row">
        <div class="col-xs-10 table-responsive" style="display:table; height: 100%">
          <div v-if="reportsIsEmpty"><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>
          <table class="table table-striped" v-else>
            <thead><tr><th>#</th><th>Пользователь</th><th>Группы</th><th>Email</th><th>Пароль</th><th>Редактировать</th><th>Удалить</th></tr></thead>
            <tbody>
            <tr v-for="user in users">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>
                <span v-for="group in user.groups">{{ group.name }}</span>
              </td>
              <td>{{ user.email }}</td>
              <td><button class="btn btn-primary">Сменить</button></td>
              <td><button class="btn btn-file">Редактировать</button></td>
              <td><button class="btn btn-danger" @click="delUser(user.id)">Удалить</button></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section><!-- /.content -->

  </div>
</template>

<script>
  import userService from './../../../service/UserService'
  import groupService from './../../../service/GroupService'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        users: [],
        groups: []
      }
    },
    methods: {
      errorHandler (err) {
        console.log(err)
      },
      getAllUsers () {
        userService.getAll((users) => { this.users = users })
      },
      getAllGroups () {
        groupService.getAll((groups) => { this.groups = groups })
      },
      delUser (userId) {
        userService.del(userId, () => { this.getAllUsers() }, this.errorHandler)
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser'
      })
    },
    mounted () {
      this.getAllUsers()
    }
  }

</script>
