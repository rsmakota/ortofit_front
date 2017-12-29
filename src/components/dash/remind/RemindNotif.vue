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
        <ul id="office_tabs" class="nav nav-tabs">
          <li v-for="office in offices" :class="{'active': (office.id === officeId)}">
            <a @click="btnOffice(office.id)" class="office_link">{{ office.name }}</a>
          </li>
        </ul>
        <div class="box box-info">

        </div>
      </div><!-- /.col -->
    </div><!-- /.row -->

    <div class="row">
      <div class="col-xs-8 table-responsive" style="display:table; height: 100%">
        <div class="callout callout-danger lead" v-for="order in orders">
          <h4>
            Интернет заявка на прием от
            <strong>#date#</strong>
          </h4>
          <p>
            Прошу перезвонить мне по тел. #msisdn# и записать на прием.
          </p>
          <button class="btn btn-primary btn-sm" type="button">Обработать</button>
        </div>
      </div>
    </div>

  </section>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  // import moment from 'moment'
  import 'bootstrap/dist/css/bootstrap.css'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
  import orderService from './../../../service/OrderService'

  export default {
    data () {
      return {
        orders: []
      }
    },
    methods: {
      errorHandler (err) {
        console.log(err)
      },
      btnOffice (id) {
        this.setOfficeId(id)
        orderService.findByOfficeId(id, (orders) => { this.orders = orders }, this.errorHandler)
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
        officeId: 'office/getOfficeId'
      })
    },
    components: {
      datePicker
    }
  }
</script>
