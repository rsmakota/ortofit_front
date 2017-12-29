<template>
  <div class="content-wrapper" style="min-height: 846px;">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          Итоги
        </h1>
        <ol class="breadcrumb">
          <li><a href="javascript:;"><i class="fa fa-home"></i>Итоги</a></li>
        </ol>
      </section>
    <!-- content -->
    <section class="invoice">
      <div class="row">
        <div class="col-md-12">
          <ul id="office_tabs" class="nav nav-tabs">
            <li v-for="office in offices" :class="{'active': (office.id === officeId)}">
              <a @click="setOfficeId(office.id)" class="office_link">{{ office.name }}</a>
            </li>
          </ul>
          <div class="box box-info">

            <form class="form-inline" id="reportForm">
              <div class="box-body">
                <div class="form-group">
                  <label>период с:</label>
                  <date-picker v-model="dateFrom" :config="dtConf"></date-picker>

                </div>
                <div class="form-group">
                  <label>по:</label>
                  <date-picker v-model="dateTo" :config="dtConf"></date-picker>

                </div>
                <div class="form-group">&nbsp;&nbsp;
                  <button type="button" class="btn btn-sm btn-primary" @click="btnClick">Итоги</button>

                </div>
                <div id="formErrorText" class="help-block" style="color: red; display: none"></div>
              </div>
            </form>

          </div>
        </div><!-- /.col -->
      </div><!-- /.row -->

      <div class="row">
        <div class="col-xs-10 table-responsive" style="display:table; height: 100%">
          <div v-if="reportsIsEmpty"><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>
          <table class="table">
            <tbody v-for="report in reports">
            <tr><td colspan="2"><h4>{{ report.doctorName }}</h4></td></tr>
            <tr class="active"> <td><strong>Услуга</strong></td> <td><strong>Количество</strong></td></tr>
            <tr v-for="service in report.services"
                :class="{'success':(service.alias === 'insoles_manufacturing')}">
              <td>{{ service.name }}</td>
              <td v-if="service.alias === 'insoles_manufacturing'">
                <table>
                  <tbody>
                  <tr v-for="insole in service.insoles">
                    <td>{{ insole.name }}:</td>
                    <td>&nbsp;&nbsp; {{ insole.total }} ({{ arrayToStr(insole.sizes) }})</td>
                  </tr>
                  <tr>
                    <td><strong>Всего:</strong></td>
                    <td>&nbsp;&nbsp;{{ service.total }}</td>
                  </tr>
                  </tbody>
                </table>
              </td>
              <td v-else> {{ service.total }} </td>
            </tr>
            <tr v-if="report.forwards.length > 0" class="warning">
              <td><strong>Направление</strong></td>
              <td>
                <table>
                  <tbody>
                  <tr v-for="forward in report.forwards">
                    <td>{{ forward.name }}:</td>
                    <td>&nbsp;&nbsp;{{ forward.total }}/{{ forward.flyers }}</td>
                  </tr>
                  <tr>
                    <td><strong>Всего:</strong></td>
                    <td>&nbsp;&nbsp;{{ forwardsTotal(report.forwards) }}/{{ flyersTotal(report.forwards) }}</td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>
    </section><!-- /.content -->

  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import moment from 'moment'
  import 'bootstrap/dist/css/bootstrap.css'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
  import reportService from './../../../service/AppointmentReportService'

  export default {
    data () {
      return {
        dtConf: {format: 'DD/MM/YYYY', locale: 'ru'},
        dateFrom: moment(),
        dateTo: moment(),
        reports: []
      }
    },
    methods: {
      errorHandler (err) {
        console.log(err)
      },
      btnClick () {
        reportService.findTotal({
          from: this.dateFrom.format('YYYY-MM-DD') + ' 00:00:00',
          to: this.dateTo.format('YYYY-MM-DD') + ' 23:59:59',
          officeId: this.officeId
        }, (reports) => { this.reports = reports }, this.errorHandler)
      },
      getDoctorId () {
        if (this.$route.params.doctorId) {
          return this.$route.params.doctorId
        }
        return null
      },
      arrayToStr (arr) {
        return arr.join(', ')
      },
      forwardsTotal (forwards) {
        let t = 0
        forwards.forEach((item) => { t += item.total })
        return t
      },
      flyersTotal (forwards) {
        let t = 0
        forwards.forEach((item) => { t += item.flyers })
        return t
      },
      ...mapMutations({
        setOfficeId: 'office/setOfficeId'
      })
    },
    computed: {
      reportsIsEmpty () {
        console.log(this.reports.length)
        return (this.reports.length < 1)
      },
      ...mapGetters({
        offices: 'office/getAll',
        officeId: 'office/getOfficeId',
        auth: 'getAuth'
      })
    },
    components: {
      datePicker
    }
  }
</script>
