<template>
  <section class="sidebar">

    <!-- Sidebar Menu -->
    <ul class="sidebar-menu">
      <!--<li class="header">TOOLS</li>-->
      <li class="treeview" id="appointments" :class="{'active': (activeMenu == 'Schedule')}">
        <a href="javascript:void(0);" @click="openCloseMenu('Schedule')">
          <i class="fa fa-calendar"></i> <span>График приема</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>

        <ul class="treeview-menu" id="doctorList" >
          <li v-for="(doctor, index) in doctors" :class="{'active': (activeDoctorId == doctor.id)}">
            <a href="javascript:void(0);" @click="clickDoctor(doctor.id)"><i class="fa fa-user-md"></i> <span>{{ doctor.name }}</span></a>
          </li>
          <li v-bind:class="{'active': (activeDoctorId == null)}">
            <a href="javascript:void(0);"  @click="clickDoctor(null)">
            <i class="fa fa-hospital-o"></i> Все </a>
          </li>
        </ul>

      </li>


      <li class="pageLink" :class="{'active': (currentRoutName === 'ClientList')}">
        <router-link to="/client_list"><i class="fa fa-credit-card"></i><span class="page">Клиенты</span></router-link>
      </li>


      <li class="treeview" id="schedule" :class="{'active': (activeMenu === 'StaffSchedule')}">
        <a href="javascript:void(0);" @click="openCloseMenu('StaffSchedule')" >
          <i class="fa fa-calendar-check-o"></i> <span>График работы</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu" id="doctorsScheduleList">
          <li v-for="doctor in doctors" :class="{'active': ((currentRoutName === 'StaffSchedule') && ($route.params.doctorId === doctor.id))}">
            <router-link :to="{ name: 'StaffSchedule', params:{doctorId: doctor.id}}"><i class="fa fa-user-md"></i> <span>{{ doctor.name }}</span></router-link>
          </li>
          <li :class="{'active': ((currentRoutName === 'StaffSchedule') && ($route.params.doctorId === 'all'))}">
            <router-link :to="{ name: 'StaffSchedule', params:{doctorId: 'all'} }">
              <i class="fa fa-user-md"></i> Все </router-link>
          </li>
        </ul>
      </li>

      <li class="treeview" :class="{'active': (currentRoutName === 'Chart')}">
        <router-link :to="{ name: 'Chart'}">
          <i class="fa fa-bar-chart"></i> <span>Показатели</span>
        </router-link>
      </li>

      <li class="treeview" :class="{'active': (currentRoutName === 'ActiveRemind')}">
        <router-link :to="{ name: 'ActiveRemind'}">
          <i class="fa fa-bell-o"></i> <span>Активные напоминания</span>
        </router-link>
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
        activeMenu: null,
        activeDoctorId: null
      }
    },
    methods: {
      clickDoctor (doctorId) {
        this.activeDoctorId = doctorId
        if (this.currentRoutName === 'Schedule') {
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
      }),
      currentRoutName: function () {
        return this.$route.name
      }
    },
    mounted () {
      this.activeMenu = this.currentRoutName
    }
  }
</script>

