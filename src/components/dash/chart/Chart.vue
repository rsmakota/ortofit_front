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
            text: 'Впервые зарегистрированные клиенты'
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
          series: this.getDemos()
        }
      }
    },
    computed: {
      clientsChartData: function () {
        return this.series
      }
    },
    methods: {
      getDemo () {
        return {
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }
      },
      getDemo2 () {
        return {
          name: 'New York',
          data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }
      },
      getDemos () {
        return [{
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
          name: 'New York',
          data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
          name: 'Berlin',
          data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
          name: 'London',
          data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
      },
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
      errorResponse: function (err) {
        console.log('ERROR: ', err)
      }
    },
    mounted () {
      let lineCharts = this.$refs.lineCharts
      let end = moment(moment().format('YYYY-MM') + '-01')
      let start = moment(end).add(-1, 'Y')
      lineCharts.delegateMethod('showLoading', 'Загрузка...')
      chartService.getClientsDirectionChapter(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'), this.load, this.errorResponse)
    }
  }
</script>
