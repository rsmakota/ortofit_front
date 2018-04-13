<template>
  <div class="wrapper">
    <header class="main-header">
      <!-- Logo -->
      <a href="javascript:;" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>O</b>ft</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>Office</b>Ortofit</span>
      </a>

      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Messages-->
            <li class="dropdown messages-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-envelope-o"></i>
                <span class="label label-success"></span>
              </a>
            </li>
            <!-- /.messages-menu -->

            <!-- Notifications Menu -->
            <li class="dropdown notifications-menu">

              <router-link :to="{name: 'Remind'}" class="dropdown-toggle">
                <i class="fa fa-bell-o"></i>
                <span class="label label-warning">{{ reminds }}</span>
              </router-link>
            </li>

            <!-- Tasks Menu -->
            <li class="dropdown tasks-menu">
                <router-link :to="{ name: 'Order'}" class="dropdown-toggle">
                <i class="fa fa-internet-explorer"></i>
                <span class="label label-danger">{{ orders }}</span>
                </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'UserInfo'}" class="dropdown-toggle"><i class="fa fa-gears"></i></router-link>
            </li>

            <li>
              &nbsp;&nbsp;&nbsp;
            </li>

            <li>
              <a href="#" @click="logout"><i class="fa fa-sign-out"></i></a>
            </li>

          </ul>
        </div>
      </nav>
    </header>

    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <div class="user-panel">
        <button class="btn btn-block btn-success" @click="appointmentModalShow">
          <i class="fa fa-fw fa-calendar-plus-o"></i> <span>Запись</span>
        </button>
      </div>
      <!-- sidebar: style can be found in sidebar.less -->
      <main-menu></main-menu>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->


      <router-view></router-view>

    <!-- /.content-wrapper -->


    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; <a href="http://ortofit.com.ua">Ortofit</a>.</strong> All rights reserved.
    </footer>

    <appointment-modal></appointment-modal>
    <remind-modal></remind-modal>
    <client-modal></client-modal>
  </div>
</template>

<script>
  import MainMenu from './dash/Menu.vue'
  import AppModal from './dash/appointment/Modal'
  import AppState from './dash/appointment/AppointmentConst'
  import RemindModal from './dash/remind/Modal'
  import moment from 'moment'
  import ClientModal from './client/Modal'
  import nitificationService from './../service/NotificationService'

  export default {
    name: 'Dash',
    data () {
      return {
        notifications: {reminds: null, orders: null},
        interval: null
      }
    },
    methods: {
      appointmentModalShow () {
        this.$modal.show('appointment-modal', {title: 'Запись на прием', state: AppState.FLOW.NEW, time: moment()})
      },
      errorHandler (err) {
        console.log(err)
      },
      loadNotifications () {
        nitificationService.findAll((response) => { this.notifications = response }, this.errorHandler)
      },
      todo () {
        this.loadNotifications()
        this.interval = setInterval(function () {
          this.loadNotifications()
        }.bind(this), 100000)
      },
      logout () {
        this.$store.commit('logout')
        this.$router.push({name: 'Login'})
      }
    },
    components: {
      RemindModal,
      'main-menu': MainMenu,
      'appointment-modal': AppModal,
      'remind-modal': RemindModal,
      'client-modal': ClientModal
    },
    computed: {
      reminds: function () {
        return (this.notifications.reminds === 0) ? '' : this.notifications.reminds
      },
      orders: function () {
        return (this.notifications.orders === 0) ? '' : this.notifications.orders
      }
    },
    mounted () {
      this.$store.dispatch('loadData')
      this.todo()
    }
  }
</script>

