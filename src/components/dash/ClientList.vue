<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Клиенты
      </h1>
      <ol class="breadcrumb">
        <li><a href="javascript:;"><i class="fa fa-home"></i>Список клиентов</a></li>
        <!--<li class="active">{{$route.name.toUpperCase() }}</li>-->
      </ol>
    </section>
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
                  <table class="table table-bordered table-striped dataTable" role="grid"
                         aria-describedby="example1_info" id="clientTable">
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Пол</th>
                      <th>Имя</th>
                      <th>Телефон</th>
                      <th>Источник</th>
                      <th>Стал клиентом</th>
                      <th> -</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="client in clients">
                      <td>{{ client.id }}</td>
                      <td>
                        <i v-bind:class="{'fa-mars': (client.gender == 'male'), 'fa-venus': (client.gender == 'female')}" class="fa"></i>
                      </td>
                      <td>
                        <a href="#"> {{ client.name }} </a>
                      </td>
                      <td>{{ client.msisdn }}</td>
                      <td>{{ getDirection(client.clientDirectionId) }}</td>
                      <td>{{ getDate(client.created) }}</td>
                      <td><button type="button" class="btn btn-primary" @click="edit(client)"><i class="fa fa-pencil edit"></i> Изменить</button></td>
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
                <button type="button" class="btn btn-primary" @click="create">Новый клиент</button>
              </div>
              <div class="col-sm-10">
                <pagination @changePage="changePage" :pagination="paginationData" :config="paginationConfig"></pagination>
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
  import { mapGetters } from 'vuex'
  import clientService from './../../service/ClientService'
  import moment from 'moment'
  import pagination from './../pagination/Pagination'

  export default {
    data () {
      return {
        msisdn: null,
        clients: [],
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
      errorHandler (err) {
        console.log(err)
      },
      getDirection (directionId) {
        if (directionId && Array.isArray(this.clientDirections)) {
          let direction = this.clientDirections.find(direction => direction.id === directionId)
          return direction ? direction.name : 'неизвестно'
        }
        return null
      },
      getDate (timestamp) {
        return moment(timestamp).format('DD/MM/YYYY')
      },
      changePage (num) {
        console.log('Page num', num)
        this.request.page = num
        clientService.findAll(this.request, this.responseHandler, this.errorHandler)
      },
      responseHandler (response) {
        this.clients = response.content
        this.paginationData.first = response.first
        this.paginationData.last = response.last
        this.paginationData.number = response.number
        this.paginationData.totalPages = response.totalPages
      },
      findByMsisdn () {
        clientService.findAll(this.request, this.responseHandler, this.errorHandler)
        return false
      }
    },
    mounted () {
      clientService.findAll(this.request, this.responseHandler, this.errorHandler)
    },
    computed: {
      ...mapGetters({
//        doctors: 'doctor/getAll',
//        offices: 'office/getAll',
//        services: 'service/getAll',
//        reasons: 'reason/getAll',
//        familyStatuses: 'familyStatus/getAll',
        clientDirections: 'clientDirection/getAll'
      })
    },
    components: {
      pagination
    }
  }
</script>
