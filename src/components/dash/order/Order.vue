<template>
  <div class="content-wrapper" style="min-height: 846px;">
  <section class="content-header">
    <h1>
      Интернет заказ
    </h1>
    <ol class="breadcrumb">
      <li><a href="javascript:;"><i class="fa fa-bell-o"></i>Интернет заказ</a></li>
    </ol>
  </section>
  <!-- content -->
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-info">

        </div>
      </div><!-- /.col -->
    </div><!-- /.row -->

    <div class="row">
      <div class="col-xs-8 table-responsive" style="display:table; height: 100%">
        <div class="callout callout-danger lead" v-for="order in orders">
          <h4>
            Интернет заявка на прием от
            <strong>{{ dateFormat(order.created) }}</strong>
          </h4>
          <p>
            Прошу перезвонить мне по тел. {{ order.client.msisdn }} и записать на прием.
          </p>
          <button class="btn btn-primary btn-sm" type="button" @click="btnProcess(order.id)">Обработать</button>
        </div>
      </div>
    </div>

  </section>
  </div>
</template>
<script>
  import moment from 'moment'
  import orderService from './../../../service/OrderService'

  export default {
    data () {
      return {
        orders: [],
        limit: 5
      }
    },
    methods: {
      errorHandler (err) {
        console.log(err)
      },
      loadData () {
        orderService.findAll(this.limit, (orders) => { this.orders = orders }, this.errorHandler)
      },
      btnProcess (id) {
        orderService.process(id, this.loadData, this.errorHandler)
      },
      dateFormat (timestamp) {
        return moment(timestamp).format('DD/MM/YYYY')
      }
    },
    mounted () {
      this.loadData()
    }
  }
</script>
