import Vue from 'vue'
import Router from 'vue-router'
import Dash from '@/components/Dash'
import Login from '@/components/Login'
import Schedule from '@/components/dash/Schedule'
import ClientList from '@/components/dash/ClientList'
import ClientView from '@/components/client/ClientView'
import StaffSchedule from './../components/dash/staffShedule/StaffSchedule.vue'
import Chart from './../components/dash/chart/Chart'
import ActiveRemind from './../components/dash/activeRemind/ActiveRemind'
import store from '../store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Dash',
      component: Dash,
      children: [
        {
          path: '',
          component: Schedule,
          name: 'Schedule',
          props: true
        },
        {
          path: '/client_list',
          component: ClientList,
          name: 'ClientList'
        },
        {
          path: '/client/:id',
          component: ClientView,
          name: 'ClientView'
        },
        {
          path: '/staff_schedule/:doctorId',
          component: StaffSchedule,
          name: 'StaffSchedule'
        },
        {
          path: '/charts',
          component: Chart,
          name: 'Chart'
        },
        {
          path: '/active_reminds',
          component: ActiveRemind,
          name: 'ActiveRemind'
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.auth.authenticated && (to.path !== '/login')) {
    next('login')
  }
  console.log(next)
  next()
})

export default router
