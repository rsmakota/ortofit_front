<template>
  <div class="content-wrapper" style="min-height: 846px;">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          Расчеты
        </h1>
        <ol class="breadcrumb">
          <li><a href="javascript:;"><i class="fa fa-home"></i>Расчеты</a></li>
        </ol>
      </section>
    <!-- content -->
    <section class="invoice">
      <div class="row">
        <div class="col-md-12">
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
          <table class="table table-striped" v-else>
            <thead><tr><th>Врач</th><th>Количество направлений</th></tr></thead>
            <tbody>
              <tr v-for="report in reports">
                <td>{{ report.name }}</td><td>{{ report.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section><!-- /.content -->

  </div>
</template>

<script>
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
        reportService.findSettlement({
          from: this.dateFrom.format('YYYY-MM-DD') + ' 00:00:00',
          to: this.dateTo.format('YYYY-MM-DD') + ' 23:59:59'
        }, (reports) => { this.reports = reports }, this.errorHandler)
      }
    },
    computed: {
      reportsIsEmpty () {
        console.log(this.reports.length)
        return (this.reports.length < 1)
      }
    },
    components: {
      datePicker
    }
  }
</script>
