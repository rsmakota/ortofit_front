<template>
  <div class="content-wrapper" style="min-height: 846px;">
  <section class="content-header">
    <h1>
      Уведомления
    </h1>
    <ol class="breadcrumb">
      <li><a href="javascript:;"><i class="fa fa-bell-o"></i>Уведомления</a></li>
    </ol>
  </section>
  <!-- content -->
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <ul id="office_tabs" class="nav nav-tabs">
          <li v-for="(office, index) in offices" v-bind:class="{'active': (office.id === officeId)}">
            <a @click="changeOffice(office.id)">{{ office.name }}</a>
          </li>
        </ul>
      </div><!-- /.col -->
    </div><!-- /.row -->

    <div class="row">
      <div class="col-xs-8 table-responsive" style="display:table; height: 100%">
        <div class="panel panel-info" v-for="remind in reminds">
          <div class="panel-heading">
            <i class="fa fa-bell-o"></i> Уведомление о повторном визите №<strong>{{remind.id}}</strong>
          </div>
          <div class="panel-body">
            Клиет <strong><a href="javascript:void(0);" @click="clientClick(remind.clientId)"> {{remind.clientName}}</a></strong>
            тел. <strong><a href="javascript:void(0);" @click="clientClick(remind.clientId)"> {{remind.msisdn}}</a></strong>
            был на <a href="javascript:void(0);" @click="appClick(remind.appointmentId)"> приеме {{ dateFormat(remind.appointmentDateTime) }}</a>. Ему оказали услуги "<strong>{{ remind.serviceNameList }}</strong>". <br/>
            Дата <strong>{{ dateFormat(remind.dateTime) }}</strong> была указана как напоминание о повторном визите.
            <br>
            &nbsp;&nbsp;&nbsp;<strong>Комментарий к напоминанию:</strong>
            <i>{{ remind.description }}</i>
          </div>
          <div class="panel-footer">
            <button class="btn btn-success btn-sm btn-remind" @click="btnProcess(remind.id)" type="button">Обработать</button>
            <button class="btn btn-info btn-sm client-details" @click="clientClick(remind.clientId)" type="button">Инфо.</button>
            <button class="btn btn-primary btn-sm edit" @click="editClick(remind)" type="button">Редактировать</button>
          </div>
        </div>
      </div>
    </div>

  </section>
  </div>
</template>
<script>
  import moment from 'moment'
  import remindService from './../../../service/RemindService'
  import RemindModal from './Modal'
  import clientConst from './../../client/ClientConst'
  import appState from './../appointment/AppointmentConst'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    data () {
      return {
        reminds: []
      }
    },
    methods: {
      errorHandler (err) {
        console.log(err)
      },
      changeOffice (officeId) {
        if (this.office === officeId) {
          return
        }
        this.reminds = []
        this.setOfficeId(officeId)
        this.loadData()
      },
      loadData () {
        remindService.findActive(this.request, (reminds) => { this.reminds = reminds }, this.errorHandler)
      },
      btnProcess (id) {
        remindService.process(id, this.loadData, this.errorHandler)
      },
      dateFormat (timestamp) {
        return moment(timestamp).format('DD/MM/YYYY')
      },
      appClick (appId) {
        let params = {title: 'Обзор Визита', state: appState.FLOW.VIEW, appointmentId: appId}
        this.$modal.show('appointment-modal', params)
        return false
      },
      clientClick (clientId) {
        let params = {title: 'Обзор', state: 'overview', clientId: clientId, mod: clientConst.FORM.MOD.OVERVIEW}
        this.$modal.show('client-modal', params)
        return false
      },
      editClick (remindReport) {
        let params = {title: 'Обзор', remindReport: remindReport, mod: 'edit'}
        this.$modal.show('remind-modal', params)
      },
      ...mapMutations({
        setOfficeId: 'office/setOfficeId'
      })
    },
    computed: {
      ...mapGetters({
        offices: 'office/getAll',
        officeId: 'office/getOfficeId'
      }),
      request () {
        return { officeId: this.officeId, limit: 5 }
      }
    },
    mounted () {
      this.loadData()
    },
    components: {
      RemindModal
    }
  }
</script>
