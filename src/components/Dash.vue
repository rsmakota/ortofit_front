<template>
  <div class="wrapper">
    <header class="main-header">
      <a href="/" class="logo">
        <!-- mini logo for sidebar mini 40x50 pixels -->
        <span class="logo-mini"><img src="/static/img/logo_sm.png" alt="Logo" class="img-responsive center-block"></span>
        <!-- logo for regular state and mobile devices -->
        <div class="container logo-lg">
          <div class="pull-left image"><img src="/static/img/logo_sm.png" alt="Logo" class="img-responsive"></div>
          <div class="pull-left info">CoPilot</div>
        </div>
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
                <span class="label label-success"> </span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have message(s)</li>

                <li class="footer"><a href="javascript:;">See All Messages</a></li>
              </ul>
            </li>
            <!-- /.messages-menu -->

            <!-- Notifications Menu -->
            <li class="dropdown notifications-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-bell-o"></i>
                <span class="label label-warning"></span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have notification(s)</li>

                <li class="footer"><a href="javascript:;">View all</a></li>
              </ul>
            </li>

            <!-- Tasks Menu -->
            <li class="dropdown tasks-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-flag-o"></i>
                <span class="label label-danger"> </span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have  task(s)</li>

              </ul>
            </li>

          </ul>
        </div>
      </nav>
    </header>

    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <div class="user-panel">
        <button class="btn btn-block btn-success" id="appButton" v-on:click="appointmentModalShow">
          <i class="fa fa-fw fa-calendar-plus-o"></i> <span>Запись</span>
        </button>
      </div>
      <!-- sidebar: style can be found in sidebar.less -->
      <main-menu></main-menu>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          <!--{{$route.name.toUpperCase() }}-->
          <!--<small>{{ $route.meta.description }}</small>-->
        </h1>
        <ol class="breadcrumb">
          <li><a href="javascript:;"><i class="fa fa-home"></i>Home</a></li>
          <!--<li class="active">{{$route.name.toUpperCase() }}</li>-->
        </ol>
      </section>

      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->


    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; <a href="javascript:;">Ortofit</a>.</strong> All rights reserved.
    </footer>

    <appointment-modal></appointment-modal>
  </div>
</template>

<script>
  import MainMenu from './dash/Menu.vue'
  import AppointmentModal from './dash/appointment/Modal'
  import moment from 'moment'

  export default {
    name: 'Dash',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      appointmentModalShow: function () {
        this.$modal.show('appointment-modal', {title: 'Запись на прием', state: 'new', time: moment()})
      }
    },
    components: {
      'main-menu': MainMenu,
      'appointment-modal': AppointmentModal
    },
    mounted () {
      this.$store.dispatch('loadData')
    }
  }
</script>

