<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Активные Напоминания (ждут своей очереди напомнить)
      </h1>
      <ol class="breadcrumb">
        <li>
          <router-link :to="{ name: 'ActiveRemind' }"><i class="fa fa-bell-o"></i>Список напоминаний</router-link>
        </li>
      </ol>
    </section>
    <!-- content -->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header">
              <form v-on:submit.prevent="onSubmit">
                <div class="box-tools">
                  <div class="input-group" style="width: 200px;">
                    <input class="form-control input-sm pull-right" type="text" placeholder="телефон"
                           name="msisdn" v-model="request.msisdn">
                    <div class="input-group-btn">
                      <button class="btn btn-sm btn-default" v-on:click="findByMsisdn">
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="box-body no-padding">
              <div id="example1_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                <div class="row">
                  <div class="col-sm-12">
                    <table class="table table-bordered table-striped dataTable">
                      <thead>
                      <tr>
                        <th>№</th>
                        <th>Клиент</th>
                        <th>Телефон</th>
                        <th>Оказанные Услуги</th>
                        <th>Визит №</th>
                        <th>Дата визита</th>
                        <th>Дата напоминания</th>
                        <th>Редактировать</th>
                      </tr>
                      </thead>
                      <tbody>

                      <tr v-for="remind in reminds">
                        <td>{{ remind.id }}</td>

                        <td>{{ remind.clientName }}</td>
                        <td><a href="#">{{ remind.msisdn }}</a></td>
                        <td>
                          {{ remind.serviceNameList }}
                        </td>
                        <td><a href="#"> {{ remind.appointmentId }}</a></td>
                        <td>
                          {{ dateFormat(remind.appointmentDateTime) }}
                        </td>
                        <td>
                          {{ dateFormat(remind.dateTime) }}
                        </td>
                        <td>
                          <i class="fa fa-pencil edit" style="cursor: pointer;"></i>
                        </td>
                      </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>

            <div class="box-footer">
              <div class="row">
                <div class="col-sm-2">
                  <button type="button" class="btn btn-primary" @click="showModal(null)">Новое напоминание</button>
                </div>
                <div class="col-sm-10">
                  <pagination @changePage="changePage" :pagination="paginationData"
                              :config="paginationConfig"></pagination>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  // import { mapGetters } from 'vuex'
  import remindService from './../../../service/RemindService'
  import moment from 'moment'
  import pagination from './../../pagination/Pagination'

  export default {
    data () {
      return {
        reminds: [],
        request: {
          page: 0,
          sort: ['id'],
          size: 20,
          msisdn: null
        },
        paginationData: {
          first: true, last: false, number: 1, totalPages: 0
        },
        paginationConfig: {totalElements: 16}
      }
    },
    methods: {
      onSubmit () {
        //
      },
      errorHandler (err) {
        console.log(err)
      },
      dateFormat (timestamp) {
        return moment(timestamp).format('DD/MM/YYYY')
      },
      changePage (num) {
        this.request.page = num
        this.loadData()
      },
      loadData () {
        remindService.findAll(this.request, this.responseHandler, this.errorHandler)
      },
      responseHandler (response) {
        this.reminds = response.content
        this.paginationData.first = response.first
        this.paginationData.last = response.last
        this.paginationData.number = response.number
        this.paginationData.totalPages = response.totalPages
      },
      findByMsisdn () {
        remindService.findAll(this.request, this.responseHandler, this.errorHandler)
        return false
      }
      // showModal (client) {
      //   this.$modal.show('client-modal', {title: (client) ? ' Редактирование клиента' : 'Новый клиент', mod: CLIENT_CONST.FORM.MOD.ABSOLUTELY, time: moment(), client: client})
      // }
    },
    mounted () {
      remindService.findAll(this.request, this.responseHandler, this.errorHandler)
    },
    // computed: {
    //   ...mapGetters({
    //     clientDirections: 'clientDirection/getAll'
    //   })
    // },
    components: {
      pagination
      // 'client-modal': ClientModal
    }
  }
</script>
