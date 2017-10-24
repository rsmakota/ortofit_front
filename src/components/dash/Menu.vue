<template>
  <section class="sidebar">

    <!-- Sidebar Menu -->
    <ul class="sidebar-menu">
      <!--<li class="header">TOOLS</li>-->
      <li class="treeview" id="appointments" v-bind:class="{'active': (activeMenu == 'doctorList')}">
        <a href="#" v-on:click="openCloseMenu('doctorList')">
          <i class="fa fa-calendar"></i> <span>График приема</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>

        <ul class="treeview-menu" id="doctorList" >
          <li v-for="(doctor, index) in doctors" v-bind:class="{'active': (activeDoctorId == doctor.id)}" v-bind="doctors">
            <a href="javascript:void(0);" v-on:click="clickDoctor(doctor.id)"><i class="fa fa-user-md"></i> <span>{{ doctor.name }}</span></a>
          </li>
          <li v-bind:class="{'active': (activeDoctorId == null)}">
            <a href="javascript:void(0);"  v-on:click="clickDoctor(null)">
            <i class="fa fa-hospital-o"></i> Все </a>
          </li>
        </ul>
      </li>


      <li class="pageLink" v-bind:class="{'active': (activeMenu == 'clientList')}" v-on:click="openCloseMenu('clientList')">
        <router-link to="/client_list" ><i class="fa fa-credit-card"></i><span class="page">Клиенты</span></router-link>
      </li>

      <!--<li class="header">ME</li>-->
      <!--<li class="pageLink" v-on:click="toggleMenu"><router-link to="/tasks"><i class="fa fa-tasks"></i><span class="page">Tasks</span></router-link></li>-->
      <!--<li class="pageLink" v-on:click="toggleMenu"><router-link to="/setting"><i class="fa fa-cog"></i><span class="page">Settings</span></router-link></li>-->

      <!--<li class="header">LOGS</li>-->
      <!--<li class="pageLink" v-on:click="toggleMenu"><router-link to="/access"><i class="fa fa-book"></i><span class="page">Access</span></router-link></li>-->
      <!--<li class="pageLink" v-on:click="toggleMenu"><router-link to="/server"><i class="fa fa-hdd-o"></i><span class="page">Server</span></router-link></li>-->
      <!--<li class="pageLink" v-on:click="toggleMenu"><router-link to="/repos"><i class="fa fa-heart"></i><span class="page">Repos</span><small class="label pull-right bg-green">AJAX</small></router-link></li>-->

      <!--<li class="header">PAGES</li>-->
      <!--<li class="pageLink" v-on:click="toggleMenu"><router-link to="/login"><i class="fa fa-circle-o text-yellow"></i> <span class="page">Login</span></router-link></li>-->
      <!--<li class="pageLink" v-on:click="toggleMenu"><router-link to="/404"><i class="fa fa-circle-o text-red"></i> <span class="page">404</span></router-link></li>-->
    </ul>
    <!-- /.sidebar-menu -->
  </section>
</template>

<script>
  import { bus } from './../event/bus'
  import { mapGetters } from 'vuex'

  export default {
    name: 'MainMenu',
    data () {
      return {
        doctorsTree: false,
        activeMenu: 'doctorList',
        activeDoctorId: null
      }
    },
    methods: {
      clickDoctor: function (doctorId, event) {
        let currentRouteName = this.$router.history.current.name
        this.activeDoctorId = doctorId
        if (currentRouteName === 'Schedule') {
          bus.$emit('menu-click-doctor-event', doctorId)
        } else {
          this.$router.push({name: 'Schedule', append: true, params: {doctorId: doctorId}})
        }
      },
      openCloseMenu: function (menuId) {
        if (this.activeMenu === menuId) {
          this.activeMenu = ' '
        } else {
          this.activeMenu = menuId
        }
      }
    },
    computed: {
      ...mapGetters({
        doctors: 'doctor/getAll'
      })
    }
  }
</script>

