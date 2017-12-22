<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Показатели
      </h1>
      <ol class="breadcrumb">
        <li><a href="javascript:;"><i class="fa fa-home"></i>Показатели</a></li>
        <!--<li class="active">{{$route.name.toUpperCase() }}</li>-->
      </ol>
    </section>
    <!-- content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-body no-padding">
              <vue-highCharts :options="options" ref="lineCharts"></vue-highCharts>
              <vue-highCharts :options="options1" ref="lineCharts1"></vue-highCharts>
            </div><!-- /.box-body -->
          </div><!-- /. box -->
        </div><!-- /.col -->
      </div><!-- /.row -->
    </section><!-- /.content -->
  </div>
</template>

<script>
  import chartService from './../../../service/ChartService'
  import VueHighCharts from 'vue2-highcharts'
  import moment from 'moment'

  export default {
    components: {
      'vue-highCharts': VueHighCharts
    },
    data () {
      return {
        series: [],
        options: {
          chart: {
            type: 'spline'
          },
          title: {
            text: 'Новые клиенты'
          },
          subtitle: {
            text: '(впервые зарегистрированные клиенты)'
          },
          xAxis: {
            categories: this.getXTitles()
          },
          yAxis: {
            title: {
              text: 'Количество'
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: []
        },
        options1: {
          chart: {
            type: 'spline'
          },
          title: {
            text: 'Успешные приемы'
          },
          subtitle: {
            text: '(приемы, на которых были оказаны услуги)'
          },
          xAxis: {
            categories: this.getXTitles()
          },
          yAxis: {
            title: {
              text: 'Количество'
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: []
        }
      }
    },
    methods: {
      getXTitles () {
        let currentDate = moment()
        let month = [currentDate.locale('ru').format('MMM')]
        for (let i = 0; i < 11; i++) {
          currentDate = moment(currentDate).add(1, 'M')
          month.push(currentDate.format('MMM'))
        }
        return month
      },
      load (result) {
        let lineCharts = this.$refs.lineCharts
        lineCharts.removeSeries()
        for (let o in result) {
          lineCharts.addSeries(result[o])
        }
        lineCharts.hideLoading()
      },
      loadAppData (result) {
        let lineCharts1 = this.$refs.lineCharts1
        lineCharts1.removeSeries()
        for (let o in result) {
          lineCharts1.addSeries(result[o])
        }
        lineCharts1.hideLoading()
      },
      errorResponse: function (err) {
        console.log('ERROR: ', err)
      }
    },
    mounted () {
      let lineCharts = this.$refs.lineCharts
      let lineCharts1 = this.$refs.lineCharts1
      let end = moment(moment().format('YYYY-MM') + '-01')
      let start = moment(end).add(-1, 'Y')
      lineCharts.delegateMethod('showLoading', 'Загрузка...')
      lineCharts1.delegateMethod('showLoading', 'Загрузка...')
      chartService.getClientsDirectionChart(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'), this.load, this.errorResponse)
      chartService.getAppointmentsChart(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'), this.loadAppData, this.errorResponse)
    }
  }
</script>
