<template>
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          График приема
        </h1>
        <ol class="breadcrumb">
          <li><a href="javascript:;"><i class="fa fa-home"></i>График приема</a></li>
          <!--<li class="active">{{$route.name.toUpperCase() }}</li>-->
        </ol>
      </section>
    <!-- content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <ul id="office_tabs" class="nav nav-tabs">
            <li v-for="(office, index) in offices" v-bind:class="{'active': (office.id == officeId)}">
              <a @click="setOfficeId(office.id)" class="office_link">{{ office.name }}</a>
            </li>
          </ul>
          <div class="box box-primary">
            <div class="box-body no-padding">
              <!-- THE CALENDAR -->
              <full-calendar ref="calendar" :event-sources="eventSources" :config="config"></full-calendar>
            </div><!-- /.box-body -->
          </div><!-- /. box -->
        </div><!-- /.col -->
      </div><!-- /.row -->
    </section><!-- /.content -->
  </div>
</template>

<script>
  import appProperty from './../../property'
  import { bus } from './../event/bus'
  import appState from './appointment/AppointmentConst'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    data () {
      return {
        currentDoctorId: null,
        config: {
          eventClick: this.eventClick,
          dayClick: this.dayClick,
          eventRender: this.eventRender,
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          buttonText: {
            today: 'сегодня',
            month: 'месяц',
            week: 'неделя',
            day: 'день'
          },
          monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          monthNamesShort: ['Янв.', 'Фев.', 'Мрт.', 'Апр.', 'Май', 'Июн', 'Июл', 'Авг.', 'Сен.', 'Окт.', 'Нбр.', 'Дек.'],
          dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Чеверг', 'Пятница', 'Суббота'],
          dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          columnFormat: 'ddd D/M',
          timeFormat: 'H(:mm)',
          axisFormat: 'H(:mm)',
          firstHour: 9,
          allDaySlot: false,
          slotDuration: '00:15:00',
          slotLabelInterval: '00:15:00',
          defaultView: 'agendaWeek',
          firstDay: 1,
          slotLabelFormat: 'HH:mm',
          minTime: '09:00:00',
          maxTime: '19:30:00',
          events: null,
          editable: false,
          droppable: false,
          selectable: false,
          textEscape: false
        },
        selected: {}
      }
    },
    methods: {
      dayClick (date) {
        let params = {title: 'Запись на прием', fromCalendar: true, state: appState.FLOW.NEW, dateTime: date, officeId: this.officeId, doctorId: this.getDoctorId(), client: null}
        this.$modal.show('appointment-modal', params)
        return false
      },
      eventClick (event) {
        let params = {title: 'Оформление', state: appState.FLOW.VIEW, appointmentId: event.id}
        this.$modal.show('appointment-modal', params)
        return false
      },
      eventRender (event, element) {
        if (event.phone) {
          element.find('.fc-title').append(' <i class="fa fa-phone icon20" style="position: absolute; right:5px; top:2px;"></i>')
        }
        element.addClass(event.class)
      },
      getDoctorId () {
        if (this.currentDoctorId != null) {
          return this.currentDoctorId
        }
        if (this.$route.params.doctorId) {
          return this.$route.params.doctorId
        }
        return null
      },
      setDoctorId (id) {
        this.$store.commit('setDoctorId', id)
        this.currentDoctorId = id
      },
      getEventsSource () {
        let data = {access_token: this.auth.token, officeId: this.officeId}
        let doctorId = this.getDoctorId()
        if (doctorId !== null) {
          data.doctorId = doctorId
        }
        return {url: appProperty.getScheduleApiUrl(), data: data}
      },
      refreshEvents () {
        this.$refs.calendar.$emit('rebuild-sources')
      },
      ...mapMutations({
        setOfficeId: 'office/setOfficeId'
      })
    },
    computed: {
      ...mapGetters({
        offices: 'office/getAll',
        officeId: 'office/getOfficeId',
        auth: 'getAuth'
      }),
      eventSources () {
        if (this.$refs.calendar) {
          this.$refs.calendar.fireMethod('removeEventSources')
        }
        return [
          this.getEventsSource()
        ]
      }
    },
    mounted () {
      bus.$on('menu-click-doctor-event', this.setDoctorId)
      bus.$on('appointment-schedule-refresh', this.refreshEvents)
    }
  }
</script>

<style>
  @import '~fullcalendar/dist/fullcalendar.css';
</style>
