<template>
  <section class="sidebar">

    <!-- Sidebar Menu -->
    <ul class="sidebar-menu">
      <!--<li class="header">TOOLS</li>-->
      <li class="treeview" id="appointments" v-bind:class="{'active': (activeMenu == 'doctorList')}">
        <a href="#" @click="openCloseMenu('doctorList')">
          <i class="fa fa-calendar"></i> <span>График приема</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>

        <ul class="treeview-menu" id="doctorList" >
          <li v-for="(doctor, index) in doctors" v-bind:class="{'active': (activeDoctorId == doctor.id)}" v-bind="doctors">
            <a href="javascript:void(0);" @click="clickDoctor(doctor.id)"><i class="fa fa-user-md"></i> <span>{{ doctor.name }}</span></a>
          </li>
          <li v-bind:class="{'active': (activeDoctorId == null)}">
            <a href="javascript:void(0);"  @click="clickDoctor(null)">
            <i class="fa fa-hospital-o"></i> Все </a>
          </li>
        </ul>

      </li>


      <li class="pageLink" v-bind:class="{'active': (activeMenu == 'clientList')}" v-on:click="openCloseMenu('clientList')">
        <router-link to="/client_list" ><i class="fa fa-credit-card"></i><span class="page">Клиенты</span></router-link>
      </li>
      <li class="treeview" id="schedule">
        <a href="javascript:void(0);">
          <i class="fa fa-calendar-check-o"></i> <span>График работы</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu" id="doctorsScheduleList">
          <li v-for="(doctor, index) in doctors" v-bind:class="{'active': (activeDoctorId == doctor.id)}">
            <a href="javascript:void(0);" @click="clickDoctor(doctor.id)"><i class="fa fa-user-md"></i> <span>{{ doctor.name }}</span></a>
          </li>
        </ul>
      </li>

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
      clickDoctor (doctorId, event) {
        let currentRouteName = this.$router.history.current.name
        this.activeDoctorId = doctorId
        if (currentRouteName === 'Schedule') {
          bus.$emit('menu-click-doctor-event', doctorId)
        } else {
          this.$router.push({name: 'Schedule', append: true, params: {doctorId: doctorId}})
        }
      },
      openCloseMenu (menuId) {
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

