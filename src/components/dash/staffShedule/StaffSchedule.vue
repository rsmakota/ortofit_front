<template>
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          График приема
        </h1>
        <ol class="breadcrumb">
          <li><a href="javascript:;"><i class="fa fa-home"></i>График приема</a></li>
        </ol>
      </section>
    <!-- content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <ul id="office_tabs" class="nav nav-tabs">
            <li v-for="office in offices" :class="{'active': (office.id === officeId)}">
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
  import { mapGetters, mapMutations } from 'vuex'
  import appProperty from './../../../property'

  export default {

    data () {
      return {
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
        }
      }
    },
    methods: {
      getEventsSource () {
        let data = {access_token: this.auth.token, officeId: this.officeId}
        let doctorId = this.getDoctorId()
        console.log('DoctorId:', doctorId)
        if (doctorId !== null && doctorId !== 'all') {
          data.doctorId = doctorId
        }
        return {url: appProperty.staffScheduleApiUrl, data: data}
      },
      getDoctorId () {
        if (this.$route.params.doctorId) {
          return this.$route.params.doctorId
        }
        return null
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
        return [
          this.getEventsSource()
        ]
      }
    }
  }
</script>

<style>
  @import '~fullcalendar/dist/fullcalendar.css';
</style>
