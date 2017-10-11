<template>
  <!-- content -->
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <ul id="office_tabs" class="nav nav-tabs">
          <li v-for="(office, index) in offices" v-bind:class="{'active': (office.id == currentOfficeId)}">
            <a v-on:click="setOfficeId(office.id)" class="office_link">{{ office.name }}</a>
          </li>
        </ul>
        <div class="box box-primary">
          <div class="box-body no-padding">
            <!-- THE CALENDAR -->
            <full-calendar ref="calendar" :event-sources="eventSources" @event-selected="eventSelected"
                           @event-created="eventCreated" :config="config"></full-calendar>
          </div><!-- /.box-body -->
        </div><!-- /. box -->
      </div><!-- /.col -->
    </div><!-- /.row -->
  </section><!-- /.content -->

</template>

<script>
  import appProperty from './../../property'
  import { bus } from './../event/bus'

  export default {
    props: {doctorId: {type: Number, 'default': null}, officeId: {type: Number, 'default': null}},
    data () {
      return {
        offices: {type: Object},
        currentOfficeId: this.officeId,
        currentDoctorId: this.doctorId,
        config: {
          eventClick: this.eventClick,
          dayClick: this.dayClick,
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
          events: this.getEventsSource(),
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
        let params = {title: 'Запись на прием', fromCalendar: true, state: 'new', dateTime: date, officeId: this.getOfficeId(), doctorId: this.getDoctorId(), client: null}
        this.$modal.show('appointment-modal', params)
        return false
      },
      eventClick (event) {
        let params = {title: 'Запись на прием', state: 'view', appointmentId: event.id}
        this.$modal.show('appointment-modal', params)
        return false
      },
      getOfficeId () {
        if (this.currentOfficeId != null) {
          return this.currentOfficeId
        }
        if (this.officeId != null) {
          return this.officeId
        }
        if (this.$store.state.officeId != null) {
          return this.$store.state.officeId
        }
        return 1
      },
      getDoctorId () {
        if (this.currentDoctorId != null) {
          return this.currentDoctorId
        }
        if (this.doctorId != null) {
          return this.doctorId
        }
        return null
      },
      setOfficeId (id) {
        this.removeEventSources()
        this.$store.commit('setOfficeId', id)
        this.currentOfficeId = id
        this.addEventSource(this.getEventsSource())
      },
      setDoctorId (id) {
        this.removeEventSources()
        this.$store.commit('setDoctorId', id)
        this.currentDoctorId = id
        this.addEventSource(this.getEventsSource())
      },
      getEventsSource () {
        let data = {access_token: this.$store.state.auth.token, officeId: this.getOfficeId()}
//        console.log(data)
        let doctorId = this.getDoctorId()
        if (doctorId !== null) {
          data.doctorId = doctorId
        }
        return {url: appProperty.scheduleApiUrl, data: data}
      },
      refreshEvents () {
        this.$refs.calendar.$emit('refetch-events')
      },
      removeEventSources () {
        this.$refs.calendar.fireMethod('removeEventSources')
      },
      addEventSource (source) {
        this.$refs.calendar.fireMethod('addEventSource', source)
      },
      removeEvent () {
        this.$refs.calendar.$emit('remove-event', this.selected)
        this.selected = {}
      },
      eventSelected (event) {
//        this.selected = event
      },
      eventCreated (...test) {
//        console.log(test)
      },
      loadOffices () {
        this.offices = this.$store.state.office.offices
      }
    },
    computed: {
      eventSources () {
        //      const self = this
        return [
          //        {
          //          events (start, end, timezone, callback) {
          //            setTimeout(() => {
          //              callback(self.events.filter(() => Math.random() > 0.5))
          //            }, 1000)
          //          }
          //        }
        ]
      }
    },
    mounted () {
      this.currentOfficeId = this.getOfficeId()
      bus.$on('menu-click-doctor-event', this.setDoctorId)
      bus.$on('office-store-loaded', this.loadOffices)
      bus.$on('appointment-schedule-refresh', this.refreshEvents)
    }
  }
</script>

<style>
  @import '~fullcalendar/dist/fullcalendar.css';
</style>
